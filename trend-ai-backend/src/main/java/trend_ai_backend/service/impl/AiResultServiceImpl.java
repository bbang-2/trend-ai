package trend_ai_backend.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import trend_ai_backend.common.constants.ResponseCode;
import trend_ai_backend.common.constants.ResponseMessage;
import trend_ai_backend.dto.ResponseDto;
import trend_ai_backend.dto.aiResult.response.AiResultResponseDto;
import trend_ai_backend.entity.AIResult;
import trend_ai_backend.entity.CrawledData;
import trend_ai_backend.repository.AiResultRepository;
import trend_ai_backend.repository.CrawledDataRepository;
import trend_ai_backend.service.AiResultService;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AiResultServiceImpl implements AiResultService {

    private final CrawledDataRepository crawledDataRepository;
    private final AiResultRepository aiResultRepository;

    @Value("${gemini.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public ResponseDto<AiResultResponseDto> analyze(Long articleId) {
        CrawledData article = crawledDataRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("기사 없음: " + articleId));

        String content = article.getContent();
        if (content == null || content.isBlank()) {
            content = article.getSummary();
        }

        String url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=" + apiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String prompt = """
            다음 기사를 3줄로 요약하고,
            감정을 긍정/부정/중립 중 하나로 분류하고,
            키워드 3~5개를 뽑아.

            JSON만 출력해. 코드블록(```) 쓰지 말고, 설명이나 텍스트도 쓰지 마.
            {
              "summary": "...",
              "sentiment": "...",
              "keywords": ["...", "...", "..."]
            }

            기사 본문:
            %s
            """.formatted(content);

        try {
            ObjectMapper mapper = new ObjectMapper();

            ObjectNode rootNode = mapper.createObjectNode();
            ArrayNode contents = rootNode.putArray("contents");

            ObjectNode contentNode = contents.addObject();
            ArrayNode parts = contentNode.putArray("parts");

            ObjectNode textNode = parts.addObject();
            textNode.put("text", prompt);

            String requestBody = mapper.writeValueAsString(rootNode);

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            JsonNode root = mapper.readTree(response.getBody());
            String text = root.path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText();

            String cleaned = text.replaceAll("```json", "")
                    .replaceAll("```", "")
                    .trim();

            JsonNode jsonNode = mapper.readTree(cleaned);

            Optional<AIResult> existingOpt = aiResultRepository.findByArticleId(article.getId());

            AIResult aiResult;

            if (existingOpt.isPresent()) {
                AIResult existing = existingOpt.get();

                aiResult = AIResult.builder()
                        .id(existing.getId())
                        .article(article)
                        .summary(jsonNode.get("summary").asText())
                        .sentiment(jsonNode.get("sentiment").asText())
                        .keywordsJson(jsonNode.get("keywords").toString())
                        .build();
            } else {
                aiResult = AIResult.builder()
                        .article(article)
                        .summary(jsonNode.get("summary").asText())
                        .sentiment(jsonNode.get("sentiment").asText())
                        .keywordsJson(jsonNode.get("keywords").toString())
                        .build();
            }

            AIResult saved = aiResultRepository.saveAndFlush(aiResult);

            AiResultResponseDto dto = AiResultResponseDto.builder()
                    .articleId(articleId)
                    .title(article.getTitle())
                    .summary(saved.getSummary())
                    .sentiment(saved.getSentiment())
                    .keywords(mapper.convertValue(jsonNode.get("keywords"), List.class))
                    .build();

            return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, dto);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.fail(ResponseCode.FAILED, "AI 분석 실패: " + e.getMessage());
        }
    }
}
package trend_ai_backend.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import trend_ai_backend.common.constants.ResponseCode;
import trend_ai_backend.common.constants.ResponseMessage;
import trend_ai_backend.dto.ResponseDto;
import trend_ai_backend.dto.crawledData.response.CrawledDataResponseDto;
import trend_ai_backend.entity.CrawledData;
import trend_ai_backend.repository.CrawledDataRepository;
import trend_ai_backend.service.SearchService;
import trend_ai_backend.util.NewsContentCrawler;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchServiceImpl implements SearchService {

    private final CrawledDataRepository crawledDataRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${naver.client-id}")
    private String clientId;

    @Value("${naver.client-secret}")
    private String clientSecret;

    @Override
    public List<CrawledDataResponseDto> crawlNews(String keyword) {
        List<CrawledDataResponseDto> data = new ArrayList<>();
        String url = "https://openapi.naver.com/v1/search/news.json?query=" + keyword;

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response =
                restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());

            for (JsonNode item : root.get("items")) {
                String link = item.get("link").asText();

                String content = null;
                if (link.contains("n.news.naver.com")) {
                    content = NewsContentCrawler.extractContent(link);
                }

                if (content == null || content.isBlank()) {
                    content = item.get("description").asText();
                }

                CrawledData article = crawledDataRepository.findByUrl(link)
                        .orElse(CrawledData.builder()
                                .source("naver_api")
                                .keyword(keyword)
                                .title(item.get("title").asText())
                                .summary(item.get("description").asText())
                                .content(content)
                                .url(link)
                                .date(item.get("pubDate").asText())
                                .build());

                crawledDataRepository.save(article);

                data.add(CrawledDataResponseDto.builder()
                        .id(article.getId())
                        .source(article.getSource())
                        .keyword(keyword)
                        .title(article.getTitle())
                        .url(article.getUrl())
                        .summary(article.getSummary())
                        .content(article.getContent())
                        .date(article.getDate())
                        .build());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, data).getData();
    }
}

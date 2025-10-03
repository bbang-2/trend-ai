package trend_ai_backend.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import trend_ai_backend.common.constants.ResponseCode;
import trend_ai_backend.common.constants.ResponseMessage;
import trend_ai_backend.dto.ResponseDto;
import trend_ai_backend.dto.aiResult.response.AiResultResponseDto;
import trend_ai_backend.dto.trendReport.TrendReportResponseDto;
import trend_ai_backend.entity.AIResult;
import trend_ai_backend.entity.CrawledData;
import trend_ai_backend.repository.AiResultRepository;
import trend_ai_backend.repository.CrawledDataRepository;
import trend_ai_backend.service.AiResultService;
import trend_ai_backend.service.TrendReportService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class TrendReportServiceImpl implements TrendReportService {

    private final CrawledDataRepository crawledDataRepository;
    private final AiResultRepository aiResultRepository;
    private final AiResultService aiResultService;

    @Override
    public ResponseDto<TrendReportResponseDto> generateReport(String keyword) {
        List<CrawledData> articles = crawledDataRepository.findByKeyword(keyword);

        if (articles.isEmpty()) {
            return ResponseDto.fail(ResponseCode.FAILED, "관련 기사가 없습니다.");
        }

        List<AIResult> results = new ArrayList<>();
        for (CrawledData article : articles) {
            Optional<AIResult> existing = aiResultRepository.findByArticle(article);
            if (existing.isPresent()) {
                results.add(existing.get());
            } else {
                AiResultResponseDto dto = aiResultService.analyze(article.getId()).getData();
                AIResult newResult = aiResultRepository.findByArticle(article).orElseThrow();
                results.add(newResult);
            }
        }

        long total = results.size();
        long positive = results.stream().filter(r -> "긍정".equals(r.getSentiment())).count();
        long negative = results.stream().filter(r -> "부정".equals(r.getSentiment())).count();
        long neutral  = results.stream().filter(r -> "중립".equals(r.getSentiment())).count();

        double positiveRatio = (double) positive / total;
        double negativeRatio = (double) negative / total;
        double neutralRatio  = (double) neutral / total;

        Map<String, Long> keywordFreq = results.stream()
                .flatMap(r -> {
                    try {
                        ObjectMapper mapper = new ObjectMapper();
                        List<String> kws = mapper.readValue(r.getKeywordsJson(), List.class);
                        return kws.stream();
                    } catch (Exception e) {
                        return Stream.empty();
                    }
                })
                .collect(Collectors.groupingBy(k -> k, Collectors.counting()));

        List<String> topKeywords = keywordFreq.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .map(Map.Entry::getKey)
                .toList();

        TrendReportResponseDto report = TrendReportResponseDto.builder()
                .keyword(keyword)
                .totalArticles(total)
                .positiveRatio(positiveRatio)
                .negativeRatio(negativeRatio)
                .neutralRatio(neutralRatio)
                .topKeywords(topKeywords)
                .build();

        return ResponseDto.success(ResponseCode.SUCCESS, ResponseMessage.SUCCESS, report);
    }
}

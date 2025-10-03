package trend_ai_backend.dto.trendReport;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class TrendReportResponseDto {
    private String keyword;
    private long totalArticles;
    private double positiveRatio;
    private double negativeRatio;
    private double neutralRatio;
    private List<String> topKeywords;
}

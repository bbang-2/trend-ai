package trend_ai_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import trend_ai_backend.dto.aiResult.response.AiResultResponseDto;
import trend_ai_backend.dto.crawledData.response.CrawledDataResponseDto;

import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class SearchResponseDto {
    private String keyword;
    private List<CrawledDataResponseDto> crawledData;
    private AiResultResponseDto aiResult;
}

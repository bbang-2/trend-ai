package trend_ai_backend.service;

import jakarta.validation.constraints.NotBlank;
import trend_ai_backend.dto.crawledData.response.CrawledDataResponseDto;

import java.util.List;

public interface SearchService {
    List<CrawledDataResponseDto> crawlNews(@NotBlank String keyword);
}

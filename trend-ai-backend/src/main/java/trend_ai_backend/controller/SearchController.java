package trend_ai_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import trend_ai_backend.common.constants.ApiMappingPattern;
import trend_ai_backend.dto.ResponseDto;
import trend_ai_backend.dto.crawledData.response.CrawledDataResponseDto;
import trend_ai_backend.service.SearchService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiMappingPattern.SEARCH_API)
public class SearchController {
    private final SearchService searchService;

    @Operation(summary = "네이버 뉴스 API", description = "네이버 뉴스 API를 통해 기사 가져오기")
    @GetMapping("/news")
    public ResponseEntity<ResponseDto<List<CrawledDataResponseDto>>> crawlNews(
            @RequestParam @NotBlank String keyword
    ) {
        List<CrawledDataResponseDto> response = searchService.crawlNews(keyword);
        return ResponseDto.toResponseEntity(HttpStatus.OK, response);
    }
}


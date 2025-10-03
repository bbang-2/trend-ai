package trend_ai_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import trend_ai_backend.common.constants.ApiMappingPattern;
import trend_ai_backend.dto.ResponseDto;
import trend_ai_backend.dto.trendReport.TrendReportResponseDto;
import trend_ai_backend.service.TrendReportService;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiMappingPattern.TREND_API)
public class TrendReportController {
    private final TrendReportService trendReportService;

    @Operation(summary = "트랜드 리포트 생성", description = "입력한 키워드로 관련 기사를 조회하고 AI 분석을 수행하여 긍정/부정/중립 비율과 상위 키워드를 포함한 트랜드 리포트 반환")
    @GetMapping("/report")
    public ResponseEntity<ResponseDto<TrendReportResponseDto>> generateReport(
            @RequestParam String keyword
    ) {
        ResponseDto<TrendReportResponseDto> response = trendReportService.generateReport(keyword);
        return ResponseDto.toResponseEntity(HttpStatus.OK, response);
    }

}

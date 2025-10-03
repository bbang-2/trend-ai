package trend_ai_backend.service;

import trend_ai_backend.dto.ResponseDto;
import trend_ai_backend.dto.trendReport.TrendReportResponseDto;

public interface TrendReportService {
    ResponseDto<TrendReportResponseDto> generateReport(String keyword);
}

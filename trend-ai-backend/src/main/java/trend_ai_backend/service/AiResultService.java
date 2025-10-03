package trend_ai_backend.service;

import trend_ai_backend.dto.ResponseDto;
import trend_ai_backend.dto.aiResult.response.AiResultResponseDto;

public interface AiResultService {
    ResponseDto<AiResultResponseDto> analyze(Long articleId);
}

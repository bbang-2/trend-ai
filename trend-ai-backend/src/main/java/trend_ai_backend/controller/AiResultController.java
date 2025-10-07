package trend_ai_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import trend_ai_backend.common.constants.ApiMappingPattern;
import trend_ai_backend.dto.ResponseDto;
import trend_ai_backend.dto.aiResult.response.AiResultResponseDto;
import trend_ai_backend.service.AiResultService;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiMappingPattern.ANALYSIS_API)
public class AiResultController {
    private final AiResultService AiResultService;

    private final String ARTICLE_API = "/{articleId}";

    @Operation(summary = "AI 기사 분석", description = "기사 ID로 본문 불러와서 Gemini로 요약/감정/키워드 분석")
    @PostMapping(ARTICLE_API)
    public ResponseEntity<ResponseDto<AiResultResponseDto>> analyze(
            @PathVariable Long articleId
    ) {
        ResponseDto<AiResultResponseDto> response = AiResultService.analyze(articleId);
        return ResponseDto.toResponseEntity(HttpStatus.OK, response);
    }
}

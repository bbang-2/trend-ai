package trend_ai_backend.dto.aiResult.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AiResultRequestDto {
    private String keyword;
    private String extractedKeywords;
    private String summary;
}

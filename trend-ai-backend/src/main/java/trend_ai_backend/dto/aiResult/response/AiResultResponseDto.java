package trend_ai_backend.dto.aiResult.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class AiResultResponseDto {
    private Long articleId;
    private String summary;
    private String sentiment;
    private List<String> keywords;
}

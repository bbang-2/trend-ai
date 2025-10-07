package trend_ai_backend.dto.crawledData.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class CrawledDataResponseDto {
    private long id;
    private String source;
    private String keyword;
    private String title;
    private String url;
    private String summary;
    private String content;
    private String date;
}

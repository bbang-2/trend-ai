package trend_ai_backend.dto.crawledData.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CrawledDataRequestDto {
    private String source;
    private String keyword;
    private String content;
    private String url;
    private String date;
}

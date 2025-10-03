package trend_ai_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "crawled_data")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class CrawledData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String keyword;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String summary;

    @Lob
    private String content;

    private String url;

    private String date;
}

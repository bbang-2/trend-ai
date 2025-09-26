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

    @Lob
    private String content;

    private String url;

    private String date;
}

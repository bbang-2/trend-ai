package trend_ai_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ai_result")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class AIResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crawled_id", nullable = false, unique = true)
    private CrawledData article;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String summary;

    @Column(length = 20)
    private String sentiment;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String keywordsJson;
}

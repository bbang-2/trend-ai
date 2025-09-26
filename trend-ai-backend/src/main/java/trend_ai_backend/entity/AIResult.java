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

    @Column(nullable = false)
    private String keyword;

    @Lob
    private String extractedKeywords;

    @Lob
    private String summary;
}

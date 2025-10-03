package trend_ai_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trend_ai_backend.entity.AIResult;
import trend_ai_backend.entity.CrawledData;

import java.util.Optional;

@Repository
public interface AiResultRepository extends JpaRepository<AIResult, Long> {
    Optional<AIResult> findByArticleId(Long articleId);

    Optional<AIResult> findByArticle(CrawledData article);
}

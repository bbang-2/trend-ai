package trend_ai_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trend_ai_backend.entity.CrawledData;

import java.util.List;
import java.util.Optional;

@Repository
public interface CrawledDataRepository extends JpaRepository<CrawledData, Long> {
    Optional<CrawledData> findByUrl(String url);

    List<CrawledData> findByKeyword(String keyword);
}

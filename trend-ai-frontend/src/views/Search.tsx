/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/Search.styles";
import type { CrawledDataResponseDto } from "../dtos/crawledData/crawled-data.response.dto";
import { crawlNews } from "../apis/search/search.apis";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [articles, setArticles] = useState<CrawledDataResponseDto[]>([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!keyword.trim()) return alert("키워드를 입력하세요!");
    try {
      const res = await crawlNews(keyword);
      if ((res.code === "SU" || res.code === "SUCCESS") && res.data) {
        setArticles(res.data);
      } else {
        alert(res.message || "검색 결과가 없습니다.");
      }
    } catch (e) {
      alert("크롤링 중 오류 발생");
    }
  };

  const goToAnalyze = (articleId: number) => {
    navigate(`/analysis/${articleId}`);
  };

  const goToTrendReport = () => {
    if (!keyword.trim()) return alert("먼저 키워드를 입력하세요!");
    navigate(`/trend/report/${encodeURIComponent(keyword.trim())}`);
  };

  return (
    <div css={S.Container(articles.length > 0)}>
      <h2>뉴스 검색</h2>

      <div css={S.SearchBox}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="키워드를 입력하세요"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>검색</button>
        {articles.length > 0 && (
          <button onClick={goToTrendReport} css={S.ReportInlineButton}>
            📊 트렌드 리포트
          </button>
        )}
      </div>

      <div css={S.ListBox}>
        {articles.map((article) => (
          <div
            key={article.id}
            css={S.ArticleCard}
            onClick={() => goToAnalyze(article.id)}
          >
            <h3 dangerouslySetInnerHTML={{ __html: article.title }} />
            <p dangerouslySetInnerHTML={{ __html: article.summary }} />
            <span>{article.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

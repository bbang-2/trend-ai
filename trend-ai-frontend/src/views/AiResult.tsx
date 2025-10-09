/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "../styles/AiResult.styles";
import type { AiResultResponseDto } from "../dtos/aiResult/ai-result.response.dto";
import { analyze } from "../apis/aiResult/aiResult.apis";

export default function AiResultView() {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<AiResultResponseDto | null>(null);
  const [loading, setLoading] = useState(false);

  const decodeHtmlEntities = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  useEffect(() => {
    const fetchResult = async () => {
      if (!articleId) return;
      setLoading(true);
      try {
        const res = await analyze(Number(articleId));
        if (res.code === "SU" && res.data) {
          setResult(res.data);
        } else {
          alert(res.message);
        }
      } catch (e) {
        alert("AI 분석 중 오류 발생");
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [articleId]);

  if (loading) return <div css={S.Loading}>분석 중입니다...</div>;
  if (!result) return <div css={S.Container}>분석 결과가 없습니다.</div>;

  return (
    <div css={S.Card}>
      <h2 css={S.Title}>AI 분석 결과</h2>

      <h3
        css={S.ArticleTitle}
        dangerouslySetInnerHTML={{
          __html: decodeHtmlEntities(result.title || ""),
        }}
      />

      <div css={S.Section}>
        <h3 css={S.SubTitle}>요약</h3>
        <p>{result.summary}</p>
      </div>

      <div css={S.Section}>
        <h3 css={S.SubTitle}>감정 분석</h3>
        <div css={S.SentimentCard(result.sentiment)}>
          {(() => {
            const sentiment = result.sentiment?.trim().toLowerCase();

            if (["positive", "긍정"].includes(sentiment)) return "긍정 😊";
            if (["negative", "부정"].includes(sentiment)) return "부정 😞";
            if (["neutral", "중립"].includes(sentiment)) return "중립 😐";

            return "분석 결과 없음";
          })()}
        </div>
      </div>

      <div css={S.Section}>
        <h3 css={S.SubTitle}>키워드</h3>
        <div css={S.KeywordBox}>
          {result.keywords.map((kw, i) => (
            <span key={i}>#{kw}</span>
          ))}
        </div>
      </div>

      <div css={S.ButtonBox}>
        <button css={S.BackBtn} onClick={() => navigate("/search/news")}>
          ← 다시 검색으로
        </button>
      </div>
    </div>
  );
}

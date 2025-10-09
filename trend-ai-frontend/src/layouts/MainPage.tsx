/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as S from "../styles/MainPage.styles";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div css={S.Container}>
      <div css={S.ContentBox}>
        <h1 css={S.Title}>
          <span>Trend</span> AI
        </h1>
        <p css={S.Tagline}>AI 기반 뉴스 트렌드 리포트</p>
        <p css={S.SubText}>
          뉴스 키워드를 검색하면 <br /> 자동으로 요약, 감정 분석, 트렌드 리포트를 생성합니다.
        </p>
        <button css={S.StartBtn} onClick={() => navigate("/search/news")}>
          시작하기
        </button>
      </div>
    </div>
  );
}

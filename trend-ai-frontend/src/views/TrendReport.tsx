/** @jsxImportSource @emotion/react */
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import * as S from "../styles/TrendReport.style";

interface TrendReportSummaryProps {
  keyword: string;
  totalArticles: number;
  positiveRatio: number;
  negativeRatio: number;
  neutralRatio: number;
  topKeywords: string[];
}

const COLORS = ["#ff99c8", "#ffccd5", "#ffd6e0"];

const TrendReportSummary: React.FC<{ report: TrendReportSummaryProps }> = ({ report }) => {
  const { keyword, totalArticles, positiveRatio, negativeRatio, neutralRatio, topKeywords } = report;

  const data = [
    { name: "긍정", value: positiveRatio * 100 },
    { name: "부정", value: negativeRatio * 100 },
    { name: "중립", value: neutralRatio * 100 },
  ];

  return (
    <div css={S.Container}>
      <h2 css={S.Title}>“{keyword}” 트렌드 리포트</h2>
      <p css={S.SubTitle}>총 {totalArticles}개의 기사를 분석했습니다.</p>

      <div css={S.ChartWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name} ${(value as number).toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div css={S.RatioSummary}>
        <div css={S.RatioItem("긍정")}>😊 긍정 {(positiveRatio * 100).toFixed(1)}%</div>
        <div css={S.RatioItem("중립")}>😐 중립 {(neutralRatio * 100).toFixed(1)}%</div>
        <div css={S.RatioItem("부정")}>😞 부정 {(negativeRatio * 100).toFixed(1)}%</div>
      </div>

      <div css={S.KeywordSection}>
        <h3>TOP 5 키워드</h3>
        <div css={S.KeywordList}>
          {topKeywords && topKeywords.length > 0 ? (
            topKeywords.map((k, i) => (
              <span key={i} css={S.KeywordTag}>
                #{k}
              </span>
            ))
          ) : (
            <p>키워드 데이터 없음</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendReportSummary;

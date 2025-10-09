/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Container = css`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 14px rgba(255, 105, 180, 0.15);
  padding: 40px 30px;
  max-width: 760px;
  margin: 50px auto;
  text-align: center;
`;

export const Title = css`
  color: #ff69b4;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const SubTitle = css`
  color: #666;
  font-size: 1rem;
  margin-bottom: 30px;
`;

export const ChartWrapper = css`
  margin: 0 auto;
  width: 100%;
  height: 280px;
`;

export const RatioSummary = css`
  display: flex;
  justify-content: space-around;
  margin: 25px 0;
`;

export const RatioItem = (type: string) => {
  let color = "#999";
  if (type === "긍정") color = "#ff69b4";
  if (type === "중립") color = "#ff99c8";
  if (type === "부정") color = "#ffccd5";

  return css`
    font-weight: 600;
    font-size: 1rem;
    color: ${color};
    background: rgba(255, 228, 240, 0.4);
    border-radius: 12px;
    padding: 8px 14px;
  `;
};

export const KeywordSection = css`
  margin-top: 25px;
`;

export const KeywordList = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const KeywordTag = css`
  background: #ffe3f0;
  color: #ff69b4;
  border-radius: 20px;
  padding: 6px 14px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: #ffb6d5;
    color: #fff;
  }
`;

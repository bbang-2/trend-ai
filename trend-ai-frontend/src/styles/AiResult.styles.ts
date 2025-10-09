/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Container = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 20px;
  background-color: #ffeef4;
  min-height: 100vh;
`;

export const Loading = css`
  font-size: 1.2rem;
  color: #ff7fa8;
  text-align: center;
  margin-top: 100px;
`;

export const Card = css`
  max-width: 700px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  padding: 2rem 3rem;
  text-align: left;
`;

export const Title = css`
  font-size: 1.8rem;
  font-weight: 700;
  color: #d75e94;
  border-bottom: 3px solid #f9a8c7;
  padding-bottom: 0.7rem;
  margin-bottom: 1.8rem;
  letter-spacing: -0.5px;
`;

export const Section = css`
  margin-bottom: 1.8rem;

  p {
    line-height: 1.7;
    color: #4a4a4a;
    font-size: 1rem;
  }
`;

export const SubTitle = css`
  font-size: 1.2rem;
  font-weight: 600;
  color: #4a2b38;
  margin-bottom: 0.8rem;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 35px;
    height: 2px;
    background-color: #f9a8c7;
    margin-top: 4px;
    border-radius: 2px;
  }
`;

export const SentimentCard = (sentiment?: string) => {
  let bgColor = "#f8f8f8";

  if (["positive", "긍정"].includes(sentiment ?? "")) bgColor = "#ffe6f1";
  else if (["negative", "부정"].includes(sentiment ?? "")) bgColor = "#fbe6e6";
  else if (["neutral", "중립"].includes(sentiment ?? "")) bgColor = "#f2f2f2";

  return css`
    background-color: ${bgColor};
    padding: 1rem;
    border-radius: 12px;
    font-weight: 600;
    text-align: center;
    color: #4a2b38;
    font-size: 1.05rem;
  `;
};

export const KeywordBox = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;

  span {
    background-color: #ffe4ec;
    color: #4a2b38;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.95rem;
    font-weight: 500;
  }
`;

export const ButtonBox = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const BackBtn = css`
  background: linear-gradient(90deg, #e76da4);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(231, 109, 164, 0.3);
  }
`;

export const ArticleTitle = css`
  font-size: 1.3rem;
  font-weight: 600;
  color: #4a2b38;
  margin: 1rem 0 2rem;
  text-align: center;
  line-height: 1.4;
`;

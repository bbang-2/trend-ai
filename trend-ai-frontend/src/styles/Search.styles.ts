/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Container = (hasResults: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${hasResults ? "flex-start" : "center"};
  padding: ${hasResults ? "40px 20px" : "20vh 20px"};
  background-color: #fff5fa;
  transition: all 0.3s ease;
`;

export const SearchBox = css`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;

  input {
    padding: 10px 15px;
    border-radius: 12px;
    border: 1.5px solid #ffb6c1;
    font-size: 1rem;
    width: 250px;
    outline: none;
    &:focus {
      border-color: #ff69b4;
      box-shadow: 0 0 5px #ffb6c1;
    }
  }

  button {
    background-color: #ff69b4;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: #ff85c1;
    }
  }
`;

export const ListBox = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 700px;
`;

export const ArticleCard = css`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(255, 182, 193, 0.3);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
  }

  h3 {
    color: #ff69b4;
    margin-bottom: 10px;
  }

  p {
    color: #555;
    line-height: 1.5;
  }

  span {
    color: #999;
    font-size: 0.8rem;
  }
`;

export const ReportButtonWrapper = css`
  margin-top: 40px;
`;

export const ReportButton = css`
  background: #ffe3f0;
  color: #ff69b4;
  font-weight: 600;
  font-size: 1.05rem;
  border: none;
  padding: 12px 28px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 6px rgba(255, 105, 180, 0.15);

  &:hover {
    background: #ffb6d5;
    color: #fff;
  }
`;

export const ReportInlineButton = css`
  background: #ffe3f0;
  color: #ff69b4;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 2px 5px rgba(255, 105, 180, 0.15);

  &:hover {
    background: #ffb6d5;
    color: #fff;
  }
`;
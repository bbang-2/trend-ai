/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  background: radial-gradient(circle at center, #fff0f6 0%, #ffe4ec 60%, #ffffff 100%);
`;


export const ContentBox = css`
  text-align: center;
  padding: 3rem;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(231, 109, 164, 0.15);
`;

export const Title = css`
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -1px;
  color: #4a2b38;
  margin-bottom: 0.5rem;

  span {
    color: #e76da4;
  }
`;

export const Tagline = css`
  font-size: 1.1rem;
  color: #7a5966;
  letter-spacing: 0.5px;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
`;

export const SubText = css`
  font-size: 1rem;
  color: #5f424d;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

export const StartBtn = css`
  background: linear-gradient(90deg, #e76da4);
  color: white;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(231, 109, 164, 0.25);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(231, 109, 164, 0.4);
  }
`;

/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TrendReportSummary from "./TrendReport";

interface TrendReportResponseDto {
  keyword: string;
  totalArticles: number;
  positiveRatio: number;
  negativeRatio: number;
  neutralRatio: number;
  topKeywords: string[];
}

export default function TrendReportPage() {
  const { keyword } = useParams();
  const [report, setReport] = useState<TrendReportResponseDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/trend/report?keyword=${encodeURIComponent(keyword || "")}`
        );
        setReport(res.data.data);
      } catch (err) {
        console.error("리포트 불러오기 실패:", err);
        alert("리포트를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [keyword]);

  if (loading) return <p style={{ textAlign: "center" }}>분석 중입니다...</p>;
  if (!report) return <p style={{ textAlign: "center" }}>리포트를 불러올 수 없습니다.</p>;

  return <TrendReportSummary report={report} />;
}

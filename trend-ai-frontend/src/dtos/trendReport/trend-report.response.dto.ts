export interface TrendReportResponseDto {
  keyword: string;
  totalArticles: number;
  positiveRatio: number;
  negativeRatio: number;
  neutralRatio: number;
  topKeywords: string[];
}
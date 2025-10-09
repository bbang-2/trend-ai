export interface AiResultResponseDto {
  articleId: number;
  title: string;
  summary: string;
  sentiment: string;
  keywords: string[];
}
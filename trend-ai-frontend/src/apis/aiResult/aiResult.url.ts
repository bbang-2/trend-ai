import { API_BASE } from "../constants"

const ANALYSIS_MODULE_URL = `${API_BASE}/analysis`;

export const  ARTICLE_URl = (articleId: number) => `${ANALYSIS_MODULE_URL}/${articleId}`;
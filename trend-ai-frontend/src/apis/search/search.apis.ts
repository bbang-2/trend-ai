import type { AxiosError } from "axios";
import type { CrawledDataResponseDto } from "../../dtos/crawledData/crawled-data.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHadler, responseSuccessHandler } from "../axios-config";
import { NEWS_URL } from "./search.url";

export const crawlNews = async (
  keyword: string,
): Promise<ResponseDto<CrawledDataResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      NEWS_URL,
      { params: { keyword } }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHadler (error as AxiosError<ResponseDto>);
  }
}
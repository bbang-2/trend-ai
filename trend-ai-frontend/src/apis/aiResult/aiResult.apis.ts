import type { AxiosError } from "axios";
import type { AiResultResponseDto } from "../../dtos/aiResult/ai-result.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHadler, responseSuccessHandler } from "../axios-config";
import { ARTICLE_URl } from "./aiResult.url";

export const analyze = async (
  articleId: number,
): Promise<ResponseDto<AiResultResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      ARTICLE_URl(articleId),
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHadler (error as AxiosError<ResponseDto>);
  }
}
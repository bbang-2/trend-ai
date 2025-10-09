import type { AxiosError } from "axios";
import type ResponseDto from "../../dtos/response.dto";
import type { TrendReportResponseDto } from "../../dtos/trendReport/trend-report.response.dto";
import { axiosInstance, responseErrorHadler, responseSuccessHandler } from "../axios-config";
import { REPROT_URL } from "./trendReport.url";

export const analyze = async (
): Promise<ResponseDto<TrendReportResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      REPROT_URL
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHadler (error as AxiosError<ResponseDto>);
  }
}
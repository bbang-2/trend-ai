import axios, { AxiosError, type AxiosResponse } from "axios";
import type ResponseDto from "../dtos/response.dto";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_DOMAIN || "http://localhost:8080",
  timeout: 5000,
});

export const responseSuccessHandler = <T = any >(response: AxiosResponse<ResponseDto<T>>) => {
  return response.data;
}

export const responseErrorHadler = (error: AxiosError<ResponseDto>) => {
  if (!error.response) {
    return {
      code: "NETWORL_ERROR",
      message: "네트워크 오류",
      data: null
    };
  }

  return error.response.data
}

export const bearerAuthorization = (accessToken: string) => ({
  headers: { Authorization: `Bearer ${accessToken}`},
});
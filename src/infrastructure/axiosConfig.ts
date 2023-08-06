import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import BaseResponse from "./dtos/BaseResponse";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem(
//       import.meta.env.VITE_ACCESS_TOKEN_KEY
//     );
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     if (accessToken)
//       if (!import.meta.env.PROD) {
//         console.log("url:", config.url);
//         console.log("request data:", config.data);
//       }

//     return config;
//   },
//   (error) => {
//     if (!import.meta.env.PROD) {
//       console.log("axios request error:", error);
//     }
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use((config) => {
  if (!import.meta.env.PROD) {
    console.log("response status:", config.status, config.statusText);
    console.log("response data:", config.data);
  }

  return config;
});

export default async function handleAxiosRequest<T, E = any>(
  request: (axios: AxiosInstance) => Promise<AxiosResponse<BaseResponse<T>>>
): Promise<[T?, ResponseError<E>?]> {
  try {
    const response = await request(axiosInstance);
    return [response.data.data];
  } catch (error: any) {
    if (error instanceof AxiosError && error.response?.data) {
      return [
        ,
        {
          message: error.response.data.message,
          data: error.response.data.data,
        },
      ];
    }

    return [, { message: error.message }];
  }
}

interface ResponseError<T> {
  data?: T;
  message: string;
}

interface RequestArgs {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

export const axiosBaseQuery =
  (): BaseQueryFn<RequestArgs, unknown, ResponseError<any>> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const response = await axiosInstance<BaseResponse<any>>({
        url: url,
        method,
        data,
        params,
        headers,
      });
      return { data: response.data.data };
    } catch (error: any) {
      if (error instanceof AxiosError && error.response?.data) {
        return {
          error: {
            message: error.response.data.message,
            data: error.response.data.data,
          },
        };
      }

      return { error: { message: error.message } };
    }
  };

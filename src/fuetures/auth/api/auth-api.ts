import { BaseResponse } from "common/types";
import { baseApi } from "../../../app/model/base-api";

export type LoginParams = {
  email: string,
  password: string,
  rememberMe?: boolean,
  captcha?: string
}

export const authAPI = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => "/auth/me"
    }),
    getCaptcha: build.mutation<{ url: string }, void>({
      query: () => "/security/get-captcha-url"
    }),
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginParams>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload
      })
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        url: "/auth/login",
        method: "DELETE",
      })
    })
  })
});
export const {useMeQuery, useLoginMutation, useLogoutMutation, useGetCaptchaMutation} = authAPI
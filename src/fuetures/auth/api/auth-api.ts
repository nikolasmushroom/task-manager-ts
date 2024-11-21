import { baseURL } from "common/instance";
import { BaseResponse } from "common/types";

export type LoginParams = {
  email: string,
  password: string,
  rememberMe?: boolean,
  captcha?: string
}
export const authAPI = {
  login(params: LoginParams) {
    return baseURL.post<BaseResponse<{ userId: number; token: string }>>("/auth/login", params);
  },
  logout() {
    return baseURL.delete<BaseResponse>("/auth/login");
  },
  authMe() {
    return baseURL.get<BaseResponse<{ id: number; email: string; login: string }>>("/auth/me");
  },
  getCaptcha(){
    return baseURL.get<{url : string}>('/security/get-captcha-url');
  }
};
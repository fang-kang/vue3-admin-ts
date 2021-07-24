/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 11:31:49
 */
import Request from "@/utils/request";
// 登录
export const login = (params: any): any =>
  Request.form({ url: "/user/login", data: params });

// 注册
export const register = (params: any): any =>
  Request.form({ url: "/user/register", data: params });

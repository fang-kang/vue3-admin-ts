/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 11:31:49
 */
import Request from "utils/request";
// 插入
export const insert = (params: object): any =>
  Request.post({ url: "/nbphs/eldHealthIncapacitation/insert", data: params });

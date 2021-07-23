/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 11:15:48
 */
/**
 * @description: 根据params生成url
 * @author: fangkang
 * @param {string} url
 * @param {any} params
 * @return {*}
 */
export const getFullUrl = (url: string, params: any = {}) => {
  const hasParams = url.includes("?");
  let res = url;
  Object.keys(params).forEach((key, index) => {
    const value = params[key];
    if (index === 0 && !hasParams) {
      res += "?";
    }
    if (index !== 0) {
      res += "&";
    }
    res += `${key}=${value}`;
  });
  return res;
};

/**
 * 获取url参数
 * @param variable
 * @returns {string|boolean}
 */
export function getQueryInUrl(isHash = false): string | boolean {
  let arr: string[] = ((isHash ? location.hash : location.search) || "")
    .replace(/^#/, "")
    .split("?");
  if (Array.isArray(arr) && arr.length > 1) {
    arr = arr[1].split("&");
  } else {
    arr = [];
  }
  const params: any = {};
  for (let i = 0; i < arr.length; i++) {
    const data = arr[i].split("=");
    if (data.length == 2) {
      params[data[0]] = data[1];
    }
  }
  return params;
}

/*
 * @Descripttion: axios请求封装
 * @Author: 房康
 * @Date: 2021-07-23 11:04:30
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { stringify } from "qs";
import { Local } from "@/utils/storage";
import { message } from "ant-design-vue";
import { getEnv, IEnv } from "@/plugins/version";

const messageWhiteList = ["登录已失效，请重新登录"];

const baseURL: any = import.meta.env.VITE_GLOB_API_URL;

/**
 * @description: 获取ie浏览器版本是否低于11
 * @author: fangkang
 */
const env: IEnv = getEnv();

export interface ResponseData {
  code: number;
  data?: any;
  message: string;
}

interface IRequestToken {
  markKey: string;
  cancel: () => void;
}
let requestTokenArray: IRequestToken[] = [];

/**
 * @description: 取消请求
 * @author: fangkang
 * @param {string} key
 * @return {*}
 */
export const cancelRequest = (key: string): any => {
  requestTokenArray.forEach((item) => {
    if (item.markKey === key && item.cancel) {
      item.cancel();
    }
  });
  requestTokenArray = requestTokenArray.filter((item) => item.markKey !== key);
};

/**
 * @description: 完成请求
 * @author: fangkang
 * @param {string} key
 * @return {*}
 */
const finishRequest = (key: string): any => {
  requestTokenArray = requestTokenArray.filter((item) => item.markKey !== key);
};

/**
 * @description: 取消所有请求
 * @author: fangkang
 * @param {*}
 * @return {*}
 */
const cancelAll = (): any => {
  requestTokenArray.forEach((item) => {
    if (item.cancel) {
      item.cancel();
    }
  });
  requestTokenArray = [];
};

// 暂停2s的message的显示
const messagePause = () => {
  const oldMessageError = message.error;
  const oldMessageWarn = message.warning;

  const pauseFunc = (data: any) => {
    if (messageWhiteList.includes(data)) {
      oldMessageError(data);
    }
    console.log("messagePause", data);
  };

  // @ts-ignore
  message.error = pauseFunc;
  // @ts-ignore
  message.warn = pauseFunc;
  // @ts-ignore
  message.warning = pauseFunc;
  setTimeout(() => {
    // @ts-ignore
    message.error = oldMessageError;
    // @ts-ignore
    message.warn = oldMessageWarn;
    // @ts-ignore
    message.warning = oldMessageWarn;
  }, 2000);
};

const service: AxiosInstance = axios.create({
  baseURL,
  timeout: 120000, // 超时时间
});

/**
 * @description: 获取缓存
 * @author: fangkang
 * @param {any} option
 * @return {*}
 */
const getCacheKey = (option: any): string => {
  return JSON.stringify(option);
};

/**
 * @description:
 * @author: fangkang
 * @param {any} options
 * @return {*}
 */
const getFixedOptionsKey = (options: any) => {
  const { url, method, params, data } = options;
  let filterParams = { ...params };
  if (params) {
    const { csRandomTime, ...rest } = params;
    filterParams = rest || {};
  }
  return getCacheKey({
    url,
    method,
    params: filterParams,
    data,
  });
};

/**
 * @description:
 * @author: fangkang
 * @param {any} option
 * @return {*}
 */
const processService = (option: any) => {
  /**
   * cache 为number 作用为接口缓存时间 单位为s
   */
  const { cache, params = {} } = option;
  let cacheData: any;
  option.params = {
    ...(params || {}),
    csRandomTime: new Date().getTime() + Math.random(),
  };
  if (cache) {
    const cacheRequestKey = getFixedOptionsKey(option);
    option.cacheRequestKey = cacheRequestKey;
    cacheData = Local.get(cacheRequestKey);
  }
  if (cacheData) {
    return new Promise((resolve) => {
      resolve(cacheData);
    });
  } else {
    return service(option);
  }
};

const LoseEfficacyTokenCode = 22103;
/**
 * @description: axios请求拦截器
 * @author: fangkang
 * @param {*}
 * @return {*}
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something before request is sent
    const token = Local.get("token");
    if (token) {
      config.headers.authToken = token;
    }
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    config.cancelToken = source.token;
    const markKey = getFixedOptionsKey(config);
    // @ts-ignore
    config.markKey = markKey;
    requestTokenArray.push({
      markKey,
      cancel: source.cancel,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * @description: axios响应拦截器
 * @author: fangkang
 * @param {*}
 * @return {*}
 */
// response interceptors
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    const config: any = response.config;
    // @ts-ignore
    finishRequest(config.markKey);
    const { isDownload } = config;
    if (res.code !== 1 && !isDownload) {
      // @ts-ignore
      const { noErrorMsg } = config || {};
      if (res.code !== LoseEfficacyTokenCode && !noErrorMsg) {
        console.log("res.msg");
        return res;
      }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === LoseEfficacyTokenCode) {
        // AccountModule.logOut(true);
        // 以下操作均为为了message显示一个
        messagePause();
        cancelAll();
        message.error("登录已失效，请重新登录");
        throw new Error(res);
      }
      if (noErrorMsg) {
        throw res;
      } else {
        throw res ? res.msg || "Error" : "Error";
      }
    } else if (isDownload) {
      const { headers } = response;
      let { downloadName } = config;
      if (!downloadName) {
        const nameInfo = headers["content-disposition"] || "";
        const nameInfoList = nameInfo.split(";filename=");
        downloadName = decodeURIComponent(nameInfoList[1] || nameInfoList[0]);
      }
      const blob = new Blob([res]);
      const link = document.createElement("a");
      // 非ie
      if ("download" in link) {
        link.download = downloadName;
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      } else {
        navigator.msSaveBlob(blob, downloadName);
      }

      return res;
    } else {
      // @ts-ignore
      const { cacheRequestKey, cache } = response.config;
      // 如果配置了缓存时间可以进行缓存读取
      if (cacheRequestKey && cache) {
        Local.set(cacheRequestKey, res, cache * 1000);
      }
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    const config = error.config;
    const { noErrorMsg } = config || {};
    if (!noErrorMsg) {
      console.log(error.message, "error.message");
    }
    // eslint-disable-next-line no-throw-literal
    throw "服务错误,请稍后重试";
  }
);

export default {
  post: (options = {}) => {
    return processService({
      method: "post",
      ...options,
    });
  },
  get: (options = {}) => {
    return processService({
      method: "get",
      ...options,
    });
  },
  form: (options: any = {}) => {
    return processService({
      method: "post",
      ...options,
      data: stringify(options.data || {}),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...(options.headers || {}),
      },
    });
  },
  downloadPost: (options: any = {}) => {
    if (env.isLow) {
      message.warning("暂不支持低版本浏览器的导出,请更换ie10及以上");
      return true;
    }
    return processService({
      method: "post",
      ...options,
      responseType: "blob",
      isDownload: true,
    });
    // 以下是通过formPost下载文件的方式
    // const { url, data, params } = options;
    // const fullUrl = getFullUrl(url, params);
    // const iframeName = 'hideIframe' + '_download';
    // if (!document.getElementById(iframeName)) {
    //   const iframe = document.createElement('iframe');
    //   iframe.setAttribute('name', iframeName);
    //   iframe.setAttribute('id', iframeName);
    //   iframe.setAttribute('style', 'display:none');
    //   document.body.appendChild(iframe);
    // }
    // const form = document.createElement('form');
    // form.setAttribute('style', 'display:none');
    // form.setAttribute('target', '');
    // form.setAttribute('method', 'post');
    // form.setAttribute('onsubmit', 'return false');
    // form.setAttribute('action', fullUrl);// URL
    // form.setAttribute('target', iframeName);
    // document.body.appendChild(form);
    // const arrFile = stringify(data || {});
    // if (arrFile && data) {
    //   Object.keys(data).forEach(key => {
    //     const value = data[key];
    //     if (typeof value !== 'object' && value !== undefined) {
    //       const input = document.createElement('input');
    //       input.setAttribute('type', 'hidden');
    //       input.setAttribute('name', key);
    //       input.setAttribute('value', `${value}`);
    //       form.appendChild(input);
    //     }
    //   });
    // }
    // form.submit();
    // document.body.removeChild(form);
  },
};

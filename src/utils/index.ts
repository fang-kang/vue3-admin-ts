/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 11:15:48
 */
import dayjs from "dayjs";

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
 * @description: 获取url参数
 * @author: fangkang
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

/**
 * @description:判断是null、'null'、undefined、'undefined'、''
 * @author: fangkang
 * @param any
 * @returns true | false
 */
export function include(param: string | null | undefined) {
  const emptyArr = [null, "null", undefined, "undefined", ""];
  return emptyArr.includes(param);
}

/**
 * @description: 日期补0
 * @author: fangkang
 * @param {string} value
 * @return {*}
 */
export function padaDate(value: string | number) {
  return value < 10 ? "0" + value : value;
}

/**
 * @description: 获取当前时间并实时刷新
 * @author: fangkang
 * @param {*}
 * @return {*}
 */
export function currentTime(): any {
  // 创建一个时间日期对象
  const date = new Date();
  const year = date.getFullYear(); // 存储年
  const month = padaDate(date.getMonth() + 1); // 存储月份
  const day = padaDate(date.getDate()); // 存储日期
  const hours = padaDate(date.getHours()); // 存储时
  const minutes = padaDate(date.getMinutes()); // 存储分
  const seconds = padaDate(date.getSeconds()); // 存储秒
  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}

/**
 * @description: base64PngToFile
 * @author: fangkang
 * @param {string} dataURI
 * @param {*} type
 * @return {*}
 */
export function base64PngToFile(dataURI: string, type = "jpeg") {
  const binary = atob(dataURI.split(",")[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  const fileData = new Blob([new Uint8Array(array)], { type: `image/${type}` });
  return new File([fileData], new Date().getTime() + `.${type}`);
}

/**
 * @description: 判断是否一个其中只包含简单类型数据 如string number 等的数组完全相等
 * @author: fangkang
 * @param arrayA
 * @param arrayB
 * @returns {boolean|boolean}
 */
export function isEqualEasyArray(
  arrayA: any[],
  arrayB: string | any[]
): boolean | boolean {
  return (
    Array.isArray(arrayA) &&
    Array.isArray(arrayB) &&
    arrayA.length === arrayB.length &&
    arrayA.every((item, index) => {
      return item === arrayB[index];
    })
  );
}

/**
 * @description: 获取hash上的参数
 * @author: fangkang
 * @param {*}
 * @return {*}
 */
export function getHashParams(): any {
  const hash = window.location.hash;
  const paramsStr = hash ? hash.split("?")[1] : "";
  const result: any = {};
  if (paramsStr) {
    const paramsArray = paramsStr.split("&");
    paramsArray.forEach((item) => {
      const key = item.split("=")[0];
      const value = item.split("=")[1];
      result[key] = value;
    });
  }
  return result;
}

/**
 * @description: 获取时间对象 解决ios兼容性问题
 * @author: fangkang
 * @param {string} date
 * @return {*}
 */
export function getDate(
  date: string | number | Date | dayjs.Dayjs | null | undefined
) {
  const dateObj = dayjs(date);
  return dateObj.toDate();
}

/**
 * @description: 截取时间的前5位截取
 * @author: fangkang
 * @param {string} data
 * @return {*}
 */
export function splieTime(data: string): any {
  return data.substring(0, 5);
}

/**
 * @description: 处理链接拼接
 * @author: fangkang
 * @param {*}
 * @return {*}
 */
export function getUrlHashBefore(): any {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}#`;
}

/**
 * @description:
 * @author: fangkang
 * @param {object} params
 * @return {*}
 */
export function getQueryStr(params: { [x: string]: any }): any {
  let paramsStr = "";
  Object.keys(params).forEach((key, index) => {
    if (params[key] !== undefined) {
      if (index !== 0) {
        paramsStr += "&";
      }
      paramsStr += `${key}=${params[key]}`;
    }
  });
  return paramsStr;
}

/**
 * @description: 时间格式化
 * @author: fangkang
 * @param {any} date
 * @param {*} format
 * @return {*}
 */
export function formatDate(date: any, format: any = "YYYY-MM-DD"): any {
  return dayjs(date).format(format);
}

/**
 * @description:根据birthday计算年龄
 * @author: fangkang
 * @param {string} birthday
 * @return {*}
 */
export function getAge(birthday: string | number | Date): any {
  let day: any;
  if (typeof birthday === "string") {
    day = new Date(birthday);
  } else {
    day = birthday;
  }
  const now = new Date();
  const mistiming = now.getTime() - day.getTime();
  return Math.floor(mistiming / (365 * 24 * 60 * 60 * 1000));
}

/**
 * @description:获取时间展示 如下午 2:07
 * @author: fangkang
 * @param time
 * @returns {string}
 */
export function getTimeWithExplain(
  time: string | number | Date | dayjs.Dayjs | null | undefined
): string {
  if (dayjs(time).isValid()) {
    // 秒为单位
    const date = dayjs(time);
    const dateNumer = date.unix();
    const now = dayjs(Date.now());
    const today = now.startOf("day");
    const nowNumber = now.unix();
    const gapNumber = nowNumber - dateNumer;
    console.log(gapNumber);
    const base = date
      .format("a hh:mm")
      .replace("am", "上午")
      .replace("pm", "下午");
    if (date.isAfter(today)) {
      // 当天
      return base;
    } else if (date.isAfter(today.subtract(1, "day"))) {
      // 昨天及以前
      return "昨天 " + base;
    } else if (date.isAfter(now.startOf("year"))) {
      return date.format("MM-DD ") + base;
    } else {
      return date.format("YYYY-MM-DD ") + base;
    }
  }
  console.error("错误的时间类型", time);
  return "";
}

/**
 * @description:节流原理：在一定时间内，只能触发一次
 * @author: fangkang
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
export function throttle(
  func: () => any,
  wait: number = 500,
  immediate: boolean = true
) {
  let timer, flag;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === "function" && func();
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(() => {
        flag = false;
        typeof func === "function" && func();
      }, wait);
    }
  }
}

/**
 * @description: 判断arr是否为一个数组，返回一个bool值
 * @author: fangkang
 * @param {*any} arr
 * @return {*boolean}
 */
export function isArray(arr: any): boolean {
  return Object.prototype.toString.call(arr) === "[object Array]";
}

/**
 * @description: 深度克隆
 * @author: fangkang
 * @param {any} obj
 * @return {*}
 */
export function deepClone(obj: any): any {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== "function") {
    //原始类型直接返回
    return obj;
  }
  var o: any = isArray(obj) ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}

/**
 * @description: JS对象深度合并
 * @author: fangkang
 * @param {any} target
 * @param {any} source
 * @return {*}
 */
export function deepMerge(target: any = {}, source: any = {}) {
  target = deepClone(target);
  if (typeof target !== "object" || typeof source !== "object") return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== "object") {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== "object") {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}

/**
 * @description: 数组排序
 * @author: fangkang
 * @param {*Array} 所需排序的数组
 * @param {*string | number} 排序的依据字段
 * @param {*boolean} 默认true -> 正序（小 -> 大） / false -> 倒序（大 -> 小）
 * @return {*Array} 排序数组
 */
export const sortCompare = (
  arr: any[],
  prop: string | number,
  order: boolean = true
): any => {
  return arr.sort(compare(prop, order));
};

function compare(prop: string | number, order: boolean) {
  return (obj1: { [x: string]: any }, obj2: { [x: string]: any }) => {
    let val1 = obj1[prop];
    let val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (order) {
      if (val1 < val2) return -1;
      else if (val1 > val2) return 1;
      else return 0;
    } else {
      if (val1 > val2) return -1;
      else if (val1 < val2) return 1;
      else return 0;
    }
  };
}

/** 
 * @description: 获取url上参数
 * @author: fangkang
 * @param {string} url
 * @returns {Object}
 */
 export function param2Obj(url: string): object {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj :any= {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
/**
 * 使用方法：
 * // Local为本地缓存，Session为会话缓存
 * import { Local, Session } from '@/utils/storage'
 *
 */

const EXPIRE_KEY = "__expires";
// 无限时间
const InfinityTime = -1;

// 登陆时记录账号密码的key
export const loginInfoKey = "login_info_registrar";

// 白名单 删除时不删除这些
const whiteList = [loginInfoKey];

class CustomStorage {
  storageClass: Storage = window.localStorage;

  constructor(storageType: string) {
    if (storageType === "sessionStorage") {
      this.storageClass = window.sessionStorage;
    }
  }

  /**
   * 存值，这里注意无需进行Object的转换，存什么都可以，方法内部会自动做类型转换
   * @param {*} key 存储key
   * @param {*} value 存储值
   * @param {*} time 有效时间，默认为永久
   */
  set(key: string, value: any, time: any = InfinityTime) {
    const data = {
      [EXPIRE_KEY]: time === InfinityTime ? time : Date.now() + time,
      value,
    };
    this.storageClass.setItem(key, JSON.stringify(data));
  }

  /**
   * 取值，这里如果是JsonObject类型会自动帮你转回原类型
   * 取值后无需再多做一次类型转换
   * @param {*} key
   */
  get(key: string) {
    const data = this.storageClass.getItem(key);
    if (data) {
      const parsedData = JSON.parse(data);
      const expireTime = parsedData[EXPIRE_KEY];
      if (expireTime === InfinityTime || expireTime >= Date.now()) {
        return parsedData.value;
      } else {
        // 过期则清空对应key数据
        this.del(key);
      }
    }
    return null;
  }

  del(key: string) {
    this.storageClass.removeItem(key);
  }

  clear() {
    const length = this.storageClass.length;
    for (let i = 0; i < length; i++) {
      const key = this.storageClass.key(i);
      if (typeof key == "string" && !whiteList.includes(key)) {
        this.del(key);
      }
    }
  }

  clearAll() {
    this.storageClass.clear();
  }
}

export const Local = new CustomStorage("localStorage");

export const Session = new CustomStorage("sessionStorage");

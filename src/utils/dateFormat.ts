/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 11:37:01
 */
import dayjs from "dayjs";
/**
 * @description: 时间格式化
 * @author: fangkang
 * @param {any} date
 * @param {any} format
 * @return {*}
 */
export function formatDate(date: any, format: any = "YYYY-MM-DD"): any {
  return dayjs(date).format(format);
}


export function IEVersion() {
  // 取得浏览器的userAgent字符串
  const userAgent = navigator.userAgent;
  // 判断是否为小于IE11的浏览器
  const isLessIE11 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
  // 判断是否为IE的Edge浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isLessIE11;
  // 判断是否为IE11浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isLessIE11) {
    const IEReg = new RegExp('MSIE (\\d+\\.\\d+);');
    // 正则表达式匹配浏览器的userAgent字符串中MSIE后的数字部分，，这一步不可省略！！！
    IEReg.test(userAgent);
    // 取正则表达式中第一个小括号里匹配到的值
    const IEVersionNum = parseFloat(RegExp.$1);
    return IEVersionNum;
  } else if (isIE11 || isEdge) {
    // IE11
    return 11;
  } else {
    // 不是ie浏览器
    return false;
  }
}
export interface IEnv {
  supportAnimation: boolean
  isLow: boolean
}
/**
 * @description: 是否是ie11以下版本判断
 * @author: fangkang
 * @param {*} IEnv
 * @return {*supportAnimation 是否支持动画} 
 * @return {*isLow 是否是ie11以下版本} 
 */
export const getEnv = ():IEnv => {
  const supportAnimation = !!window.AnimationEvent;
  const ieVersion = IEVersion();
  // 是否是ie11以下版本判断
  const isLow = !!(ieVersion && ieVersion < 11);
  return {
    supportAnimation,
    isLow
  };
};

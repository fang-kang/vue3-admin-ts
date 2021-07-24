/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 19:55:38
 */
import { onMounted, ref } from "vue";
import useWinResize from "./useWinResize";
/**
 *
 * @param {dom id节点或者 ref句柄} target
 */
export default function useRem() {
  const htmlFontSize = ref(100);
  const setRem = () => {
    const baseSize = 100;
    const uiWidth = 1920;
    const clientWidth = document.documentElement.clientWidth;
    const scale = clientWidth / uiWidth;
    // @ts-ignore
    const fontSize: any = parseInt(baseSize * Math.min(scale, 2)) + "px";
    console.log("root-font-size:", fontSize);
    htmlFontSize.value = Number(fontSize);
    if (window.document) {
      window.document.documentElement.style.fontSize = fontSize
    }
  };
  useWinResize(setRem);
  onMounted(() => {
    setRem();
  });
  return {
    htmlFontSize,
  };
}

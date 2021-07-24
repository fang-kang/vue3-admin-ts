/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 19:53:32
 */
import { onMounted, onBeforeUnmount, nextTick } from "vue";

export default function useWinResize(Action = () => {}) {
  const fn = () => {
    /**
     * 延迟更新重绘等操作
     */
    nextTick(() => {
      Action();
    });
  };
  onMounted(() => {
    window.addEventListener("resize", fn, false);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", fn);
  });
  return null;
}

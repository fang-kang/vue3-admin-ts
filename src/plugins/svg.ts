/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-25 13:08:48
 */
import "vite-plugin-svg-icons/register";
// 需要全局引入再添加
import svgIcon from "@/components/SvgIcon/index.vue"; // 全局svg图标组件
import type { App } from "vue";
export default {
  install(app: App) {
    app.component("svg-icon", svgIcon);
  },
};

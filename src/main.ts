/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-16 17:10:27
 */
import { createApp } from "vue";

import App from "./App.vue";

import router from "@/router";

import "normalize.css/normalize.css"; /* a modern alternative to CSS resets */

import "@/router/route";

import "@/styles/common.scss"; /* common */

// import Antd from "ant-design-vue";

import "ant-design-vue/dist/antd.css";

import directives from "@/directives"; /* 全局指令 */

import store from "@/store";

import Element from "@/plugins/element"; /* Element按需引入 */

import Antd from "@/plugins/antd"; /* Antd按需引入 */

const app = createApp(App);

// 注册全局指令
for (const key in directives) {
  // @ts-ignore
  app.directive(key, directives[key]);
}

app.use(router).use(store).use(Element).use(Antd).mount("#app");

/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-16 17:10:27
 */
import { createApp } from "vue";

import App from "./App.vue";

import router from "./router";

import store from "./store";
/* Element按需引入 */
import Element from "./plugins/element";
/* Antd按需引入 */
import Antd from "./plugins/antd";

const app = createApp(App);

app.use(router).use(store).use(Element).use(Antd).mount("#app");

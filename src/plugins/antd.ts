/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 09:36:23
 */
import {
  message,
  Button,
  Form,
  Card,
  Input,
  InputPassword,
  Layout,
  Menu,
  LayoutHeader,
  LayoutSider
} from "ant-design-vue";
import type { App } from "vue";

export { message };
const components = [
  message,
  Button,
  Form,
  Card,
  Input,
  InputPassword,
  Layout,
  Menu,
  LayoutHeader,
  LayoutSider
];
export default {
  install: (app: App) => {
    components.forEach((component: any) => {
      app.use(component);
    });
    app.config.globalProperties.$antMessage = message;
  },
};

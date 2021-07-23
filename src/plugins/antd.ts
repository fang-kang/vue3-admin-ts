/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 09:36:23
 */
import { message } from "ant-design-vue";
import type { App } from "vue";

export { message };
const components = [message];
export default {
  install: (app: App) => {
    components.forEach((component: any) => {
      app.component(component.name, component);
    });
    app.config.globalProperties.$antMessage = message;
  },
};

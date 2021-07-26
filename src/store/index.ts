/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-17 10:58:28
 */
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import getters from "./getters";
import app from "./modules/app";
import setting from "./modules/setting";
import tagsView from "./modules/tagsView";
// const modules = import.meta.globEager("./modules/*.ts");
// const map: any = {};
// Object.keys(modules).forEach((file) => {
//   const modulesName = file.replace("./modules/", "").replace(".ts", "");
//   map[modulesName] = modules[file].default;
// });

// export const key: InjectionKey<Store<any>> = Symbol();

const store = createStore({
  modules: {
    // ...map,
    app,
    setting,
    tagsView,
  },
  getters,
});
export default store;

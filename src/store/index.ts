/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-17 10:58:28
 */
import { createStore } from "vuex";

// import path from "path";
// const requireModules = require.context("./modules", true, /index\.(ts|js)$/iu);

// const modules: any = {};

// requireModules.keys().forEach((filePath: string) => {
//   const modular = requireModules(filePath);
//   let name: any = path.resolve(filePath, "..");
//   name = name.split("/").pop();
//   modules[name] = {
//     namespaced: true,
//     ...modular.default,
//   };
// });
interface State {
  userName: string;
}
export default createStore({
  state(): State {
    return {
      userName: "vuex",
    };
  },
  modules: {},
});

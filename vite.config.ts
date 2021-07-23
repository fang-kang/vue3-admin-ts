/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-16 17:10:27
 */
import { defineConfig } from "vite"; // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import styleImport from "vite-plugin-style-import";

/**
 * @description: 主要用于alias文件路径别名
 * @author: fangkang
 * @param {string} dir
 * @return {*}
 */
function pathResolve(dir: string): any {
  return resolve(__dirname, dir);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
        {
          libraryName: "ant-design-vue",
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/css`;
          },
        },
      ],
    }),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": pathResolve("src"),
      components: pathResolve("src/components"),
      assets: pathResolve("src/assets"),
      router: pathResolve("src/router"),
      views: pathResolve("src/views"),
      utils: pathResolve("src/utils"),
      apis: pathResolve("src/apis"),
      plugins: pathResolve("src/plugins"),
      mixins: pathResolve("src/mixins"),
      types: pathResolve("src/types"),
      hooks: pathResolve("src/hooks"),
      styles: pathResolve("src/styles"),
    },
    // alias: [
    //   // /@/xxxx => src/xxxx
    //   {
    //     find: /\/@\//,
    //     replacement: pathResolve('src') + '/',
    //   },
    //   // /#/xxxx => types/xxxx
    //   {
    //     find: /\/#\//,
    //     replacement: pathResolve('types') + '/',
    //   },
    //   // ['@vue/compiler-sfc', '@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js'],
    // ],
  },
});

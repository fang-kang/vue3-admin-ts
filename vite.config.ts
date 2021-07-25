/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-16 17:10:27
 */
import { defineConfig } from "vite"; // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import styleImport from "vite-plugin-style-import";
import viteSvgIcons from 'vite-plugin-svg-icons';

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
    viteSvgIcons({
      // 配置路劲在你的src里的svg存放文件
      iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
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
        // {
        //   libraryName: "ant-design-vue",
        //   esModule: true,
        //   resolveStyle: (name) => {
        //     return `ant-design-vue/es/${name}/style`;
        //   },
        // },
      ],
    }),
  ],
  base: "./",
  // 服务配置
  server: {
    port: 3001,
    cors: true, // 默认启用并允许任何源
    https: false,
    open: true,
    proxy: {
      "/user": {
        target: "http://8.130.31.13:3001",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/user/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 更改主题在这里
          "primary-color": "#52c41a",
          "link-color": "#1DA57A",
          "border-radius-base": "2px",
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    // 去除console
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});

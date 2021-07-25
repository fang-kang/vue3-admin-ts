/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-17 10:58:20
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const whiteList = [
  {
    path: "/login",
  },
];

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/index/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/test",
    name: "Test",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/index/test.vue"),
    meta: {
      title: "测试",
    },
  },
  {
    path: "/:path(.*)*",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/error/404.vue"),
    meta: {
      title: "找不到页面",
    },
  },
];
// Vue-router新版本中，需要使用createRouter来创建路由
const Router = createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  routes: constantRoutes, // short for `routes: routes`
});

export default Router;

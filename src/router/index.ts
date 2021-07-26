/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-17 10:58:20
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
/* Layout */
import Layout from "@/layouts/index.vue";
export const whiteList = [
  {
    path: "/login",
  },
];

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
    },
  },
  {
    path: "/redirect",
    meta: { hidden: true },
    component: Layout,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  }, // 重定向
  {
    path: "/home",
    component: Layout,
    meta: { title: "首页", icon: "logo", affix: true },
    children: [
      {
        path: "home",
        component: () => import("@/views/index/index.vue"),
        name: "Home",
        meta: { title: "首页", icon: "logo", affix: true },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: { title: "仪表盘", icon: "dashboard" },
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "仪表盘", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/form",
    component: Layout,
    meta: { title: "表单", icon: "form" },
    children: [
      {
        path: "formIndex",
        component: () => import("@/views/form/index.vue"),
        name: "FormIndex",
        meta: { title: "表单", icon: "form" },
      },
      {
        path: "formData",
        component: () => import("@/views/form/form.vue"),
        name: "FormData",
        meta: { title: "表单数据", icon: "form" },
      },
    ],
  },
  {
    path: "/test",
    component: Layout,
    meta: { title: "测试", icon: "documentation" },
    children: [
      {
        path: "index",
        component: () => import("@/views/index/test.vue"),
        name: "Test",
        meta: { title: "测试", icon: "documentation" },
      },
    ],
  },
  {
    path: "/:path(.*)*",
    component: () => import("@/views/error/404.vue"),
    meta: {
      title: "找不到页面",
      hidden: true,
    },
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: Array<RouteRecordRaw> = [];
// Vue-router新版本中，需要使用createRouter来创建路由
const Router = createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  routes: constantRoutes, // short for `routes: routes`
});
// const Router = createRouter({
//   history: createWebHashHistory(),
//   routes: constantRoutes,
//   scrollBehavior: () => ({ left: 0, top: 0 }),
// });
// export function resetRouter() {
//     const newRouter = createRouter()
//     router.matcher = newRouter.matcher // reset router
// }
export default Router;

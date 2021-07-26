/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 14:39:07
 */
import router, { whiteList } from "@/router";
import getPageTitle from "@/utils/get-page-title";
import NProgress from "nprogress";
import { Local } from "@/utils/storage";
import "nprogress/nprogress.css";

// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500 });

/**
 * @description: 路由拦截
 * @author: fangkang
 * @param {*} async
 * @param {any} from
 * @param {any} next
 * @return {*}
 */
router.beforeEach(async (to: any, from: any, next: any) => {
  // console.log("to", to);
  // console.log("from", from);
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  const token = Local.get("token");
  if (token) {
    next();
    NProgress.done();
  } else {
    if (whiteList.some((item: any) => item.path === to.path)) {
      next();
      NProgress.done();
    } else {
      // 非白名单的页面必须登录
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

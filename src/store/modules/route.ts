/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-25 13:37:17
 */
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action,
} from "vuex-module-decorators";
import store from "@/store";
import { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(
  roles: any[],
  route: { meta: { roles: string | any[] } }
) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: any[], roles: any[]) {
  const res: any[] = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

export interface IRouteState {
  routes: Array<RouteRecordRaw>;
  addRoutes: Array<RouteRecordRaw>;
}
@Module({ dynamic: true, store, name: "Routes" })
class Routes extends VuexModule implements IRouteState {
  public addRoutes: Array<RouteRecordRaw> = [];
  public routes: Array<RouteRecordRaw> = [];

  @Mutation
  public SET_ROUTES(routes: RouteRecordRaw[]) {
    this.addRoutes = routes;
    this.routes = [...constantRoutes, ...routes];
  }
  @Action
  public generateRoutes(roles: any) {
    this.SET_ROUTES(constantRoutes);
  }
}
export const RoutesModule = getModule(Routes);

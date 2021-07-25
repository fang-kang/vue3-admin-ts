/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 14:30:00
 */
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action,
} from "vuex-module-decorators";
import store from "@/store";
export interface IAppState {
  collapsed: boolean; // 侧边菜单是否折叠
}
@Module({ dynamic: true, store, name: "App" })
class App extends VuexModule implements IAppState {
  public collapsed = false;
  @Mutation
  private FOLD_SIDEBAR() {
    this.collapsed = true;
  }

  @Mutation
  private TOGGLE_SIDEBAR() {
    this.collapsed = !this.collapsed;
  }
  @Action
  public FoldSideBar() {
    this.FOLD_SIDEBAR();
  }

  @Action
  public ToggleSideBar() {
    this.TOGGLE_SIDEBAR();
  }
}
export const AppModule = getModule(App);

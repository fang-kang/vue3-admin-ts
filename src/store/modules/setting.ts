/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 14:30:00
 */

export interface IAppState {
  collapsed: boolean; // 侧边菜单是否折叠
}

const state: IAppState = {
  collapsed: false,
};
const mutations = {};
const actions = {};
export default {
  state,
  mutations,
  actions,
  namespace: true,
};

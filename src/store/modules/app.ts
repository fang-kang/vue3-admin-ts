/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 14:30:00
 */
import Cookies from "js-cookie";
const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false,
  },
  device: "desktop",
  size: Cookies.get("size") || "medium",
};
const mutations = {
  TOGGLE_SIDEBAR: (state: { sidebar: { opened: boolean; withoutAnimation: boolean; }; }) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
  },
  CLOSE_SIDEBAR: (state: { sidebar: { opened: boolean; withoutAnimation: any; }; }, withoutAnimation: any) => {
    Cookies.set("sidebarStatus", 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state: { device: any; }, device: any) => {
    state.device = device;
  },
  SET_SIZE: (state: { size: any; }, size: any) => {
    state.size = size;
    Cookies.set("size", size);
  },
};

const actions = {
  toggleSideBar(state: { commit: (arg0: string) => void; }) {
    state.commit("TOGGLE_SIDEBAR");
  },
  closeSideBar(state: { commit: (arg0: string, arg1: any) => void; }, { withoutAnimation }: any) {
    state.commit("CLOSE_SIDEBAR", withoutAnimation);
  },
  toggleDevice(state: any, device: any) {
    state.commit("TOGGLE_DEVICE", device);
  },
  setSize(state: any, size: any) {
    state.commit("SET_SIZE", size);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

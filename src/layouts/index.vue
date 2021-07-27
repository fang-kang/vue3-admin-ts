<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-23 15:06:58
-->
<template>
  <div
    class="app-wrapper"
    :class="[sidebar.opened ? '' : 'hideSidebar', classObj]"
  >
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <side-bar class="sidebar-container" />
    <div class="main-container hasTagsView">
      <div class="fixed-header">
        <nav-bar />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import useDeviceInfo from "@/hooks/useDeviceInfo";
import { defineComponent, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { AppMain, NavBar, SideBar, TagsView } from "./components";
export default defineComponent({
  components: {
    SideBar,
    AppMain,
    NavBar,
    TagsView,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const { deviceScreenType } = useDeviceInfo("#app");
    if (deviceScreenType.value == "sm") {
      store.dispatch("app/toggleDevice", "mobile");
      store.dispatch("app/closeSideBar", { withoutAnimation: true });
    } else {
      store.dispatch("app/toggleDevice", "desktop");
    }
    const device: any = computed(() => {
      return store.getters.device;
    });
    console.log(device,'device');
    const sidebar: any = computed(() => {
      return store.getters.sidebar;
    });

    watch(route, () => {
      if (device === "mobile" && sidebar.opened) {
        store.dispatch("app/closeSideBar", { withoutAnimation: false });
      }
    });

    const hideSidebar = computed(() => {
      return !store.getters.sidebar;
    });

    // const showSettings = computed(() => {
    //   return store.state.settings.showSettings;
    // });
    // const needTagsView = computed(() => {
    //   return store.state.settings.tagsView;
    // });
    const fixedHeader = computed(() => {
      return store.state.settings.fixedHeader;
    });
    const classObj = computed(() => {
      return {
        // hideSidebar: false,
        openSidebar: sidebar.opened,
        withoutAnimation: sidebar.withoutAnimation,
        mobile: device === "mobile",
      };
    });
    const handleClickOutside = () => {
      store.dispatch("app/closeSideBar", { withoutAnimation: false });
    };
    return {
      device,
      sidebar,
      // showSettings,
      // fixedHeader,
      // needTagsView,
      handleClickOutside,
      classObj,
    };
  },
});
</script>
<style scoped lang="scss">
@import "@/styles/variables.module.scss";
@import "@/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>

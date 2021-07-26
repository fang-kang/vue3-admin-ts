<!--
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-24 17:33:31
-->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo :collapse="collapsed" v-if="showLogo" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        :unique-opened="false"
        mode="vertical"
      >
        <side-bar-item
          v-for="(route, index) in constantRoutes"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import variables from "@/styles/variables.module.scss";
import Logo from "./Logo.vue";
import { constantRoutes } from "@/router";
import SideBarItem from "./SideBarItem.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    SideBarItem,
    Logo,
  },
  setup() {
    const { meta, path } = useRoute();
    const store = useStore();
    const collapsed = computed(() => {
      return !store.getters.sidebar.opened;
    });
    const showLogo = true;
    const activeMenu = computed(() => {
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    onMounted(() => {
      console.log(constantRoutes, "=======");
    });
    return {
      variables,
      collapsed,
      constantRoutes,
      activeMenu,
      showLogo,
    };
  },
});
</script>

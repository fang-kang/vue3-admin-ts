<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-24 17:33:31
-->
<template>
  <div class="fixed-side">
    <Logo :collapse="collapsed" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="1-4-1"
        background-color="#304156"
        class="el-menu-vertical-demo"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        mode="vertical"
        :unique-opened="false"
        :collapse="collapsed"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AppModule } from "@/store/modules/app";
import { RoutesModule } from "@/store/modules/route";
import Logo from "./Logo.vue";
import SidebarItem from "./SideBarItem.vue";
export default defineComponent({
  components: {
    Logo,
    SidebarItem,
  },
  setup() {
    const { collapsed } = AppModule;
    const { routes } = RoutesModule;
    return {
      collapsed,
      routes,
    };
  },
});
</script>

<style lang="scss">
.side-menu {
  height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
  background-color: #304156;
  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
}
.fixed-side {
  position: fixed;
  height: 100%;
  width: 210px;
  left: 0;
  top: 0;
}
</style>

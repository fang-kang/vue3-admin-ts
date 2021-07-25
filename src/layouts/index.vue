<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-23 15:06:58
-->
<template>
  <el-container class="admin-layout">
    <el-aside width="210px" class="side-menu fixed-side">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header style="background: red">Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/layouts/components/SideBar/index.vue";
export default defineComponent({
  components: {
    SideBar,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.admin-layout {
  height: 100vh;
  overflow-y: hidden;
}
</style>

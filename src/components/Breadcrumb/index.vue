<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-26 16:01:09
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >首页</span
        >
        <a v-else @click.prevent="handleLink(item)">首页</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { compile } from "path-to-regexp";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const levelList = ref();
    const route = useRoute();
    const router = useRouter();
    watch(
      () => route,
      (route) => {
        if (route.path.startsWith("/redirect/")) {
          return;
        }
        getBreadcrumb();
      }
    );
    const getBreadcrumb = () => {
      // only show routes with meta.title
      let matched: any = route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      if (!isDashboard(first)) {
        matched = [{ path: "/dashboard", meta: { title: "Dashboard" } }].concat(
          matched
        );
      }

      levelList.value = matched.filter(
        (item: { meta: { title: any; breadcrumb: boolean } }) =>
          item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    };

    const isDashboard = (route: { name: any }) => {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    };

    const pathCompile = (path: string) => {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = route;
      var toPath = compile(path);
      return toPath(params);
    };

    const handleLink = (item: { redirect: any; path: any }) => {
      const { redirect, path } = item;
      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push(pathCompile(path));
    };

    return {
      levelList,
      pathCompile,
      handleLink,
    };
  },
});
</script>

<style scoped lang="scss">
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

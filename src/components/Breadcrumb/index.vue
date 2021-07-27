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
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { compile } from "path-to-regexp";
import { RouteLocationMatched, useRoute, useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const levelList = ref([] as any);
    const Route = useRoute();
    const Router = useRouter();
    watch(Route, (route) => {
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      getBreadcrumb();
    });
    onMounted(() => {
      getBreadcrumb();
    });

    const getBreadcrumb = () => {
      // only show routes with meta.title
      let matched: any = Route.matched.filter(
        (item: RouteLocationMatched) => item?.meta?.title
      );
      const first = matched[0];

      if (!isDashboard(first)) {
        matched = [{ path: "/dashboard", meta: { title: "首页" } }].concat(
          matched
        );
      }

      levelList.value = matched.filter(
        (item: RouteLocationMatched) =>
          item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
      console.log(levelList.value, "asas");
    };

    const isDashboard = (route: { name: string }) => {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      );
    };

    const pathCompile = (path: string) => {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = Route;
      var toPath = compile(path);
      return toPath(params);
    };

    const handleLink = (item: { redirect: any; path: any; }) => {
      const { redirect, path } = item;
      if (redirect) {
        Router.push(redirect);
        return;
      }
      Router.push(pathCompile(path));
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

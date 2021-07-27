<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-25 20:18:58
-->
<template>
  <template v-if="!item.meta || !item.meta.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <el-menu-item
        v-if="onlyOneChild.meta"
        :key="item.path"
        :index="resolvePath(onlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
        @click="go(resolvePath(onlyOneChild.path))"
      >
        <svg-icon
          v-if="onlyOneChild.meta && onlyOneChild.meta.icon"
          :icon-class="
            onlyOneChild.meta.icon ||
            (onlyOneChild.meta && onlyOneChild.meta.icon)
          "
        />
        <template #title v-if="onlyOneChild.meta && onlyOneChild.meta.title">{{
          onlyOneChild.meta.title
        }}</template>
      </el-menu-item>
    </template>
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <svg-icon
          v-if="item.meta && item.meta.icon"
          :icon-class="item.meta.icon"
        />
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <side-bar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </template>
</template>
<script lang="ts">
import { resolve } from "path-browserify";
import ItemIcon from "./ItemIcon.vue";
import AppLink from "./Link.vue";
import { isExternal } from "@/utils/validate";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

interface ChildType {
  path: string;
  name?: string;
  component: Function;
  meta: {
    title: Object;
    icon: string;
    hidden?: boolean;
    [key: string]: any;
  };
}
export default defineComponent({
  name: "SidebarItem",
  components: {
    ItemIcon,
    AppLink,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const onlyOneChild = ref();
    const router = useRouter();
    const hasOneShowingChild = (children: ChildType[] = [], parent: any) => {
      const showingChildren = children.filter((item: any) => {
        if (item?.meta?.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item;
          return true;
        }
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    };
    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(props.basePath)) {
        return props.basePath;
      }
      return resolve(props.basePath, routePath);
    };

    function go(routerPath: any) {
      console.log(routerPath, "routerPath");
      if (isExternal(routerPath)) {
        window.open(routerPath);
      } else {
        router.push({
          path: routerPath,
        });
      }
    }
    return {
      onlyOneChild,
      hasOneShowingChild,
      resolvePath,
      go,
    };
  },
});
</script>

<style scoped lang="scss"></style>

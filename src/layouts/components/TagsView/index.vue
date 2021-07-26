<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-25 13:30:03
-->
<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="state.visible"
      :style="{ left: state.left + 'px', top: state.top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(state.selectedTag)">刷新</li>
      <li
        v-if="!isAffix(state.selectedTag)"
        @click="closeSelectedTag(state.selectedTag)"
      >
        关闭本页
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(state.selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script lang="ts">
import ScrollPane from "./ScrollPane.vue";
import { resolve } from "path-browserify";
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import { constantRoutes } from "@/router/index";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
export default defineComponent({
  components: {
    ScrollPane,
  },
  setup() {
    const store = useStore();
    const Routes = useRoute();
    const Router = useRouter();
    const tag = ref();
    const scrollPane = ref();
    const state: any = reactive({
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
    });
    onMounted(() => {
      initTags();
      addTags();
    });

    onBeforeRouteUpdate(() => {
      console.log("路由变了");
    });

    watch(
      () => state.visible,

      (value) => {
        if (value) {
          document.body.addEventListener("click", closeMenu);
        } else {
          document.body.removeEventListener("click", closeMenu);
        }
      }
    );

    watch(
      () => Routes.path,
      () => {
        addTags();
        moveToCurrentTag();
      }
    );

    const openMenu = (tag: any, e: { clientX: number; clientY: any }) => {
      const menuMinWidth = 105;
      const offsetLeft = 100; // container margin left
      const offsetWidth = 200; // container width
      // const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - 245; // 15: margin right

      // if (left > maxLeft) {
      //   state.left = maxLeft;
      // } else {
      //   state.left = left;
      // }
      state.left = left;
      state.top = e.clientY;
      state.visible = true;
      state.selectedTag = tag;
    };

    const isActive = (route: { path: string }) => {
      return route.path === Routes.path;
    };
    const isAffix = (tag: { meta: { affix: any } }) => {
      return tag.meta && tag.meta.affix;
    };

    const handleScroll = () => {
      closeMenu();
    };

    const closeMenu = () => {
      state.visible = false;
    };

    const moveToCurrentTag = () => {
      const tags = tag.value;
      nextTick(() => {
        for (const item of tags) {
          if (item.to.path === Routes.path) {
            scrollPane.value.moveToTarget(item);
            // when query is different then update
            if (item.to.fullPath !== Routes.fullPath) {
              store.dispatch("tagsView/updateVisitedView", Routes);
            }
            break;
          }
        }
      });
    };
    const visitedViews = computed(() => {
      return store.state.tagsView.visitedViews;
    });

    const filterAffixTags = (routes: any[], basePath = "/") => {
      let tags: any[] = [];
      if (Array.isArray(routes) && routes.length > 0) {
        routes.forEach((item) => {
          if (item.meta && item.meta.affix) {
            const tagPath = resolve(basePath, item.path);
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: item.name,
              meta: { ...item.meta },
            });
          }
          if (item.children) {
            const tempTags = filterAffixTags(item.children, item.path);
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags];
            }
          }
        });
      }
      return tags;
    };

    const refreshSelectedTag = (view: { fullPath: any }) => {
      store.dispatch("tagsView/delCachedView", view).then(() => {
        const { fullPath } = view;
        nextTick(() => {
          Router.replace({
            path: "/redirect" + fullPath,
          });
        });
      });
    };

    const closeOthersTags = () => {
      Router.push(state.selectedTag);
      store.dispatch("tagsView/delOthersViews", state.selectedTag).then(() => {
        moveToCurrentTag();
      });
    };

    const closeAllTags = (view: { path: any; name?: any; fullPath?: any }) => {
      store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
        if (
          state.affixTags.some((tag: { path: any }) => tag.path === view.path)
        ) {
          return;
        }
        toLastView(visitedViews, view);
      });
    };

    const closeSelectedTag = (view: { path: string }) => {
      store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
        if (isActive(view)) {
          toLastView(visitedViews, view);
        }
      });
    };

    const toLastView = (
      visitedViews: any[],
      view: { path?: string; name?: any; fullPath?: any }
    ) => {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        Router.push(latestView.fullPath);
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "Dashboard") {
          // to reload home page
          Router.replace({ path: "/redirect" + view.fullPath });
        } else {
          Router.push("/");
        }
      }
    };

    const initTags = () => {
      state.affixTags = filterAffixTags(constantRoutes);
      for (const tag of state.affixTags) {
        // Must have tag name
        if (tag.name) {
          store.dispatch("tagsView/addVisitedView", tag);
        }
      }
    };

    const addTags = () => {
      const { name } = Routes;
      if (name) {
        store.dispatch("tagsView/addView", Routes);
      }
      return false;
    };
    return {
      state,
      scrollPane,
      tag,
      constantRoutes,
      visitedViews,
      isActive,
      isAffix,
      handleScroll,
      openMenu,
      closeSelectedTag,
      closeAllTags,
      closeOthersTags,
      refreshSelectedTag,
    };
  },
});
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>

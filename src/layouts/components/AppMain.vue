<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-25 16:05:46
-->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component }" :key="$route.path">
      <!-- 内部应该显示子路由页面信息 -->
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "AppMain",
  setup() {
    const store = useStore();
    const cachedViews = computed(() => {
      return store.state.tagsView.cachedViews;
    });
    return {
      cachedViews,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-main {
  /* 60= navbar  60  */
  min-height: calc(100vh - 60px);
  width: 100%;
  padding: 20px;
  padding-top: 94px !important;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 94px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

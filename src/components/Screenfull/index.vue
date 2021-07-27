<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-26 16:14:35
-->
<template>
  <div>
    <el-tooltip
      effect="dark"
      :content="isFullscreen ? '退出全屏显示' : '全屏显示'"
      placement="bottom-end"
    >
      <div>
        <svg-icon
          :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
          @svg-click="toggle"
        />
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { useFullscreen } from "@vueuse/core";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const { isFullscreen, toggle } = useFullscreen();
    return {
      isFullscreen,
      toggle,
    };
  },
});
</script>

<style scoped></style>

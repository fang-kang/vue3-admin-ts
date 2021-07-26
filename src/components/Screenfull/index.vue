<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-26 16:14:35
-->
<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggleFull"
    />
  </div>
</template>

<script lang="ts">
import useFullscreen from "@/hooks/useFullscreen";
import { defineComponent, ref } from "vue";
// import screenfull from "screenfull";
export default defineComponent({
  setup() {
    const { isFullscreen, setFull, exitFull, toggleFull } = useFullscreen();
    // const isFullscreen = ref(false);

    // const destroy = () => {
    //   if (screenfull.isEnabled) {
    //     screenfull.off("change", change);
    //   }
    // };

    // const init = () => {
    //   if (screenfull.isEnabled) {
    //     screenfull.on("change", change);
    //   }
    // };

    // const change = () => {
    //   isFullscreen.value = screenfull.isFullscreen;
    // };

    return {
      isFullscreen,
      toggleFull,
    };
  },
});
</script>

<style scoped></style>

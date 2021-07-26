<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-16 17:10:27
-->
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import useRem from "@/hooks/useRem";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  name: "App",
  setup() {
    useRem();
    const loading = document.getElementById("loading");
    if (loading != null) {
      document.body.removeChild(loading);
    }
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  width: 100%;
  height: 100%;
}
</style>

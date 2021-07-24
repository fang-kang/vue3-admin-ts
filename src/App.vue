<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-16 17:10:27
-->
<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useRem from '@/hooks/useRem';
export default defineComponent({
  name: "App",
  setup() {
    useRem();
    const loading = document.getElementById("loading");
    if(loading!=null){
      document.body.removeChild(loading);
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  width: 100%;
  height: 100%;
}
</style>

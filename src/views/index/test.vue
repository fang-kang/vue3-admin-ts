<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-19 17:04:16
-->
<template>
  <div @click="increment">
    {{ count }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      count: 1,
    });
    const increment = (count: number) => {
      state.count = count
    };

    return {
      ...toRefs(state),
      increment,
    };
  },
});
</script>

<style scoped></style>

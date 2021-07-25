<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-19 17:04:16
-->
<template>
  <div>
    <svg-icon icon-class="avatar" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
export default defineComponent({
  components: {
    SvgIcon,
  },
  setup() {
    const state = reactive({
      count: 1,
    });
    const increment = (count: number) => {
      state.count = count;
    };

    return {
      ...toRefs(state),
      increment,
    };
  },
});
</script>

<style scoped></style>

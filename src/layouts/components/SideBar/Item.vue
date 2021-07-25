<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-25 14:01:32
-->
<template>
  <div>
    <i :class="[icon, 'sub-el-icon']" v-if="isElIcon" />
    <svg-icon :icon-class="icon" v-else />
    <span v-if="title">{{ title }}</span>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "MenuItem",
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { icon, title } = props;
    const isElIcon = computed(() => icon.includes("el-icon"));
    return {
      isElIcon,
      title,
    };
  },
});
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>

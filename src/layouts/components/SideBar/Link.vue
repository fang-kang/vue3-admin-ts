<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-25 13:58:07
-->
<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { isExternal as isExt } from "@/utils/validate";
export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isExternal = computed(() => isExt(props.to));
    // type是一个计算属性
    const type = computed(() => {
      if (isExternal.value) {
        return "a";
      }
      return "router-link";
    });
    const linkProps = (to: any) => {
      if (isExternal.value) {
        return {
          href: to,
          target: "_blank",
          rel: "noopener",
        };
      }
      return { to };
    };
    return {
      linkProps,
      type,
    };
  },
});
</script>

<style scoped></style>

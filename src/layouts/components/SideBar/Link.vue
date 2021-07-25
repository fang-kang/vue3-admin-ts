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
import { isExternal } from "@/utils/validate";
export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const external = computed(() => {
      return isExternal(props.to);
    });
    const type = computed(() => {
      if (external) {
        return "a";
      }
      return "router-link";
    });
    const linkProps = (to: any) => {
      if (external) {
        return {
          href: to,
          target: "_blank",
          rel: "noopener",
        };
      }
      return {
        to,
      };
    };
    return {
      linkProps,
      type,
    };
  },
});
</script>

<style scoped></style>

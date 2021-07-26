<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-25 13:08:05
-->
<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { isExternal } from "@/utils/validate";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    return {
      styleExternalIcon: computed(() => {
        return {
          mask: `url(${props.iconClass}) no-repeat 50% 50%`,
          "-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`,
        };
      }),
      iconName: computed(() => `#icon-${props.iconClass}`),
      isExternal: computed(() => isExternal(props.iconClass)),
      svgClass: computed(() => {
        if (props.className) {
          return `svg-icon ${props.className}`;
        }
        return "svg-icon";
      }),
    };
  },
});
</script>

<style scope lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>

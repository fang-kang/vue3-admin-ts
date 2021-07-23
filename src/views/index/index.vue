<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-17 11:11:48
-->
<template>
  <div>
    <el-button @click="handelMessage">按钮</el-button>
    <HelloWorld :msg="msg" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "components/HelloWorld.vue";
import useInstance from "mixins/instance";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    HelloWorld,
  },
  setup() {
    const msg = ref("hello");
    const { $antMessage } = useInstance();
    const router = useRouter();
    const handelMessage = () => {
      $antMessage.success("success");
      router.push({
        path: "/test",
      });
    };

    return {
      handelMessage,
      msg,
    };
  },
});
</script>

<style scoped></style>

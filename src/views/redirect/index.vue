<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-26 15:43:33
-->
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { params, query } = route;
    const { path } = params;
    onMounted(() => {
      router.replace({ path: "/" + path, query });
    });
    return {};
  },
});
</script>

<style scoped></style>

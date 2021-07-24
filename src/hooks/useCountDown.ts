/*
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-23 19:52:39
 */
import { ref, onMounted, onUnmounted, watch } from 'vue'


export default function useCountDown(Action: () => void, num: number) {
  const count = ref(num)
  let timer: any = null
  onMounted(() => {
    timer = setInterval(() => {
      count.value--
    }, 1000)
  })
  watch([count], () => {
    if (count.value === 0) {
      timer && clearInterval(timer)
      Action()
    }
  })
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return count
}

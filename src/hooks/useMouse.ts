/*
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-23 20:41:12
 */
import { ref, onMounted, onUnmounted } from 'vue'

export default function useMouse() {
  const x = ref(0)
  const y = ref(0)
  const updateXY = (e: { x: number; y: number }) => {
    x.value = e.x
    y.value = e.y
  }
  onMounted(() => {
    document.addEventListener('mousemove', updateXY)
  })
  onUnmounted(() => {
    document.removeEventListener('mousemove', updateXY)
  })
  return { x, y }
}

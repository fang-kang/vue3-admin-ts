/*
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-23 14:21:12
 */
import { ref, onBeforeUpdate, Ref } from 'vue';

export function useRefs(): [Ref<HTMLElement[]>, (index: number) => (el: HTMLElement) => void] {
  const refs = ref<HTMLElement[]>([]);

  onBeforeUpdate(() => {
    refs.value = [];
  });

  const setRefs = (index: number) => (el: HTMLElement) => {
    refs.value[index] = el;
  };

  return [refs, setRefs];
}

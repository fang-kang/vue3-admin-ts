/*
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-26 14:25:36
 */
import { mapGetters, createNamespacedHelpers } from 'vuex'
import { useMapper } from './useMapper'

export function useGetters(moduleName: string | any[], mapper: any) {
  let mapperFn = mapGetters
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  }

  return useMapper(mapper, mapperFn)
}

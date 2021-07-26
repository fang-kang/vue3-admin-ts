/*
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-26 14:24:54
 */
import { mapState, createNamespacedHelpers } from 'vuex'
import { useMapper } from './useMapper'

export function useState(moduleName: string | any[], mapper: any) {
  let mapperFn = mapState
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  }

  return useMapper(mapper, mapperFn)
}
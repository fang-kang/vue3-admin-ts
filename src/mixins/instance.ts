/*
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-23 10:42:56
 */
import { getCurrentInstance } from 'vue'

export default () =>{
  const { appContext }:any = getCurrentInstance()
  const { $message, $confirm, $loading, $antMessage } = appContext.config.globalProperties

  return {
    $message,
    $confirm,
    $loading,
    $antMessage
  }
}

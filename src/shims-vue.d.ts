/*
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-16 17:10:27
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'qs';

declare module '*.ts';
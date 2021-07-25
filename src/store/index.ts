/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-17 10:58:28
 */
import { createStore } from "vuex";
import { IAppState } from "@/store/modules/app";
export interface IRootState {
  app: IAppState;
}

export default createStore<IRootState>({});

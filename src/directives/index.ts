/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 19:45:38
 */

import { message } from "ant-design-vue";

// 注册一个全局自定义指令 `v-focus`
const focus = {
  // 当被绑定的元素插入到 DOM 中时……
  mounted(el: { focus: () => void }) {
    // Focus the element
    el.focus();
  },
};
// 注册一个全局自定义指令 `v-copy`
const copy = {
  mounted(
    el: {
      style: { cursor: string };
      innerText: any;
      addEventListener: (arg0: string, arg1: () => void) => void;
    },
    binding: { value: any }
  ) {
    el.style.cursor = "pointer";
    const handler = () => {
      const textarea: any = document.createElement("textarea");
      textarea.readOnly = "readOnly";
      textarea.value = binding.value || el.innerText;
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const result = document.execCommand("Copy");
      if (result) {
        message.success(`已复制：${textarea.value}`);
      }
      document.body.removeChild(textarea);
    };
    el.addEventListener("click", handler);
  },
};
export default {
  focus,
  copy,
};

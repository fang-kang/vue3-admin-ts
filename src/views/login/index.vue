<!--
 * @Descripttion: login
 * @Author: 房康
 * @Date: 2021-07-23 15:07:56
-->
<template>
  <div class="container">
    <img class="loginBg" :src="loginBg" alt="login" />
    <div class="loginContent">
      <a-card
        hoverable
        title="Next Admin"
        :tab-list="tabList"
        :active-tab-key="tabkey"
        @tabChange="tabChange"
      >
        <template #customRender="item">
          <span> {{ item.key }} </span>
        </template>
        <div class="loginForm" v-if="tabkey === 'login'">
          <a-form
            :ref="loginFormRef"
            :model="formState"
            :rules="loginRules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="用户名" name="name" :span="24">
              <a-input
                v-model:value="formState.name"
                placeholder="请输入用户名"
                maxlength="10"
              />
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input-password
                v-model:value="formState.password"
                @keyup.enter="loginAction"
                placeholder="请输入密码"
                
              />
            </a-form-item>
          </a-form>
          <div class="action">
            <a-space size="large">
              <a-button @click="resetForm">重置</a-button>
              <a-button
                :loading="loginLoading"
                type="primary"
                @click="loginAction"
                >登录</a-button
              >
            </a-space>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, UnwrapRef } from "vue";
import loginBg from "assets/svg/login_bg.svg";
import { LoginForm } from "types/login";
export default defineComponent({
  setup() {
    //card初始化key
    const tabkey = ref("login");
    const labelCol = {
      span: 6,
    };
    const wrapperCol = {
      span: 18,
    };
    //card列表
    const tabList = [
      {
        key: "login",
        tab: "登录",
      },
      {
        key: "register",
        tab: "注册",
      },
    ];
    /**
     * 切换登录注册card
     */
    const tabChange = (key: string) => {
      tabkey.value = key;
    };
    // 登录表单逻辑
    const loginFormRef = ref();
    const formState: UnwrapRef<LoginForm> = reactive({
      name: "",
      password: "",
    });
    const loginLoading = ref(false);
    const loginRules = {
      name: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
        { min: 2, max: 5, message: "Length should be 2 to 5", trigger: "blur" },
      ],
    };
    const resetForm = () => {
      loginFormRef.value.value.resetFields();
    };

    const submitLogin = async (formState: LoginForm) => {
      loginLoading.value = true;
      console.log("object", formState);
      // const res = await login(data).catch((err) => {
      //   console.log(err);
      //   loginLoading.value = false;
      // });
      // loginLoading.value = false;
    };

    const loginAction = () => {
      loginFormRef.value.value.value.validate().then(() => {
        submitLogin(formState);
      });
    };
    return {
      loginBg,
      tabList,
      tabkey,
      tabChange,
      formState,
      loginFormRef,
      loginRules,
      labelCol,
      wrapperCol,
      resetForm,
      loginLoading, //loading
      loginAction
    };
  },
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .loginBg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .loginContent {
    width: 480px;
    opacity: 0.92;
    position: absolute;
    top: 28%;
    right: 12%;
    @media screen and (max-width: 576px) {
      width: 88vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

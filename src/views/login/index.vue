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
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="用户名" name="username" :span="24">
              <a-input
                allowClear
                v-model:value="loginForm.username"
                placeholder="请输入用户名"
                autocomplete="username"
                :maxlength="10"
              />
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input-password
                allowClear
                v-model:value="loginForm.password"
                @keyup.enter="loginAction"
                placeholder="请输入密码"
                autocomplete="current-password"
                :maxlength="20"
              />
            </a-form-item>
          </a-form>
          <div class="action">
            <a-space size="large">
              <a-button @click="resetForm" class="mr-10">重置</a-button>
              <a-button :loading="loginLoading" type="primary" @click="loginAction"
                >登录</a-button
              >
            </a-space>
          </div>
        </div>
        <div class="registerForm" v-else>
          <a-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="registerRules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="用户名" name="username" :span="24">
              <a-input
                v-model:value="registerForm.username"
                placeholder="请输入用户名"
                allowClear
                autocomplete="username"
                :maxlength="10"
              />
            </a-form-item>
            <a-form-item label="密码" name="password" :span="24">
              <a-input-password
                allowClear
                v-model:value="registerForm.password"
                placeholder="请输入密码"
                autocomplete="current-password"
                :maxlength="20"
              />
            </a-form-item>
            <a-form-item label="确认" name="confirmPassword" :span="24">
              <a-input-password
                allowClear
                v-model:value="registerForm.confirmPassword"
                placeholder="请再次输入密码"
                autocomplete="current-password"
                :maxlength="20"
                @keyup.enter="registerAction"
              />
            </a-form-item>
          </a-form>
          <div class="action">
            <a-button
              style="width: 120px"
              :loading="registerLoading"
              type="primary"
              @click="registerAction"
              >注册</a-button
            >
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, UnwrapRef } from "vue";
import loginBg from "@/icons/svg/login_bg.svg";
import { LoginForm, RegisterForm } from "@/types/login";
import { ValidateErrorEntity } from "ant-design-vue/lib/form/interface";
import { login, register } from "@/apis/auth";
import { message } from "ant-design-vue";
import { NotEmpty } from "@/utils/antdValidate";
import { Local } from "@/utils/storage";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
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
    const loginForm: UnwrapRef<LoginForm> = reactive({
      username: "",
      password: "",
    });
    const loginLoading = ref(false);
    // 注册表单逻辑
    const registerFormRef = ref();
    const registerLoading = ref(false);
    const registerForm: UnwrapRef<RegisterForm> = reactive({
      username: "",
      password: "",
      confirmPassword: "",
    });

    const loginRules = {
      username: [NotEmpty("用户名")],
      password: [NotEmpty("密码")],
    };
    const registerRules = {
      username: [NotEmpty("用户名")],
      password: [NotEmpty("密码")],
      confirmPassword: [NotEmpty("确认密码")],
    };
    /**
     * @description: 重置表单
     * @param {*}
     * @return {*}
     */
    const resetForm = (): any => {
      loginFormRef.value.resetFields();
      loginLoading.value = false;
    };
    /**
     * @description: 登录
     * @author: fangkang
     * @param {*} data
     * @return {*}
     */
    const submitLogin = async (loginForm: LoginForm): Promise<any> => {
      loginLoading.value = true;
      try {
        const { code, msg, data } = await login(loginForm);
        loginLoading.value = false;
        if (code == 200) {
          Local.set("token", data.token);
          message.success(msg);
          router.replace({
            path: "/",
          });
        } else {
          message.error(msg);
        }
      } catch (error) {
        message.error(error);
        loginLoading.value = false;
      }
    };

    /**
     * @description: 登录验证
     * @author: fangkang
     * @param {*}
     * @return {*}
     */
    const loginAction = (): any => {
      loginFormRef.value
        .validate()
        .then(() => {
          console.log("values", loginForm, toRaw(loginForm));
          submitLogin(loginForm);
        })
        .catch((error: ValidateErrorEntity<LoginForm>) => {
          console.log("error", error);
        });
    };

    /**
     * @description: 注册
     * @author: fangkang
     * @param {*} data
     * @return {*}
     */
    const submitRegister = async (data: RegisterForm): Promise<any> => {
      const { username, password, confirmPassword } = data;
      if (password != confirmPassword) {
        message.warning("两次密码输入不一致");
        return;
      }
      const params = {
        username,
        password,
      };
      registerLoading.value = true;
      try {
        const { code, msg } = await register(params);
        registerLoading.value = false;
        if (code == 200) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      } catch (error) {
        message.error(error);
        registerLoading.value = false;
      }
    };

    /**
     * @description: 注册验证
     * @author: fangkang
     * @param {*}
     * @return {*}
     */
    const registerAction = (): any => {
      registerFormRef.value
        .validate()
        .then(() => {
          submitRegister(registerForm);
        })
        .catch((error: ValidateErrorEntity<RegisterForm>) => {
          console.log("error", error);
        });
    };
    return {
      loginBg, //背景图
      tabList, //card数据
      tabkey, //当前key
      tabChange, //切换登录注册方法
      loginForm, //登录数据
      loginFormRef, //登录dom
      loginRules, //登录校验规则
      registerRules, //注册校验规则
      labelCol, //宽
      wrapperCol, //宽
      resetForm, //重置表单
      loginLoading, //登录loading
      loginAction, //登录方法
      registerFormRef, //注册dom
      registerForm, //注册数据
      registerLoading, //注册loading
      registerAction, //注册方法
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
.loginForm,
.registerForm {
  padding: 24px 24px 24px 0px;
}
.action {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

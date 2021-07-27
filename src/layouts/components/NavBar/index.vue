<!--
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-25 16:07:23
-->
<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      <div class="right-menu-item hover-effect">
        <el-tooltip
          class="item"
          effect="dark"
          content="管理员"
          placement="bottom-end"
        >
          <img :src="avatar" class="user-avatar" />
        </el-tooltip>
      </div>
      <el-dropdown trigger="click">
        <div class="header-setting hover-effect" style="cursor: pointer">
          <i class="mr-5 el-icon-setting fs-16"></i>
          <span class="word">设置</span>
          <i class="el-icon-caret-bottom caretDown"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <i class="mr-5 el-icon-user"></i>
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <i class="mr-5 el-icon-switch-button"></i>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import avatar from "@/icons/svg/avatar.svg";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hamburger from "@/components/Hamburger/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
  },
  setup() {
    const store = useStore();
    const sidebar = computed(() => {
      return store.getters.sidebar;
    });
    const device = computed(() => {
      return store.getters.device;
    });
    const logout = () => {
      message.success("退出成功");
    };
    const toggleSideBar = () => {
      store.dispatch("app/toggleSideBar");
    };
    return {
      avatar,
      sidebar,
      logout,
      device,
      toggleSideBar,
    };
  },
});
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .word {
    font-size: 16px;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    line-height: 50px;
    margin-right: 20px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 50px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      display: inline-block;
    }
    .avatar-wrapper {
      margin-top: 5px;
      position: relative;
    }

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    // .el-icon-caret-bottom {
    //   cursor: pointer;
    //   position: absolute;
    //   right: -10px;
    //   top: 25px;
    //   font-size: 12px;
    // }
  }
}
</style>

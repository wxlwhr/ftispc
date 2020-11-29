<template>
  <div class="home">
    <div class="home-header" :style="note">
      <div class="home-header-left">
        <div class="header-logo">
          <img src="../assets/logo.png" alt="" />
          中国互联网金融协会
        </div>
        <div class="header-title">金融科技服务能力共享系统</div>
      </div>
      <div class="header-login">
        <div class="login-title">用户入口</div>
        <div class="login-btn">登录</div>
        <div class="login-btn register">注册</div>
      </div>
    </div>
    <div class="home-tabs">
      <ul>
        <li
          v-for="(item, i) in tabs"
          :key="i"
          @click="handleChange(i)"
          :class="activeKey === i ? 'active' : ''"
        >
          {{ item.title }}
          <div class="line"></div>
        </li>
      </ul>
      <el-input
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="searchValue"
      >
      </el-input>
    </div>
    <div class="home-view">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { title: "首页" },
        { title: "产品" },
        { title: "解决方案" },
        { title: "入驻机构" },
        { title: "政策信息" },
        { title: "动态发布" },
        { title: "关于我们" },
      ],
      activeKey: 0,
      note: {
        backgroundImage: "url(" + require("../assets/homepage_top.jpg") + ")",
      },

      searchValue: "",
    };
  },

  components: {},

  computed: {},

  methods: {
    handleChange(v) {
      this.activeKey = v;
    },
  },
};
</script>
<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;

  &-header {
    height: 21rem;
    padding: 0 360px;
    display: flex;
    justify-content: space-between;
    &-left {
      .header-title {
        font-size: 2rem;
        color: #ffffff;
      }
      .header-logo {
        img {
          vertical-align: middle;
        }
        color: #ffffff;
        margin-top: 6rem;
        margin-bottom: 2rem;
      }
      &::after,
      &::before {
        display: table;
        content: "";
        clear: both;
      }
    }

    .header-login {
      width: 17rem;
      height: 14rem;
      background: #fff;
      border-radius: 6px;
      margin-top: 4rem;
      padding: 0 1rem;
      .login-title {
        color: #2474f2;
        margin-top: 2rem;
        text-align: center;
        font-weight: bold;
      }
      .login-btn {
        height: 2rem;
        font-size: 1rem;
        text-align: center;
        background-image: linear-gradient(-90deg, #2468f2 0%, #2493f2 100%),
          linear-gradient(#1d2bc5, #1d2bc5);
        border-radius: 4px;
        margin-top: 2rem;
        line-height: 2rem;
        color: #fff;
        cursor: pointer;
      }
      .register {
        background-image: linear-gradient(-90deg, #ff811a 0%, #ffac29 100%),
          linear-gradient(#ff8929, #ff8929);
        background-blend-mode: normal, normal;
      }
    }
  }
  &-tabs {
    height: 6rem;
    padding: 0 360px;
    background-color: #ffffff;
    box-shadow: 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      display: flex;
      align-items: center;
      height: 100%;
      white-space: nowrap;
      padding-top: 10px;
      li {
        margin-left: 4rem;
        cursor: pointer;
        padding-bottom: 10px;
        position: relative;
      }
      li:first-child {
        margin-left: 0;
      }
      .line{
         width: 0;
         transition: width .3s;
      }
      .active .line{
         width: 100%;
         height: 3px;
        background: #2983fe;
        border-radius: 2px;
        position: absolute;
        bottom: 0;
        
      }
    }
    .el-input {
      width: 16.43rem;
    }
    /deep/ .el-input__inner {
      height: 2.29rem;
      line-height: 2.29rem;
    }
    /deep/ .el-input__icon {
      line-height: 2.29rem;
    }
  }
  &-view {
    padding: 0 360px;
  }
}
</style>
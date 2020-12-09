<template>
  <div class="home">
    <!-- <div class="home-header" :style="note">
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
    </div> -->
    <div class="home-tabs">
      <div class="tab-content">
        <div class="logo-box">
          <img src="@/assets/logo.png" alt="" />
          中国互联网金融协会
        </div>
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
        <div class="bts">
          <span class="login-btn">登录</span>
          <span class="gang">|</span>
          <span class="signin-btn">注册</span>
        </div>
      </div>
      <!-- <el-input
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="searchValue"
      >
      </el-input> -->
    </div>
    <!-- 产品详情顶部banner -->
    <div
      v-show="activeKey === 1 && path === '/productInfo'"
      class="productInfo-topImg"
    >
      <img src="@/assets/2_02.jpg" alt="" />
    </div>
    <div
      v-show="activeKey === 2 && path === '/solutionInfo'"
      class="productInfo-topImg"
    >
      <img src="@/assets/solutionImg.jpg" alt="" />
    </div>
    <div class="home-view">
      <router-view />
    </div>
    <div class="home-footer">
      ©2019
      中国互联网金融协会中国互联网金融服务平台金融科技服务能力共享系统版权所有
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { title: "首页", path: "/index" },
        {
          title: "产品",
          path: "/product",
          children: [{ path: "/productInfo" }],
        },
        {
          title: "解决方案",
          path: "/solution",
          children: [{ path: "/solutionInfo" }],
        },
        {
          title: "入驻机构",
          path: "/organization",
          children: [{ path: "/organizationDetail" }],
        },
        { title: "政策信息", path: "/policy" },
        { title: "动态发布", path: "/dynamic_issue" },
        { title: "关于我们", path: "/about_us" },
      ],
      activeKey: 0,
      path: "",
      note: {
        backgroundImage: "url(" + require("../assets/homepage_top.jpg") + ")",
      },
      searchValue: "",
    };
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
      this.activeTab()
    },
  },
  components: {},
  computed: {},
  created() {
   this.activeTab()
  },
  updated() {},
  methods: {
    activeTab(){
      //   监听路由变化
      const path = this.$route.path;
      this.path = path;
      this.tabs.map((item, i) => {
        if (item.path === path) {
          this.activeKey = i;
        } else {
          if (item.children) {
            item.children.map((item, j) => {
              if (item.path === path) {
                this.activeKey = i;
              }
            });
          }
          // this.activeKey = 0;
          // this.$router.push('/index')
        }
      });
    },
    handleChange(v) {
      this.activeKey = v;
      let path = "";
      switch (v) {
        case 6:
          path = "about_us";
          break;
        case 5:
          path = "dynamic_issue";
          break;
        case 4:
          path = "policy";
          break;
        case 3:
          path = "organization";
          break;
        case 2:
          path = "solution";
          break;
        case 1:
          path = "product";
          break;
        default:
          path = "index";

          break;
      }
      this.$router.push({
        path,
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  &-tabs {
    width: 100%;
    .tab-content {
      width: 62.5%;
      margin: 0 auto;
      height: 6rem;
      background-color: #ffffff;
      box-shadow: 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
      display: flex;
      // justify-content: space-between;
      align-items: center;
      .logo-box {
        font-size: 2rem;
        color: #2983fe;
        font-weight: 600;
        height: 6rem;
        line-height: 6rem;
        display: flex;
        align-items: center;
        img {
          align-items: center;
          margin-right: 10px;
        }
      }
      ul {
        display: flex;
        align-items: center;
        height: 100%;
        white-space: nowrap;
        padding-top: 10px;
        // margin-left: 5rem;
        margin: 0 auto;
        li {
          font-size: 1rem;
          margin-left: 4rem;
          cursor: pointer;
          padding-bottom: 10px;
          position: relative;
          &:hover {
            color: #2983fe;
          }
        }
        li:first-child {
          margin-left: 0;
        }
        .line {
          width: 0;
          left: 50%;
          transform: translateX(-50%);
          transition: width 0.3s;
        }
        .active {
          color: #2983fe;
          font-weight: 600;
          .line {
            width: 100%;
            height: 3px;
            background: #2983fe;
            border-radius: 2px;
            position: absolute;
            bottom: 0;
          }
        }
      }
      .bts{
        // margin-left: 27rem;
        .gang{
          margin: 0 5px;
        }
        .login-btn:hover{
          cursor: pointer;
           color: #2983fe;
        }
        .signin-btn:hover{
          cursor: pointer;
           color: #2983fe;

        }
      }
    }

    // .el-input {
    //   width: 16.43rem;
    // }
    // /deep/ .el-input__inner {
    //   height: 2.29rem;
    //   line-height: 2.29rem;
    // }
    // /deep/ .el-input__icon {
    //   line-height: 2.29rem;
    // }
  }
  .blue-tabs {
    background-color: #2882fe;
    color: #fff;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;

    .active {
      color: #fff;
      .line {
        background: #fff;
      }
    }
    ul {
      li {
        &:hover {
          color: #fff;
        }
      }
    }
  }

  .productInfo-topImg {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // &-view {
  // padding: 0 360px;
  // margin: 0 auto;
  // }
  &-footer {
    width: 100%;
    height: 4.93rem;
    background-color: #1f1f1f;
    font-size: 1rem;
    line-height: 4.93rem;
    color: #e4e5e8;
    text-align: center;
  }
}
</style>

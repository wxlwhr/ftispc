<!-- 头部组件 -->
<template>
  <div class="wapper">
    <div class="logo_box">
      <img
        src="@/assets/top-icon/logo.png"
        style="height: 50px; width: 50px; margin-top: 15px"
      />
      <p class="top_name">中国互联网金融服务平台金融科技服务能力共享系统</p>
    </div>

    <!-- 退出登录框 -->
    <div class="right_box">
      <router-link :to="'/message'" class="link-a">
        <div class="message" @click="hangleMessage" v-if="user_type=='1'||user_type=='2'">
          <i class="el-icon-chat-line-square"></i>
          <span style="font-size: 12px">消息</span>
        </div>
      </router-link>
      <el-avatar :size="30" icon="el-icon-user-solid"></el-avatar>
      <el-dropdown trigger="click" class="logout" @command="handleCommand">
        <span
          class="el-dropdown-link"
          style="font-size: 12px; font-weight: 500"
        >
          您好，{{ user_name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link :to="'/revisePsw'" class="link-a">
            <el-dropdown-item
              style="font-size: 12px"
              icon="iconfont iconxiugaimima"
            >
              修改密码
            </el-dropdown-item>
          </router-link>

            <el-dropdown-item
              style="font-size: 12px"
              icon="iconfont iconxiugaigerenziliao-"
              command="b"
            >
              修改资料
            </el-dropdown-item>


          <el-dropdown-item
            style="font-size: 12px"
            icon="iconfont icontuichudenglu"
            command="a"
          >
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { getRealnameOrganInfo } from "@/api/api.js";

export default {
  data() {
    return {
      user_name: "",
      user_type:''
    };
  },
  components: {},

  computed: {},
  methods: {
    hangleMessage() {},
    handleCommand(command) {
      console.log("退出登录-------", command);
      if (command === "a") {
        // 清空token
        window.localStorage.clear();
        // 跳转到登录页
        this.$router.push("/login");
      }else if(command === "b"){
        if(this.user_type==='3'||this.user_type==='4'){
        this.$router.push("/reviseData");
        }else{
        this.$router.push("/organReviseData"); 
        }
      }
      
    },
    async getuserIfor() {
      let that = this;
      await getRealnameOrganInfo().then(function (res) {
        console.log(res);
        that.user_name = res.data.user.user_name;
        that.user_type = res.data.user.user_type;
        sessionStorage.setItem("userIfor", JSON.stringify(res.data.user));
      });
    },
  },
  created() {
    this.getuserIfor();
  },
};
</script>
<style lang='scss' scoped>
.wapper {
  display: flex;
  justify-content: space-between;
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
.link-a {
  color: inherit;
  text-decoration: none;
}
.logo_box {
  height: 80px;
  line-height: 80px;
  display: flex;
  .top_name {
    font-size: 22px;
    color: #2882fe;
    font-weight: 700;
    margin-left: 14px;
  }
}
.el-avatar {
  position: relative;
  top: 25px;
  right: 8px;
}
.logout {
  height: 80px;
  line-height: 80px;
  font-size: 12px;
}
.right_box {
  display: flex;
  .message {
    line-height: 80px;
    margin-right: 40px;
    cursor: pointer;
  }
}
</style>
<template>
  <el-container class="weapper" height="100%">
    <el-header class="header" height="80px">
      <div class="logo_box">
        <img
          src="@/assets/top-icon/logo.png"
          style="height: 50px; width: 50px; margin-top: 15px"
        />
        <p class="top_name">中国互联网金融服务平台金融科技服务能力共享系统</p>
      </div>
    </el-header>
    <el-main height="100%">
      <!-- 注册框 -->
      <div class="sigin_box">
        <div class="header">
          <img
            src="@/assets/authentication.png"
            alt="认证"
            class="register_img"
          />
          认证
        </div>
        <!-- 进度条 -->
        <el-steps :active="active" class="authentication_step" align-center>
          <el-step title="个人实名认证"></el-step>
          <el-step title="机构实名认证"></el-step>
          <el-step title="审核结果反馈"></el-step>
        </el-steps>
        <Personal v-if="active == 1" @changeActive="handleChange" :status='authStatus'></Personal>
        <Organ
          v-else-if="active == 2"
          @changeActive="handleChange"
          :pagetype="pagetype"
        ></Organ>
        <AuditStauts
          v-else-if="active == 3"
          @changeActive="handleChange"
          :status="authStatus"
        ></AuditStauts>
      </div>
      <div class="copyright">
        ©2019中国互联网金融协会中国互联网金融服务平台金融科技服务能力共享系统版权所有
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { getRealnameAuthstatus } from "@/api/api.js";
import Personal from "./components/personal";
import Organ from "./components/organ";
import AuditStauts from "./components/auditStatus";
export default {
  components: {
    Personal,
    Organ,
    AuditStauts,
  },
  data() {
    return {
      personform: {
        name: "",
        idNum: "",
      },
      active:3, //"2"
      authStatus: "",
      pagetype: { type: "", formList: "" },
    };
  },
  created() {
    this.handleGetData()
  },
  mounted() {},
  updated() {},
  methods: {
    handleChange(val) {
      console.log(val);
      if (val == 3) {
        this.active = val;
      } else {
        this.active = val.tocomponent;
        this.pagetype = val;
      }
    },
    handleGetData() {
      let that = this;
      // 判断认证状态
      getRealnameAuthstatus().then(function (response) {
        console.log(response);
        let authStatus = response.data.authStatus;
        that.authStatus = authStatus;
        that.$store.commit("setRealnameStatus", authStatus);
        if (authStatus == "1" || authStatus == "0") {
          that.active = 1;
          return;
        } else if (authStatus == "2" || authStatus == "3") {
          that.active = 2;
        } else if (authStatus == "5" || authStatus == "4") {
          that.active = 3;
        } else if (authStatus == "6") {
          // that.$router.push("menuAdmin");
          that.active = 3;
        }else{
          that.$router.push("menuAdmin");
        }
      });
    },
  },
};
</script>

<style  lang='scss' scoped>
.el-container {
  height: 100%;
  .el-header {
    height: 80px;
    .logo_box {
      height: 80px;
      font-size: 18px;
      line-height: 80px;
      display: flex;
      .top_name {
        font-size: 22px;
        color: #2882fe;
        font-weight: 700;
        margin-left: 12px;
      }
    }
  }
  .el-main {
    padding: 0;
    width: 100%;
    height: 100%;
    background: #eaeff3;
    // position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .sigin_box {
      width: 1200px;
      // height: 420px; //680px
      background-color: #fff;
      position: relative;
      left: 50%;
      transform: translate(-50%);
      margin-top: 35px;
      box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
      .header {
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-weight: 600;
        border-bottom: 1px solid #c0c4cf;
        .register_img {
          position: relative;
          top: 7px;
        }
      }
      .authentication_step {
        width: 1200px;
        height: 50px;
        font-size: 14px;
        margin: 20px auto;
        /deep/ .el-step__title.is-process {
          font-size: 14px;
          color: #c0c4cc;
          font-weight: 500;
        }
        /deep/ .el-step__head.is-process {
          color: #c0c4cc;
          border-color: #c0c4cc;
          font-weight: 500;
        }
      }
    }
    .copyright {
      text-align: center;
      width: 100%;
      font-size: 12px;
      background-color: #ebeff3;
      line-height: 60px;
      position: relative;
      bottom: 0;
    }
  }
}
</style>
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
      <!-- 登录框 -->
      <div class="content_box">
        <div class="box_left">
          <!-- <img src="@/assets/bg_img.jpg" alt="background" /> -->
        </div>
        <div class="box_right">
          <div class="box_right_title">金融科技服务能力共享系统</div>
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            class="login_tab"
          >
            <el-tab-pane label="密码登录" name="first" class="tab1">
              <!-- <input
                type="text"
                placeholder="手机号/邮箱"
                class="username"
                v-model="login_data.account"
              />
              <input
                type="password"
                placeholder="密码"
                class="password"
                v-model="login_data.passwd"
                @keyup.enter="login"
              /> -->
              <el-form :model="login_data" :rules="rules" ref="loginForm">
                <el-row>
                  <el-form-item prop="account">
                    <el-input
                      placeholder="手机号/邮箱"
                      v-model="login_data.account"
                      class="username"
                      clearable
                      autofocus
                    ></el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item prop="passwd">
                    <el-input
                      placeholder="请输入密码"
                      v-model="login_data.passwd"
                      show-password
                      class="password"
                      @keyup.enter="login"
                    ></el-input>
                  </el-form-item>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="验证码登录" name="second" class="tab2">
              <el-form :model="login_verify" :rules="rules2" ref="loginForm2">
                <el-row>
                  <el-form-item prop="account">
                    <el-input
                      placeholder="手机号"
                      v-model="login_verify.account"
                      class="username"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-row>
              </el-form>
              <div class="messageBox">
                <input
                  type="text"
                  placeholder="短信验证码"
                  class="password"
                  v-model="login_verify.verify_code"
                  @keyup.enter="login"
                />
                <span
                  class="sendCode"
                  @click="getmobilereg"
                  v-if="!sendMsgDisabled"
                  >发送验证码</span
                >
                <span class="sendCode" v-else style="font-size: 14px">{{
                  "重新发送(" + second + ")"
                }}</span>
                <!-- <button v-show="Verification" @click="handle">
                  点击获取验证码
                </button>
                <button v-show="!Verification">
                  <span>{{ timer }}</span
                  >秒后重新获取
                </button> -->
              </div>
            </el-tab-pane>
          </el-tabs>

          <div class="forget_password">
            <a @click="hangleToforgetPassword">忘记密码</a>
          </div>
          <el-button class="login_btn" @click="login">登录</el-button>
          <div class="no_account">
            没有账号？<span @click="hangleToSignIn">立即注册</span>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { loginFunction, loginMobilereg, loginMobile } from "@/api/api.js";
export default {
  data() {
    const validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号或者邮箱"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      loginType: "0",
      second: 60,
      sendMsgDisabled: false,
      login_data: {
        account: "",
        passwd: "",
      },
      login_verify: {
        account: "",
        verify_code: "",
      },
      rules: {
        passwd: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: validateAccount, trigger: "blur" }],
      },
      rules2: {
        account: [{ validator: validateMobile, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      this.loginType = tab.index;
    },
    hangleToSignIn() {
      this.$router.push("signin");
    },
    hangleToforgetPassword() {
      this.$router.push("forgetPassword");
    },

    login() {
      let that = this;
      console.log(that);
      if (this.loginType === "0") {
        loginFunction(this.login_data).then(function (response) {
          console.log(response);
          if (response.code === "1") {
            localStorage.setItem("Authorization", response.data.token);
            // that.$router.push("/");
            that.$store.commit("setToken", response.data.token);
            that.$router.push("/authentication");
            that.$message({
              message: "登录成功",
              type: "success",
            });
          } else {
            that.$message({
              message: response.des,
              type: "warning",
            });
          }
        });
      } else {
        loginMobile(this.login_verify).then(function (response) {
          console.log(response);
          if (response.code === "1") {
            localStorage.setItem("Authorization", response.data.token);
            that.$router.push("/authentication");
            that.$message({
              message: "登录成功",
              type: "success",
            });
          }
        });
      }
    },
    getmobilereg() {
      let that = this;
      if (this.login_verify.account == "") {
        console.log("3333333333333333");
        this.$refs.loginForm2.validate((valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        loginMobilereg({ mobile: this.login_verify.account }).then(function (
          response
        ) {
          that.timer();
          console.log(response);
        });
      }
    },
    timer() {
      console.log(this);
      this.sendMsgDisabled = true;
      let auth_timer = setInterval(() => {
        //定时器设置每秒递减
        this.second--; //递减时间
        if (this.second <= 0) {
          this.sendMsgDisabled = false; //60s时间结束还原v-show状态并清除定时器
          clearInterval(auth_timer);
        }
      }, 1000);
    },
  },
  created() {
    var that = this;
    document.onkeydown = function (e) {
      var key = window.event.keyCode;
      if (key == 13 || key == 100) {
        that.login();
      }
    };
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
      line-height: 80px;
      margin-left: 15px;
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
    background: #fff url("../../../../assets/login_bg.jpg") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .content_box {
      width: 1080px;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      border: 0;
      border-radius: 10px;
      .box_left {
        width: 540px;
        height: 569px;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
        background: #2882fe url("../../../../assets/bg_img.jpg") no-repeat;
        background-size: cover;
      }
      .box_right {
        width: 540px;
        height: 569px;
        .box_right_title {
          width: 100%;
          height: 146px;
          line-height: 146px;
          font-size: 26px;
          font-weight: 700;
          color: #2882fe;
          text-align: center;
        }
        .login_tab {
          width: 76%;
          margin-left: 12%;
          .el-input {
            /deep/ input {
              height: 50px;
            }
          }
          .tab1 {
            .username {
              margin-top: 30px;
            }
            .password {
              margin-top: 13px;
              margin-bottom: 0;
            }
          }
          .tab2 {
            border: 0;
            .username {
              margin-top: 30px;
            }
            .messageBox {
              height: 50px;
              margin-top: 13px;
              margin-bottom: 22px;
              border: 1px solid #dae0e5;
              border-radius: 5px;
              display: flex;
              color: #606266;
              input {
                flex: 1;
                border: 0;
                margin: 0;
                padding: 0 15px;
              }
              input::-webkit-input-placeholder {
                color: #c0c4cf;
              }
              input::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #c0c4cf;
              }
              input:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #c0c4cf;
              }
              input:-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                color: #c0c4cf;
              }
              span {
                height: 20px;
                width: 104px;
                color: #2882fe;
                border-left: 1px solid #dae0e5;
                margin-top: 15px;
                text-align: center;
                cursor: pointer;
              }
            }
          }
        }
        .forget_password {
          font-size: 16px;
          margin-bottom: 30px;
          margin-left: 12%;
          width: 76%;
          text-align: end;
          color: #99a2ae;
          cursor: pointer;
        }
        .login_btn {
          width: 76%;
          height: 50px;
          margin-left: 12%;
          background-color: #2882fe;
          color: #fff;
          font-size: 18px;
          border: 0;
          border-radius: 5px;
        }
        .no_account {
          margin-top: 25px;
          font-size: 15px;
          width: 76%;
          margin-left: 12%;
          color: #99a2ae;
          text-align: center;
          span {
            color: #2882fe;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
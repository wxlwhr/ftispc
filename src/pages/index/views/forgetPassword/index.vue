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
          <span @click="handleBack"
            ><i class="el-icon-arrow-left"></i>去登录</span
          >
          <img
            src="@/assets/forgetpassword.png"
            alt="忘记密码"
            class="forget_img"
          />
          忘记密码
        </div>
        <div class="sign_content">
          <div class="phoneNum">
            <img
              src="@/assets/register_pho_num.png"
              alt="手机号"
              style="height: 18px; width: 18px"
            />
            <input type="text" placeholder="手机号" v-model="form.mobile" />
          </div>
          <div class="note_code">
            <img
              src="@/assets/register_mess_ver.png"
              alt="短信验证码"
              style="height: 18px; width: 18px"
            />
            <input
              type="text"
              placeholder="短信验证码"
              v-model="form.mobile_code"
            />
            <span class="sendCode" @click="mobilePwd">发送验证码</span>
          </div>
          <el-button class="signin_btn" @click="getRandomPwd"
            >获取随机密码</el-button
          >
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { sendMobilepasswd, randomPasswd } from "@/api/api.js";
export default {
  data() {
    return {
      form: {
        mobile: "",
        mobile_code: "",
      },
    };
  },
  methods: {
    handleBack() {
      this.$router.push("login");
    },
    mobilePwd() {
      let that = this;
      if (this.form.mobile === "") {
        that.$message.warning("请输入手机号");
      } else {
        sendMobilepasswd({ mobile: this.form.mobile }).then(function (
          response
        ) {
          console.log(response);
          if (response.code === "1") {
            that.$message({
              message: "短信验证码获取成功",
              type: "success",
            });
          } else {
            that.$message.error(response.des);
          }
        });
      }
    },
    getRandomPwd() {
      let that = this;
      let data = {
        account: this.form.mobile,
        verify_code: this.form.mobile_code,
      };

      if (this.form.mobile != "" && this.form.mobile_code != "") {
        randomPasswd(data).then(function (res) {
          console.log(res);
          if (res.code === "1") {
            that.$message({
              message: "获取随机密码成功",
              type: "success",
            });
          } else {
            that.$message.error(res.des);
          }
        });
      } else {
        this.$message.warning("请填写信息");
      }
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
    background: #eaeff3;
    position: relative;
    .sigin_box {
      width: 1200px;
      height: 680px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      margin-top: 35px;
      box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
      .header {
        height: 70px;
        line-height: 70px;
        text-align: center;
        span {
          position: absolute;
          display: block;
          left: 35px;
          font-size: 14px;
          color: #2882fe;
          cursor: pointer;
        }
        .forget_img {
          position: relative;
          top: 7px;
        }
      }
      .sign_content {
        div {
          width: 420px;
          height: 43px;
          line-height: 43px;
          margin-left: 390px;
          margin-top: 27px;
        }
        input::placeholder {
          color: #99a2ae;
        }
        .phoneNum,
        .note_code {
          display: flex;
          border: 1px solid #dae0e5;
          border-radius: 3px;
          img {
            margin-top: 13px;
            margin-left: 15px;
            margin-right: 10px;
          }
          input {
            flex: 1;
            border: 0;
          }
        }
        .img_code {
          display: flex;
          justify-content: space-between;
          .img_code_input {
            width: 305px;
            height: 43px;
            line-height: 43px;
            display: flex;
            border: 1px solid #dae0e5;
            border-radius: 3px;
            margin: 0;
            img {
              margin-top: 13px;
              margin-left: 15px;
              margin-right: 10px;
            }
            input {
              flex: 1;
              border: 0;
            }
          }
          span {
            width: 100px;
            #imgIdentifyingCode {
              width: 100px;
              height: 43px;
            }
          }
        }

        .sendCode {
          width: 96px;
          font-size: 14px;
          color: #2882fe;
          text-align: center;
          border-left: 1px solid #dae0e5;
          cursor: pointer;
        }
      }

      .signin_btn {
        width: 420px;
        height: 50px;
        margin-left: 390px;
        margin-top: 30px;
        background-color: #2882fe;
        color: #fff;
        font-size: 18px;
        border: 0;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
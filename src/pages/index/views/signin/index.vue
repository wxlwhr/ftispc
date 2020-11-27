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
            src="@/assets/register.png"
            alt="忘记密码"
            class="register_img"
          />
          注册
        </div>
        <div class="sign_content">
          <!-- <div class="phoneNum">
            <img
              src="@/assets/register_pho_num.png"
              alt="手机号"
              style="height: 18px; width: 18px"
            />
            <input type="text" placeholder="手机号" v-model="signform.mobile"/>
          </div> -->
          <el-form :model="signform" :rules="rules" ref="signform">
            <el-row>
              <el-form-item prop="mobile">
                <el-input
                  placeholder="手机号"
                  class="phoneNum"
                  v-model="signform.mobile"
                  clearable
                  autofocus
                >
                  <img
                    src="@/assets/register_pho_num.png"
                    alt="手机号"
                    style="height: 18px; width: 18px"
                    slot="prefix"
                  />
                </el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item prop="mobile_code">
                <el-input
                  placeholder="短信验证码"
                  class="note_code"
                  v-model="signform.mobile_code"
                  clearable
                >
                  <img
                    src="@/assets/register_mess_ver.png"
                    alt="手机号"
                    style="height: 18px; width: 18px"
                    slot="prefix"
                  />
                  <template slot="append"
                    ><span class="sendCode" @click="mobilereg"
                      >发送验证码</span
                    ></template
                  >
                </el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item prop="email">
                <el-input
                  placeholder="邮箱"
                  class="email"
                  v-model="signform.email"
                  clearable
                >
                  <img
                    src="@/assets/register_mail.png"
                    alt="邮箱"
                    style="height: 18px; width: 18px"
                    slot="prefix"
                  />
                </el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item prop="email_code">
                <el-input
                  placeholder="邮箱验证码"
                  class="email_code"
                  v-model="signform.email_code"
                  clearable
                >
                  <img
                    src="@/assets/register_mess_ver.png"
                    alt="邮箱验证码"
                    style="height: 18px; width: 18px"
                    slot="prefix"
                  />
                  <template slot="append"
                    ><span class="sendCode" @click="emailreg"
                      >发送验证码</span
                    ></template
                  >
                </el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item prop="passwd">
                <el-input
                  placeholder="请输入新密码"
                  class="password"
                  v-model="signform.passwd"
                  show-password
                >
                  <img
                    src="@/assets/register_password1.png"
                    alt="密码"
                    style="height: 18px; width: 18px"
                    slot="prefix"
                  />
                </el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item prop="confirm_passwd">
                <el-input
                  placeholder="请再次确认密码"
                  class="repassword"
                  v-model="signform.confirm_passwd"
                  show-password
                >
                  <img
                    src="@/assets/register_password2.png"
                    alt="确认密码"
                    style="height: 18px; width: 18px"
                    slot="prefix"
                  />
                </el-input>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item prop="pic_code" class="img_code_box">
                <el-input
                  placeholder="验证码"
                  class="img_code_input"
                  v-model="signform.pic_code"
                  clearable
                >
                  <img
                    src="@/assets/register_mess_ver.png"
                    alt="确认密码"
                    style="height: 18px; width: 18px"
                    slot="prefix"
                  />
                </el-input>
                <span @click="get_uuid" id="img_code">
                  <img
                    id="imgIdentifyingCode"
                    alt="点击更换"
                    style="width:100px,height:43px"
                  />
                </span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-button class="signin_btn" @click="signNewUser('signform')"
                  >注册</el-button
                >
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { addNewUser, sendMobilereg, sendEmailreg } from "@/api/api.js";
import { validatemobile, regularEmail } from "@/util/verify.js";
export default {
  data() {
    const validateMobile = validatemobile;
    const validateMobileCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入短信验证码"));
      } else {
        callback();
      }
    };
    const validateEmail = regularEmail;
    const validateEmailCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱验证码"));
      } else {
        callback();
      }
    };
    const validatePasswd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码长度最小6位"));
      } else {
        callback();
      }
    };
    const validateConPasswd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value !== this.signform.passwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validatePicCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入图片验证码"));
      } else {
        callback();
      }
    };
    return {
      signform: {
        mobile: "",
        mobile_code: "",
        email: "",
        email_code: "",
        passwd: "",
        confirm_passwd: "",
        pic_code: "",
      },
      rules: {
        // passwd: [{ validator: validatePass, trigger: "blur" }],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
        mobile_code: [{ validator: validateMobileCode, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        email_code: [{ validator: validateEmailCode, trigger: "blur" }],
        passwd: [{ validator: validatePasswd, trigger: "blur" }],
        confirm_passwd: [{ validator: validateConPasswd, trigger: "blur" }],
        pic_code: [{ validator: validatePicCode, trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {
    this.get_uuid();
  },
  methods: {
    handleBack() {
      this.$router.push("login");
    },
    mobilereg() {
      // sendMobilereg({mobile:this.signform.mobile}).then(function (response) {
      //   console.log(response);
      // });
      sendMobilereg({ mobile: this.signform.mobile }).then(function (response) {
        console.log(response);
      });
    },
    emailreg() {
      sendEmailreg({ email: this.signform.email }).then(function (response) {
        console.log(response);
      });
    },
    // 请求图片验证码
    updataPiccode(uuid) {
      let that = this;
      let url = this.$store.state.url;
      let identifyCodeSrc = "";
      if (uuid) {
        identifyCodeSrc = url + "/vericode/piccode?business_id=" + uuid;
      }
      console.log(identifyCodeSrc);
      let objs = document.getElementById("imgIdentifyingCode");
      objs.src = identifyCodeSrc;
    },
    //生成随机的uuid
    get_uuid() {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (let i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      let uuid = s.join("");
      console.log(uuid);
      this.updataPiccode(uuid);
      return uuid;
    },
    // 点击注册按钮
    signNewUser(signform) {
      this.$refs[signform].validate((valid) => {
        if (valid) {
          addNewUser(this.signform).then((res) => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
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
      height: 700px; //680px
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
        border-bottom: 1px solid #c0c4cf;
        span {
          position: absolute;
          display: block;
          left: 35px;
          font-size: 14px;
          color: #2882fe;
          cursor: pointer;
        }
        .register_img {
          position: relative;
          top: 7px;
        }
      }
      .sign_content {
        .el-form-item {
          width: 420px;
          margin-left: 390px;
        }
        .el-input {
          width: 420px;
          margin-top: 5px;
          /deep/ input {
            height: 44px;
          }
          img {
            margin-top: 11px;
            padding-left: 3px;
          }
        }
        .phoneNum {
          margin-top: 35px;
        }
        .img_code_box {
          .img_code_input {
            width: 300px;
          }
          #img_code {
            position: absolute;
            top: 5px;
            right: 0;
            width: 100px;
            height: 43px;
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
          cursor: pointer;
        }
        .signin_btn {
          width: 420px;
          height: 50px;
          margin-top: 10px;
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
}
</style>
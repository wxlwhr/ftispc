<template>
  <div class="revisePsw">
    <header>修改密码</header>
    <main>
      <el-form
        :model="searchForm"
        :rules="rules"
        ref="searchForm"
        label-width="auto"
      >
        <el-row>
          <el-form-item label="旧密码:">
            <el-input v-model="searchForm.oldPasswd" show-password></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="新密码:" prop="newPasswd">
            <el-input v-model="searchForm.newPasswd" show-password></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="确认新密码:" prop="confirmPasswd">
            <el-input v-model="searchForm.confirmPasswd" show-password></el-input>
          </el-form-item>
        </el-row>
        <el-row class="footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="submit('searchForm')"
            >保存</el-button
          >
        </el-row>
      </el-form>
    </main>
  </div>
</template>

<script>
import { changePasswd } from "@/api/api.js";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (value === this.searchForm.oldPass) {
          callback(new Error("与旧密码一致，请重新输入!"));
        }
        if (this.searchForm.confirmPasswd !== "") {
          this.$refs.searchForm.validateField("confirmPasswd");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认新密码"));
      } else if (value !== this.searchForm.newPasswd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      searchForm: {
        oldPasswd: "",
        newPasswd: "",
        confirmPasswd: "",
      },
      rules: {
        newPasswd: [{ validator: validatePass, trigger: "blur" }],
        confirmPasswd: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  computed: {},
  methods: {
    submit(searchForm) {
      this.$refs[searchForm].validate((valid) => {
        if (valid) {
          changePasswd(this.searchForm).then((res) => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.searchForm);
    },
    // 数据提交
  },
};
</script>
<style lang="scss" scoped>
.revisePsw {
  background: #fff;
  height: 100%;

  header {
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
  }
  main {
    margin: auto;
    width: 500px;
    margin-top: 20px;
    .el-input {
      height: 42px;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    .el-button {
      width: 60px;
      height: 32px;
      font-size: 12px;
      padding: 0;
    }
    .el-button:nth-child(2){
      margin-left: 20px;
    }
  }
}
</style>
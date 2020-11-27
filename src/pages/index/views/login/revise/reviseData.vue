<template>
  <div class="reviseData">
    <header>修改资料</header>
    <main>
      <el-form
        :model="searchForm"
        :rules="rules"
        ref="searchForm"
        label-width="auto"
      >
        <el-row>
          <el-form-item label="姓名:">
            <el-input v-model="searchForm.user_name" disabled></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="部门:">
            <el-input v-model="searchForm.department"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="职务:">
            <el-input v-model="searchForm.position"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="联系方式:">
            <el-input v-model="searchForm.mobile" disabled></el-input>
          </el-form-item>
        </el-row>
        <el-row class="footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </el-row>
      </el-form>
    </main>
  </div>
</template>

<script>
import { changeUserIfor,getRealnameOrganInfo } from "@/api/api";
export default {
  data() {
    return {
      searchForm: {
        userName: "",
        department: "",
        job: "",
        phone: "",
      },
      rules: {},
    };
  },
  computed: {},
  methods: {
    submit() {
      console.log(this.searchForm);
      let that = this;
      let data = {
        department: this.searchForm.department,
        position: this.searchForm.position,
      };
      changeUserIfor(data).then(function (response) {
        if (response.code == "1") {
          if (response.des == "用户信息修改成功") {
            // that.$store.commit("setUserIfor", that.searchForm);
            that.$message.success(response.des);
          }
        } else {
          that.$message.error(response.des);
        }
        console.log(response);
      });
    },
    async getuserIfor() {
      let that = this;
      await getRealnameOrganInfo().then(function (res) {
        console.log(res);
        that.searchForm=res.data.user
        sessionStorage.setItem("userIfor", JSON.stringify(res.data.user));
      });
    },
  },
  created() {
    // this.searchForm = JSON.parse(window.sessionStorage.getItem("userIfor"));
    this.getuserIfor()
    console.log(this.searchForm);
  },
};
</script>
<style lang="scss" scoped>
.reviseData {
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
    margin-bottom: 20px;
    .el-button {
      width: 60px;
      height: 32px;
      font-size: 12px;
      padding: 0;
    }
    .el-button:nth-child(2) {
      margin-left: 10px;
    }
  }
}
</style>
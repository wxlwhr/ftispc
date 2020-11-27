<template>
  <div>
    <!-- 个人实名认证 -->
    <el-form
      :model="personform"
      :rules="rules"
      ref="personform"
      class="person_form"
      style="margin-top: 18px"
    >
      <el-row>
        <el-form-item prop="userName">
          <el-input
            placeholder="姓名"
            class="userName"
            v-model="personform.userName"
            clearable
            autofocus
          >
            <img
              src="@/assets/name.png"
              alt="姓名"
              style="height: 18px; width: 18px"
              slot="prefix"
            />
          </el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item prop="idCode">
          <el-input
            placeholder="身份证号"
            class="idCode"
            v-model="personform.idCode"
            clearable
            autofocus
          >
            <img
              src="@/assets/ID.png"
              alt="身份证号"
              style="height: 18px; width: 18px"
              slot="prefix"
            />
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button
            class="apply_btn"
            type="primary"
            @click="applyForPerson('personform')"
            >申请个人实名认证</el-button
          >
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getRealnamePersonal, getRealnamePersonalInfo } from "@/api/api.js";
import { validateId } from "@/util/verify.js";
export default {
  props: {
    status: {
      type: String,
    },
  },
  data() {
    const validateuserName = (rule, value, callback) => {
      if (value === "" || typeof value == "undefined") {
        callback(new Error("请输入中文姓名"));
      } else if (!/^([\u4e00-\u9fa5]){2,10}$/.test(value)) {
        callback(new Error("请输入正确的姓名"));
      } else {
        callback(console.log("111111111"));
      }
    };
    const validateidCode = validateId;
    return {
      personform: {
        userName: "",
        idCode: "",
      },
      rules: {
        // passwd: [{ validator: validatePass, trigger: "blur" }],
        userName: [{ validator: validateuserName, trigger: "blur" }],
        idCode: [{ validator: validateidCode, trigger: "blur" }],
      },
    };
  },

  components: {},

  computed: {},

  methods: {
    applyForPerson(personform) {
      let that = this;
      this.$refs[personform].validate((valid) => {
        if (valid) {
          getRealnamePersonal(this.personform).then(function (res) {
            console.log(res);
            if (res.code === "1") {
              that.$emit("changeActive", { tocomponent: 2, type: "add" });
              that.$message({
                message: "公安系统联网验证通过",
                type: "success",
              });
            } else {
              that.$message.error(res.des);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getUserIfor() {
      let that = this;
      getRealnamePersonalInfo().then(function (res) {
        console.log(res);
        that.personform = res.data;
      });
    },
  },
  async created() {
    console.log(this.status);
    if (this.status == "1") {
      await this.getUserIfor();
    } else if (this.status == "0") {
      return;
    }
  },
};
</script>
<style lang='scss' scoped>
.el-form-item {
  text-align: center;
  width: 420px;
  margin-left: 390px;
}
.el-input {
  width: 420px;
  height: 45px;
  img {
    margin-top: 11px;
    padding-left: 3px;
  }
}
.apply_btn {
  width: 420px;
  height: 45px;
  margin-top: 10px;
  background-color: #2882fe;
  color: #fff;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}
</style>
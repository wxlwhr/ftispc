<template>
  <div class="wrapper">
    <el-dialog title="角色审核" :visible.sync="visibleUpdateRole"  width="35%">
    <el-form :model="ruleForm" label-width="auto" status-icon>
      <el-form-item label="申请说明:">
        <el-input type="textarea" v-model="ruleForm.apply_des" readonly></el-input>
      </el-form-item>
      <el-form-item label="审核意见:">
        <el-input type="textarea" v-model="ruleForm.comentsConntent"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visibleUpdateRole = false">取 消</el-button>
      <el-button type="primary" @click="isPass()">通 过</el-button>
      <el-button type="primary" @click="noPass()">拒 绝</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { pass,noPass } from "@/api/api.js";
export default {
  name: "examine",
  data() {
    return {
      ruleForm:{
        applyId:0,
        apply_des:"",
        comentsConntent:""
      },
      subForm:{
        applyId:0,
        comentsConntent:""
      },
      visibleUpdateRole:false
    };
  },
  methods: {
    isPass(){
      this.subForm.applyId = this.ruleForm.applyId
      this.subForm.comentsConntent = this.ruleForm.comentsConntent
      pass(this.subForm).then(function (response) {})
      this.visibleUpdateRole = false;
    },
    noPass(){
      this.subForm.applyId = this.ruleForm.applyId
      this.subForm.comentsConntent = this.ruleForm.comentsConntent
      noPass(this.subForm).then(function (response) {})
      this.visibleUpdateRole = false;
    },
    handlexsyc(value){
      this.ruleForm.applyId=value.apply_id
      this.ruleForm.apply_des=value.apply_des
      this.visibleUpdateRole=true
    }
  },
};
</script>
<style lang="scss" scoped>
// .wrapper{}
</style>

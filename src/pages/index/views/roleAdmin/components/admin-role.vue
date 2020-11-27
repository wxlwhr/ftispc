<template>
  <div class="wrapper">
    <el-dialog title="新增角色" :visible.sync="visibleRole" width="35%">
    <el-form ref="ruleForm" :model="ruleForm" label-width="auto" status-icon :rules="rules">
      <el-form-item prop="role_name" label="角色名:">
        <el-input placeholder="请输入" v-model="ruleForm.role_name" clearable></el-input>
      </el-form-item>
      <el-form-item prop="role_des" label="角色描述:">
        <el-input  placeholder="请输入"type="textarea" v-model="ruleForm.role_des" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visibleRole = false">取 消</el-button>
      <el-button type="primary" @click="addAdminRole()" >确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { addAdminRole } from "@/api/api.js";
export default {
  name: "adminRoles",
  components: {},
  props:{},
  data() {
    const validateRoleName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入角色名"));
      } else {
        callback();
      }
    };
    const validateRoleDes = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入角色描述"));
      } else {
        callback();
      }
    };
    return {
      ruleForm:{
        role_name:"",
        role_des:""
      },
      visibleRole:false,
      rules: {
        role_name: [
          { required: true, validator: validateRoleName, trigger: "blur" },
        ],
        role_des: [
          { required: true, validator: validateRoleDes, trigger: "blur" },
        ]
      }
    };
  },
  methods: {
    addAdminRole(){
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          addAdminRole(this.ruleForm).then( (response)=> {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.$emit('getadminroles')
          })
          this.visibleRole = false;
        } else {
          return false;
        }
      })
    },
    handlexsyc(){
      this.visibleRole=true
    }
  },
};
</script>
<style lang="scss" scoped>
.wrapper{
  // .el-dialog{
  //   width: 35%!important;
  // }
}
</style>

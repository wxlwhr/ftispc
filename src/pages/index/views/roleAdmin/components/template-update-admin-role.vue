<template>
  <div class="wrapper">
    <el-dialog title="修改角色" :visible.sync="visibleUpdateRole" width="35%">
    <el-form :model="ruleForm" label-width="auto" status-icon>
      <el-form-item label="角色名:">
        <el-input v-model="ruleForm.role_name"></el-input>
      </el-form-item>
      <el-form-item label="角色描述:">
        <el-input type="textarea" v-model="ruleForm.role_des"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visibleUpdateRole = false">取 消</el-button>
      <el-button type="primary" @click="updateRole()">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateAdinmRole } from "@/api/api.js";
export default {
  name: "updateAdminRoles",
  components: {},
  data() {
    return {
      ruleForm:{},
      visibleUpdateRole:false
    };
  },
  methods: {
    updateRole(){
      updateAdinmRole(this.ruleForm).then(function (response) {})
      this.visibleUpdateRole = false;
    },
    handlexsyc(value){
      this.ruleForm=value
      this.visibleUpdateRole=true
    }
  },
};
</script>
<style lang="scss" scoped>
// .wrapper{}
</style>

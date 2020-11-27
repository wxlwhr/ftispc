<template>
  <div class="wrapper">
    <el-dialog title="新增角色" :visible.sync="visibleRole" width="35%">
      <el-form :model="ruleForm" label-width="auto" status-icon>
        <el-form-item label="角色名:">
          <el-input v-model="ruleForm.role_name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述:">
          <el-input type="textarea" v-model="ruleForm.role_des"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleRole = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addAdminRole } from "@/api/api.js";
export default {
  name: "adminRoles",
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {},
      visibleRole: false,
    };
  },
  methods: {
    addRole() {
      let that=this
      addAdminRole(this.ruleForm).then(function (response) {
          that.$parent.wo()
      });
      this.visibleRole = false;
    },
    handlexsyc() {
      this.visibleRole = true;
    },
  },
};
</script>
<style lang="scss" scoped>
// .wrapper {
  // .el-dialog{
  //   width: 35%!important;
  // }
// }
</style>

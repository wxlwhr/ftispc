<template>
  <div class="wrapper">
    <el-dialog title="查看" :visible.sync="visibleUpdateRole" width="35%">
      <el-form :model="ruleForm" label-width="auto" status-icon>
        <el-form-item label="申请说明:">
          <el-input type="textarea" v-model="ruleForm.apply_des" readonly></el-input>
        </el-form-item>
        <el-form-item label="审核意见:">
          <el-input type="textarea" v-model="ruleForm.audit_comments" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateAdinmRole } from "@/api/api.js";
export default {
  name: "see",
  data() {
    return {
      ruleForm:{},
      visibleUpdateRole:false
    };
  },
  methods: {
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

<template>
  <!-- 表格 -->
  <div>
    <el-table
      :data="tableData"
      @selection-change="selectionChange"
      style="width: 100%"
      :header-cell-style="tableHeaderColor"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="role_name" label="角色名"> </el-table-column>
      <el-table-column prop="role_des" label="角色说明"> </el-table-column>
    </el-table>
    <div class="dialog-footer">
      <el-button @click="noBtn">取 消</el-button>
      <el-button type="primary" @click="handleAllotRole">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { grantrolePlatformmanager } from "@/api/api";
export default {
  name: "Role",
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    component_id:{
      type:String,
      default: () => {},
    }
  },
  data() {
    return {};
  },
  methods: {
    tableHeaderColor({ row, rowIndex, column, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color:#f6f7fb;color:#000;";
      }
    },
    selectionChange(selection, row) {
      console.log(selection, row);
      let markList = [];
      for (let i = 0; i < selection.length; i++) {
        markList.push(selection[i].role_id);
      }
      this.markRoleList = markList;
    },
    handleAllotRole() {
      let that=this
      let data = {
        roles: this.markRoleList,
        userId:this.component_id,
      };
      grantrolePlatformmanager(data).then(function (res) {
        console.log(res);
        that.$emit('close')
      });
    },
    noBtn(){
      this.$emit('close')
    }
  },
};
</script>
<style lang="scss" scoped>
.dialog-footer{
  margin-top: 20px;
  margin-left: 66%;
}
// .wrapper{}
</style>
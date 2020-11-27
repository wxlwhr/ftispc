<template>
  <div class="orgRole">
    <header>管理员角色管理</header>
    <!-- Tab -->
    <main>
      <div>
        <el-button type="primary"  icon="el-icon-plus"  @click="addAdminRole">新建角色</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%; margin-top: 20px;font-size:12px;" :row-style="{height:'40px'}" :cell-style="{padding:'0'}">
        <el-table-column prop="role_name" label="角色名称"> </el-table-column>
        <el-table-column prop="role_des" label="角色描述"> </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="rela(scope.row.role_id)">关联菜单</el-button>
            <el-button type="text" size="small" @click="updateRole(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="delOrgRole(scope.row.role_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNum"
          :page-size="pageSize" layout="prev, pager, next, jumper" :total="total" background>
        </el-pagination>
      </div>
    </main>
    <!-- 新建角色 -->
    <adminRoles ref="roleAddDialog" @getadminroles="getAdminRoles"></adminRoles>
    <!-- 修改角色 -->
    <updateAdminRoles ref="roleUpdateDialog"></updateAdminRoles>
    <!-- 关联菜单 -->
    <rela ref="roleRelaDialog"></rela>
  </div>

</template>
<script>
import utils from "@/util/util";
import { getAdminRole,delOrgRole } from "@/api/api.js";
import adminRoles from "../components/template-admin-role";
import rela from "../../roleAdmin/components/template-organ-rela";
import updateAdminRoles from "../components/template-update-admin-role";
export default {
  name: 'adminRole',
  data() {
    return {
      title:'新建角色',
      tableData: utils.adminRoleList,
      addRole: false,
      pageNum: 1,
      pageSize:10,
      total:1000
    };
  },
  components: {
    adminRoles,updateAdminRoles,rela
  },
  mounted: function () {
    this.getAdminRoles(this.pageNum)
  },
  methods:{
    wo(){
      this.getAdminRoles(this.page)
    },
    getAdminRoles(page){
      let that = this;
      let data={
        page:this.page,
        rows:this.pageSize+""
      }
      getAdminRole(data).then(function (response) {
        that.tableData = response.rows
        that.total = response.records
      })
    },
    handleCurrentChange(val) {
      let that = this
      that.page=`${val}`
      that.getAdminRoles(`${val}`)
    },
    addAdminRole() {
      this.$refs.roleAddDialog.handlexsyc()
    },
    updateRole(value){
      this.$refs.roleUpdateDialog.handlexsyc(value)
    },
    rela(value){
      this.$refs.roleRelaDialog.handlexsyc(value)
    },
    delOrgRole(role_id){
      let that = this;
      this.$confirm("是否确认删除该角色?", "提示", {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(() => {
        // 删除请求
        delOrgRole({ "role_id": role_id }).then(function (response) {
          if (response.code == "1") {
            that.getAdminRoles(that.pageNum)
            that.$message({
              type: "success",
              message: "删除成功!",
            });
            that.getAdminRoles(that.pageNum)
          } else {
            that.$message.error(response.des);
          }
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.orgRole{
  height: 100%;
  background: #ffffff;
  header {
    padding: 15px;
    border-bottom: 1px solid #ccc;
  }
  main {
    padding: 20px;
  }
}
</style>

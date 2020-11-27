<template>
  <div class="orgRole">
    <header>机构角色管理</header>
    <!-- Tab -->
    <main>
      <div>
        <el-button type="primary"  icon="el-icon-plus" @click="addRole">新建角色</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%; margin-top: 20px;font-size:12px;" :row-style="{height:'40px'}" :cell-style="{padding:'0'}">
        <el-table-column v-if="false" prop="role_id" label="角色id"> </el-table-column>
        <el-table-column v-if="false" prop="role_bel_type" label="角色所属"> </el-table-column>
        <el-table-column prop="role_name" label="角色名称"> </el-table-column>
        <el-table-column prop="role_des" label="角色说明"> </el-table-column>
        <el-table-column prop="audit_type_disp" label="审核模式"> </el-table-column>
        <el-table-column prop="is_open_disp" label="是否公开"> </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="rela(scope.row.role_id)">关联菜单</el-button>
            <el-button type="text" size="small" @click="updateRole(scope.row)">修改</el-button>
            <el-button @click="delOrgRole(scope.row.role_id)" type="text" size="small" >删除</el-button >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="pageSize"
                       layout="prev, pager, next, jumper" :total="total" background>
        </el-pagination>
      </div>
    </main>
    <!-- 新建角色 -->
    <Role ref="roleAddDialog" @getorganrole="getOrganRole"></Role>
    <!-- 修改角色 -->
    <updateRole ref="roleUpdateDialog"></updateRole>
    <!-- 关联菜单 -->
    <rela ref="roleRelaDialog"></rela>
  </div>

</template>
<script>
import utils from "@/util/util";
import Role from "../../roleAdmin/components/template-role";
import rela from "../../roleAdmin/components/template-organ-rela";
import updateRole from "../../roleAdmin/components/template-update-role";
import { getOrgRole,delOrgRole } from "@/api/api.js";
export default {
  name: 'orgRole',
  data() {
    return {
        tableData: utils.roleList,
        pageNum: 1,
        pageSize:10,
        total:1000
    };
  },
  components: {
    Role,updateRole,rela
  },
  mounted: function () {
    this.getOrganRole(this.pageNum)
  },
  methods:{
    wo(){
      this.getOrganRole(this.page)
    },
    getOrganRole(page){
      let that = this;
      let data={
        page:this.page,
        rows:this.pageSize+""
      }
      getOrgRole(data).then(function (response) {
        that.tableData = response.rows
        that.total = response.records
      })
    },
    handleCurrentChange(val) {
      let that = this
      this.page=`${val}`
      this.getOrganRole(`${val}`)
    },
    addRole() {
      this.$refs.roleAddDialog.handlexsyc()
    },
    updateRole(value){
      console.log(value)
      this.$refs.roleUpdateDialog.handlexsyc(value)
    },
    rela(value){
      this.$refs.roleRelaDialog.handlexsyc(value)
    },
    delOrgRole(role_id) {
      let that = this;
      this.$confirm("是否确认删除该角色?", "提示", {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(() => {
        // 删除请求
        delOrgRole({ "role_id": role_id }).then(function (response) {
          if (response.code == "1") {
            that.getOrganRole(that.page)
            that.$message({
              type: "success",
              message: "删除成功!",
            });
            that.getOrganRole()
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
    },
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

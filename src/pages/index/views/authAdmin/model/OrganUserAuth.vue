<template>
  <div class="adminAuth">
    <div class="header">机构用户权限管理</div>
    <!-- Tab -->
    <main>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%; margin-top: 20px;font-size:12px;" :row-style="{height:'40px'}" :cell-style="{padding:'0'}">
        <el-table-column v-if="false" prop="user_id" label="用户id"> </el-table-column>
        <el-table-column prop="role_name"  align="center" label="姓名"> </el-table-column>
        <el-table-column prop="role_des" label="角色说明"> </el-table-column>
        <el-table-column prop="is_open_disp" label="是否公开"> </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="relaUser(scope.row.role_id)">关联用户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="pageSize"
                       layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </main>
    <!-- 关联菜单 -->
    <organRelaUser2 ref="roleRelaDialog"></organRelaUser2>
  </div>
</template>

<script>
import utils from "@/util/util";
import organRelaUser2 from "../components/organ-rela-user2";
import { getOrganRole } from "@/api/api.js";
export default {
  components: {organRelaUser2},
  props: {},
  data() {
    return {
      tableData:utils.roleList,
      pageNum: 1,
      pageSize:10,
      total:1000
    }
  },
  mounted: function () {
    this.getRoleList(this.pageNum)
  },
  methods: {
    getRoleList(page){
      let that = this;
      let data={
          page:this.pageNum+"",
          rows:this.pageSize+""
      }
      getOrganRole(data).then(function (response) {
        console.log(response)
        that.pageNum = response.data.roleList.pageNum
        that.tableData = response.data.roleList.rows
        that.total = response.data.roleList.records
      })
    },
    handleCurrentChange(val) {
      let that = this
      that.page=`${val}`
      that.getRoleList(`${val}`)
    },
    relaUser(value){
      this.$refs.roleRelaDialog.handlexsyc(value)
    },
  }
}
</script>
<style lang="scss" scoped>
.adminAuth{
  background-color: #fff;
  .header {
    padding: 15px;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #434b54;
    font-size: 16px;
  }
  main {
    padding: 20px;
    .searchBtn {
      background-color: #2882fe;
      padding: 10px 12px;
    }
    .el-table {
      font-size: 12px;
    }
  }
}
</style>

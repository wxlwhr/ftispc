<template>
  <div class="organUserAudit">
    <div class="header">机构用户角色审核</div>
    <!-- Tab -->
    <main>
      <g-tabs :model="activeName" :tabpane="tabData" :type="'card'" @tab-click="handleTabChange">
        <!-- 搜索框 -->
        <div>
          <el-form :inline="true" :model="formInline" label-width="auto">
            <el-form-item label="机构名称:">
              <el-input placeholder="机构名称" v-model="formInline.organ_name"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input placeholder="姓名" v-model="formInline.user_name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="find()" class="searchBtn">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" :row-style="{ height: '40px' }" :cell-style="{ padding: '0' }">
          <el-table-column prop="user_name" align="center" label="姓名"></el-table-column>
          <el-table-column prop="organ_name" label="机构名称"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="position" label="职务"> </el-table-column>
          <el-table-column prop="telephone" label="联系电话"> </el-table-column>
          <el-table-column prop="role_name" label="申请的角色"> </el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <el-button v-if="activeName === 'toAudit'" @click="handleAudit(scope.row)" type="text" size="small">审核</el-button>
              <el-button v-else @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </g-tabs>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum"
          :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </main>
    <!-- 审核 -->
    <examine ref="examineDialog"></examine>
    <!-- 查看 -->
    <see ref="seeDialog"></see>
  </div>
</template>

<script>
import utils from "@/util/util.js";
import examine from "../../authAdmin/components/examine";
import see from "../../authAdmin/components/see";
import { getAudit,getPass,getReject } from "@/api/api.js";
export default {
  data() {
    return {
      tableData: utils.userlist,
      pageNum: 1,
      pageSize:10,
      total: 1000,
      lastPage: "",
      formInline: {
        organ_name:"",
        user_name:""
      },
      activeName: "toAudit",
      currentPage1: 1,
      tabData: [
        { label: "待审核", name: "toAudit", count: 100 },
        { label: "通过", name: "auditPass", count: 26 },
        { label: "拒绝", name: "auditRefuse", count: 99 },
      ],
    }
  },
  components: {examine,see},
  mounted: function () {
    this.getToAudit(this.pageNum)
  },
  methods: {
    //获取待审核数据
    getToAudit(page){
      let that = this;
      that.formInline.page = this.pageNum+"",
      that.formInline.rows = this.pageSize+""
      getAudit(that.formInline).then(function (response) {
        that.tableData = response.data.userList.rows
        that.tabData[0].count = response.data.statistic.auditCnt
        that.tabData[1].count = response.data.statistic.passCnt
        that.tabData[2].count = response.data.statistic.rejectCnt
        that.total = response.data.userList.records
      })
    },
    //获取通过审核数据
    getToPass(page){
      let that = this;
      that.formInline.page = this.pageNum+"",
      that.formInline.rows = this.pageSize+""
      getPass(that.formInline).then(function (response) {
        console.log(response)
        that.tableData = response.data.userList.rows
        that.tabData[0].count = response.data.statistic.auditCnt
        that.tabData[1].count = response.data.statistic.passCnt
        that.tabData[2].count = response.data.statistic.rejectCnt
        that.total = response.data.userList.records
      })
    },
    //获取拒绝审核数据
    getToRefuse(page){
      let that = this;
      that.formInline.page = this.pageNum+"",
      that.formInline.rows = this.pageSize+""
      getReject(that.formInline).then(function (response) {
        console.log(response)
        that.tableData = response.data.userList.rows
        that.tabData[0].count = response.data.statistic.auditCnt
        that.tabData[1].count = response.data.statistic.passCnt
        that.tabData[2].count = response.data.statistic.rejectCnt
        that.total = response.data.userList.records
      })
    },
    // 审核
    handleAudit(value) {
      this.$refs.examineDialog.handlexsyc(value);
    },
    // 查看
    handleView(row) {
      this.$refs.seeDialog.handlexsyc(row);
    },
    find(){
      if(this.activeName==="toAudit"){
        this.getToAudit(this.page);
      }else if(this.activeName==="auditPass"){
        this.getToPass(this.page);
      }else if(this.activeName==="auditRefuse"){
        this.getToRefuse(this.page);
      }
    },
    handleTabChange(tab, event) {
      this.formInline = {}
      this.activeName = tab.paneName;
      if(tab.paneName==="toAudit"){
        this.getToAudit(this.page);
      }else if(tab.paneName==="auditPass"){
        this.getToPass(this.page);
      }else if(tab.paneName==="auditRefuse"){
        this.getToRefuse(this.page);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val
      console.log(this.activeName)
      if(this.activeName==="toAudit"){
        this.getToAudit(this.page);
      }else if(this.activeName==="auditPass"){
        this.getToPass(this.page);
      }else if(this.activeName==="auditRefuse"){
        this.getToRefuse(this.page);
      }
    },
    getHomeInfoSucc(res) {
      console.log(res);
    },
  }
}
</script>
<style lang="scss" scoped>
.organUserAudit{
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

<!-- 机构管理员管理页面 -->
<template>
  <div class="wrapper">
    <div class="header">合作公示管理</div>
    <!-- Tab -->
    <main>
      <g-tabs :model="activeName" :tabpane="tabData" :type="'card'" @tab-click="handleTabChange">
        <!-- 搜索框 -->
        <div>
          <el-form :inline="true" :model="formInline" label-width="auto">
            <el-form-item label="公示机构:">
              <el-input
                v-model="formInline.orgName"
                placeholder="机构名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="合作机构:">
              <el-input
                v-model="formInline.name"
                placeholder="机构名称"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  icon="el-icon-search" class="searchBtn">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" align="center" label="姓名">
          </el-table-column>
          <el-table-column prop="organname" label="标题"> </el-table-column>
          <el-table-column prop="department" label="公示机构"> </el-table-column>
          <el-table-column prop="duty" label="合作机构"> </el-table-column>
          <el-table-column prop="applyTime" label="申请时间"> </el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <el-button
                v-if="activeName === 'toAudit'"
                @click="handleAudit(scope.row)"
                type="text"
                size="small"
                >审核</el-button
              >
              <el-button
                v-else-if="activeName === 'refuse'"
                @click="handleView(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button
                v-else-if="activeName === 'publish'"
                @click="handleCancel(scope.row)"
                type="text"
                size="small"
                >撤销发布</el-button
              >
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
      </g-tabs>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
          background
        >
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import utils from "@/util/util";
export default {
  name: "publicityAdmin",
  data() {
    return {
      tableData: utils.Organlist,
      formInline: {},
      activeName: "toAudit",
      currentPage1: 5,
      tabData:[
        {label:'待审核',name:'toAudit',count:100},
        {label:'已发布',name:'publish',count:26},
        {label:'已拒绝',name:'refuse',count:102},
        {label:'已撤销',name:'cancel',count:26},
        {label:'管理员撤销',name:'Admincancel',count:99}
      ]
    }
  },

  components: {},
  methods: {
    // 审核
    handleAudit(row) {
      alert("审核");
    },
    // 查看
    handleView(row) {
      alert('查看')
    },
    // 撤销发布
    handleCancel(row){
      alert('撤销')
    },
    handleTabChange(tab, event) {
      this.activeName = tab.paneName;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #fff;
  height: 100%;
  .header {
    padding: 15px;
    border-bottom: 1px solid #ccc;
  }
  main {
    padding: 20px;
  }
}
</style>
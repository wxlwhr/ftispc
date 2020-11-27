<!-- 机构管理员管理页面 -->
<template>
  <div class="wrapper">
    <div class="header">机构管理员管理</div>
    <!-- Tab -->
    <main>
      <g-tabs
        :model="activeName"
        :tabpane="tabData"
        :type="'card'"
        @tab-click="handleTabChange"
      >
        <!-- 搜索框 -->
        <div>
          <el-form :inline="true" :model="formInline" label-width="auto">
            <el-form-item label="机构名称:">
              <el-input
                placeholder="机构名称"
                v-model="formInline.organ_name"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input
                placeholder="姓名"
                v-model="formInline.user_name"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" class="searchBtn" @click="searchList"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0' }"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="user_name" align="center" label="姓名">
          </el-table-column>
          <el-table-column prop="organ_name" label="机构名称">
          </el-table-column>
          <el-table-column prop="department" label="部门"> </el-table-column>
          <el-table-column prop="position" label="职务"> </el-table-column>
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
                v-else
                @click="handleView(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </g-tabs>
      <!-- 分页器 -->
      <div class="block_box">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="2"
          layout="prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import { tableRowClassName } from "@/util/verify.js";
// import axios from "axios";
// import utils from "@/util/util.js";
import {
  getListManagerAudit,
  getListManagerPass,
  getListManagerReject,
} from "@/api/api";
export default {
  name: "OrganAdmin",
  data() {
    return {
      tableData: [], //utils.Organlist
      page1: 1,
      page2: 1,
      page3: 1,
      lastPage: "",
      total: 1000,
      formInline: {
        user_name: "",
        organ_name: "",
      },
      activeName: "toAudit",
      currentPage1: 1,
      tabData: [
        { label: "待审核", name: "toAudit", count: 4 },
        { label: "通过", name: "auditPass", count: 0 },
        { label: "拒绝", name: "auditRefuse", count: 99 },
      ],
    };
  },

  components: {},
  methods: {
    tableRowClassName,
    // 审核
    handleAudit(row) {
      let id = row.user_id;
      // this.$store.commit('setAuditManager',id)
      this.$router.push({
        path: "/userAdmin/organAdmin/audit",
        query: {
          id: row.user_id,
          type: "audit",
        },
      });
    },

    // 查看
    handleView(row) {
      this.$router.push({
        path: "/userAdmin/organAdmin/detail",
        query: {
          id: row.user_id,
          type: "detail",
        },
      });
    },
    handleTabChange(tab, event) {
      // auditPass     auditRefuse      toAudit
      this.activeName = tab.paneName;
      console.log(this.activeName);
      if (this.activeName == "auditPass") {
        this.getPassList();
      } else if (this.activeName == "auditRefuse") {
        this.getRejectList();
      } else {
        this.getAuditList();
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页:${val}`, val);
      //   toAudit   auditPass   auditRefuse
      let that = this;
      if (this.activeName === "toAudit") {
        that.page1 = `${val}`;
        that.getAuditList(`${val}`);
      } else if (this.activeName === "auditPass") {
        that.page2 = `${val}`;
        that.getPassList(`${val}`);
      } else {
        that.page3 = `${val}`;
        that.getRejectList(`${val}`);
      }
    },
    // 条件查询--
    searchList() {
      console.log(this.formInline);
      if (this.activeName === "toAudit") {
        this.getAuditList("1");
      } else if (this.activeName === "auditPass") {
        this.getPassList("1");
      } else {
        this.getRejectList("1");
      }
    },
    getHomeInfoSucc(res) {
      console.log(res);
    },
    // 待审核管理员列表
    async getAuditList(page) {
      let that = this;
      let data = {
        user_name: this.formInline.user_name,
        organ_name: this.formInline.organ_name,
        page: page,
        rows: "2",
      };
      await getListManagerAudit(data).then(function (res) {
        console.log(res);
        that.tableData = res.data.managerList.rows;
        that.total = res.data.managerList.records;
        that.lastPage = res.data.managerList.lastPage;
        //managerStatis
        const { auditCnt, passCnt, rejectCnt } = res.data.managerStatis;
        that.tabData[0].count = auditCnt;
        that.tabData[1].count = passCnt;
        that.tabData[2].count = rejectCnt;
      });
    },
    // 通过审核管理员列表
    async getPassList(page) {
      let that = this;
      let data = {
        user_name: this.formInline.user_name,
        organ_name: this.formInline.organ_name,
        page: page,
        rows: "2",
      };
      await getListManagerPass(data).then(function (res) {
        that.tableData = res.data.managerList.rows;
        that.total = res.data.managerList.records;
        that.lastPage = res.data.managerList.lastPage;
        const { auditCnt, passCnt, rejectCnt } = res.data.managerStatis;
        that.tabData[0].count = auditCnt;
        that.tabData[1].count = passCnt;
        that.tabData[2].count = rejectCnt;
        console.log(res);
      });
    },
    // 被拒绝用户列表
    async getRejectList(page) {
      let that = this;
      let data = {
        user_name: this.formInline.user_name,
        organ_name: this.formInline.organ_name,
        page: page,
        rows: "2",
      };
      await getListManagerReject(data).then(function (res) {
        that.tableData = res.data.managerList.rows;
        that.total = res.data.managerList.records;
        that.lastPage = res.data.managerList.lastPage;
        that.tabData[0].count = res.data.managerStatis.auditCnt;
        that.tabData[1].count = res.data.managerStatis.passCnt;
        that.tabData[2].count = res.data.managerStatis.rejectCnt;
        console.log(res);
      });
    },
  },
  created() {
    const query = this.$route.query;
    console.log(query);
    // this.activeName=query.activeName

    this.getAuditList();
  },
  mounted() {},
  beforeUpdate() {},
};
</script>
<style lang="scss" scoped>
.wrapper {
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
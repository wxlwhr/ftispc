<!-- 机构用户管理页面 -->
<template>
  <div class="wrapper">
    <div class="header">机构用户管理</div>
    <!-- Tab -->
    <main>
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
            <el-button type="primary" icon="el-icon-search" class="searchBtn" @click="searchFunction"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-table
        :row-class-name="tableRowClassName"
        :data="tableData"
        style="width: 100%; font-size: 12px"
        :row-style="{ height: '40px' }"
        :cell-style="{ padding: '0' }"
      >
        <el-table-column prop="user_name" align="center" label="姓名">
        </el-table-column>
        <el-table-column prop="organ_name" label="机构名称"> </el-table-column>
        <el-table-column prop="department" label="部门"> </el-table-column>
        <el-table-column prop="position" label="职务"> </el-table-column>
        <el-table-column prop="telephone" label="联系电话"> </el-table-column>
        <el-table-column
          prop="is_organ_manager"
          label="是否机构管理员"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.is_organ_manager }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="trans_organ_manage_status_disp" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.trans_organ_manage_status_disp }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button @click="handleAudit(scope.row)" type="text" size="small"
              >审核</el-button
            >
            <el-button
              v-if="!scope.row.isAdmin"
              @click="handleSet(scope.row)"
              type="text"
              size="small"
              >设置管理员</el-button
            >
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="5"
          layout="prev, pager, next, jumper"
          :total=total
          background
        >
        </el-pagination>
      </div>
    </main>
    <!-- 转让管理员 弹框 -->
    <el-dialog title="审核-转让管理员" :visible.sync="dialog" width="35%">
      <el-form label-width="auto" class="formDialog">
        <el-form-item label="备注:">
          <p :rows="2" style="font-size: 12px">{{ applyState }}</p>
        </el-form-item>
        <el-form-item label="授权书:">
          <span class="hintR" @click="download">下载</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disagreeManager">拒绝</el-button>
        <el-button type="primary" @click="agreeManager">通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import utils from "@/util/util";
import { tableRowClassName } from "@/util/verify.js";
import {
  getOrganUserList,
  getManagerPass,
  getManagerReject,
  setasManager,
  transinfo,
  downloadAttachmentId
} from "@/api/api";
export default {
  name: "OrganAdmin",
  data() {
    return {
      tableData: [], //utils.Organlist
      formInline: {
        organ_name: "",
        user_name: "",
      },
      currentPage1: 1,
      dialog: false,
      applyState: "",
      dialogData: "",
      page:' 1',
      lastPage: "",
      total: 1000,
    };
  },

  components: {},
  methods: {
    tableRowClassName,
    //   设置管理员
    handleSet(row) {
      console.log(row);
      let that = this;
      row.isAdmin = true;
      let data = new FormData();
      data.append("userId", row.user_id);
      setasManager(data).then(function (res) {
        console.log(res);
        if (res.code === "1") {
          that.$message({
            message: "已设置为管理员",
            type: "success",
          });
          that.handleUserlist(that.page)
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = `${val}`;
      this.handleUserlist(`${val}`);
    },
    // 审核按钮
    handleAudit(row) {
      this.dialog = true;
      let that = this;
      console.log(row);
      this.rowid = row.user_id; //trans_id
      transinfo({ transId: "1" }).then(function (res) {
        console.log(res);
        that.applyState = res.data.transInfo.trans_des;
      });
    },
    // 通过审核--转让管理员
    agreeManager() {
      let that = this;
      let id = this.rowid;
      getManagerPass({ transId: id }).then(function (res) {
        console.log(res);
        that.dialog = false;
        if (res.code == "1") {
          that.$message({
            type: "success",
            message: "转让管理员成功",
          });
        }
      });
    },
    // 拒绝转让管理员
    disagreeManager() {
      let that = this;
      let id = this.rowid;
      getManagerReject({ transId: id }).then(function (res) {
        console.log(res);
        that.dialog = false;
        if (res.code == "1") {
          that.$message({
            type: "success",
            message: "拒绝转让管理员",
          });
        }
      });
    },
    // 下载授权模板
    async download(){
      await downloadAttachmentId('12312312') //4de17bbc347a4ed3afefaeb2af29a7fc
    },
    // 查询按钮
    searchFunction(){
      this.handleUserlist('1')
    },
    // 请求用户列表
    async handleUserlist(page) {
      console.log(page,'111111111')
      let that = this;
      let data={
        organ_name: this.formInline.organ_name,
         user_name: this.formInline.user_name,
         page:page,
         rows:'5'
      }
      await getOrganUserList(data).then(function (
        res
      ) {
        console.log(res);
        that.tableData = res.data.userList.rows;
        that.total = res.data.userList.records;
        that.lastPage = res.data.userList.lastPage;
      });
    },
  },
  created() {
    this.handleUserlist('1');
  },
  mounted() {},
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
  }
  .formDialog {
    .hintR {
      font-size: 12px;
      color: #2882fe;
      cursor: pointer;
      line-height: 1;
    }
  }
}
</style>
<!-- 平台管理员管理页面 -->
<template>
  <div class="wrapper">
    <header>平台管理员管理</header>
    <!-- Tab -->
    <main>
      <div>
        <el-button type="primary" @click="addAdmin">新建管理员账号</el-button>
        <el-button type="primary" @click="reset">重置密码</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        style="width: 100%; margin-top: 20px; font-size: 12px"
        :row-style="{ height: '40px' }"
        :cell-style="{ padding: '0' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="user_name" label="姓名"> </el-table-column>
        <el-table-column prop="department" label="部门"> </el-table-column>
        <el-table-column prop="position" label="职务"> </el-table-column>
        <el-table-column prop="telephone" label="联系电话"> </el-table-column>
        <el-table-column prop="login_name" label="登录账号"> </el-table-column>

        <el-table-column prop="user_flag" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.user_flag === '1'">正常</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.user_flag === '0'"
              @click="handleSet(scope.row)"
              type="text"
              size="small"
              >恢复</el-button
            >
            <el-button
              v-else
              @click="handleSet(scope.row)"
              type="text"
              size="small"
              >禁用</el-button
            >
            <el-button type="text" size="small" @click="reviseAdmin(scope.row)"
              >修改</el-button
            >
            <el-button type="text" size="small" @click="handledistributionRole(scope.row)"
              >分配角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="5"
          layout="prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
      </div>
    </main>
    <!-- 管理员表单 -->
    <el-dialog :title="title" :visible.sync="visibleAdmin" width="35%">
      <Admin
        ref="addAdmin"
        :ruleForm="ruleForm"
        :type="editAdmin"
        @close="closeDialog"
      ></Admin>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="visibleRole" width="35%">
      <Role
        ref="changeAdmin"
        :visibleRole="visibleRole"
        :tableData="roleData"
        :component_id="allot_id"
        @close="closeRoleDialog"
      ></Role>
      
    </el-dialog>
  </div>
</template>

<script>
// import utils from "@/util/util";
import Admin from "../components/template-admin";
import Role from "../components/template-role";
import { tableRowClassName } from "@/util/verify.js";
import {
  getPlatformmanager,
  disablePlatformmanager,
  enablePlatformmanager,
  resetpasswordPlat,
  grantrolelistPlatformmanager
} from "@/api/api";
export default {
  name: "OrganAdmin",
  data() {
    return {
      tableData: [], //utils.Organlist
      formInline: {},
      editAdmin: "",
      visibleAdmin: false,
      visibleRole: false,
      ruleForm: {},
      roleData: [],
      allot_id:'',
      total:1000,
      currentPage1:1,
      page:'1',
      markList:[]
    };
  },

  components: {
    Admin,
    Role,
  },
  computed: {
    title() {
      const title = this.editAdmin === "add" ? "新建管理员账号" : "修改";
      return title;
    },
  },

  methods: {
    tableRowClassName,
    //   禁用/恢复
    handleSet(row) {
      console.log(row);
      let that = this;
      if (row.user_flag === "1") {
        let data = new FormData();
        data.append("user_id", row.user_id);
        disablePlatformmanager(data).then(function (res) {
          row.user_flag = "0";
          that.$message({
            message: "已" + `${row.user_flag === "1" ? "恢复" : "禁用"}`,
            type: "success",
          });
          console.log(res);
        });
      } else {
        let data = new FormData();
        data.append("user_id", row.user_id);
        enablePlatformmanager(data).then(function (res) {
          row.user_flag = "1";
          that.$message({
            message: "已" + `${row.user_flag === "1" ? "恢复" : "禁用"}`,
            type: "success",
          });
          console.log(res);
        });
      }
    },
    // 重置密码
    reset() {
      let that = this;
      if(this.markList.length==0){
        return this.$message.warning('请先选择重置目标')
      }else{
        resetpasswordPlat(this.markList).then(function (res) {
          
        that.$message({
          message: "重置密码成功，初始密码为"+res.data.password,
          type: "success",
        });
      });
      }
      
      // this.$message({
      //   message: "重置密码成功，初始密码为Ab123456",
      //   type: "success",
      // });
    },
    // 新增管理员账号
    addAdmin() {
      this.visibleAdmin = true;
      this.editAdmin = "add";
    },
    // 修改管理员账号
    reviseAdmin(row) {
      console.log(row);
      this.ruleForm = {
        department: row.department,
        login_name: row.login_name,
        position: row.position,
        telephone: row.telephone,
        user_name: row.user_name,
        user_id: row.user_id,
      };
      this.visibleAdmin = true;
      this.editAdmin = "edit";
    },
    // 表格选中回调
    handleSelectionChange(selection, row) {
      console.log(selection, row);
      let markRow = [];
      for (let i = 0; i < selection.length; i++) {
        markRow.push(selection[i].user_id);
      }
      this.markList = markRow;
      console.log(markRow);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page=`${val}`
      this.getList(`${val}`);
    },
    // 关闭新增，修改弹窗
    closeDialog() {
      this.visibleAdmin = false;
      if(this.editAdmin==='add'){
        this.getList('1');
      }else{
        this.getList(this.page);
      }
      
    },
    // 修改分配角色的弹窗
    closeRoleDialog(){
      this.visibleRole=false
    },
    // 请求列表
    async getList(page) {
      let that = this;
      let data={
        page:page,
        rows:'5'
      }
      await getPlatformmanager(data).then(function (res) {
        console.log(res);
        that.total = res.data.managerList.records;
        that.lastPage = res.data.managerList.lastPage;
        that.tableData = res.data.managerList.rows;
      });
    },
    // 分配角色按钮
    handledistributionRole(row){
      this.visibleRole=true
      let that=this
      let id=row.user_id
      this.allot_id=String(id)
      this.getListrole(id)
    },
    // 请求分配角色
    async getListrole(id){
      let that=this
      await grantrolelistPlatformmanager({user_id:id}).then(function (res) {
        console.log(res);
        that.roleData=res.rows
      });
    }
  },
  created() {
    this.getList();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #fff;
  height: 100%;
  header {
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
  }
}
</style>
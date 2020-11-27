<!-- 机构管理员管理页面 -->
<template>
  <div class="wrapper">
    <div class="header">用户管理</div>
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
            <el-form-item label="姓名:">
              <el-input placeholder="姓名" v-model="formInline.user_name"></el-input>
            </el-form-item>
            <el-form-item label="部门:">
              <el-input
                placeholder="部门名称"
                v-model="formInline.department"
              ></el-input>
            </el-form-item>
            <el-form-item label="职务:">
              <el-input
                placeholder="职务名称"
                v-model="formInline.position"
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
          <el-table-column prop="department" label="部门"> </el-table-column>
          <el-table-column prop="position" label="职务"> </el-table-column>
          <el-table-column prop="mobile" label="联系电话"> </el-table-column>
          <el-table-column prop="mobile" label="是否管理员"> </el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <div v-if="activeName === 'toAudit'">
                <el-button
                  @click="handleAuditOk(scope.row)"
                  type="text"
                  size="small"
                  >通过</el-button
                >
                <el-button
                  @click="handleAuditNo(scope.row)"
                  type="text"
                  size="small"
                  >拒绝</el-button
                >
              </div>
              <div v-else-if="activeName === 'auditPass'">
                <el-button
                  @click="removeUser(scope.row)"
                  type="text"
                  size="small"
                  >移除</el-button
                >
                <el-button
                  @click="makeOverAdmin(scope.row)"
                  type="text"
                  size="small"
                  >转让管理员</el-button
                >
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
        </el-table>
      </g-tabs>
      <!-- 分页器 -->
      <div class="block">
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
    <!-- 审核弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="35%"
    >
      <el-form>
        <p style="height: 40px; line-height: 40px">审核意见：</p>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入审核意见"
          v-model="commentsContent"
        >
        </el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="(dialogFormVisible = false),(commentsContent='')">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 转让管理员 弹框 -->
    <el-dialog
      title="转让管理员"
      :visible.sync="dialog"
      width="35%"
    >
      <el-form label-width="auto" :model="dialogData">
        <div class="hintT">机构管理员需要上传被转让人的授权书并等待平台管理员的审核</div>
        <el-form-item label="授权书:">
          <el-upload
          ref='upload'
            class="avatar-uploader"
            :show-file-list="false"
            action="/index/upload"
            :auto-upload="false"
            :file-list="filelist"
            :limit="1"
            :on-change="handleChangeUpload"
            :on-progress="handleProgressUpload"
            :on-success="handleSuccessUpload"
          >
            <div>
              <el-input v-model="file.name" readonly>
                <template slot="prepend">
                  选择文件
                  <i
                    class="el-icon-upload"
                    style="color: #fff; font-size: 12px; margin-left: 2px"
                  ></i
                ></template>
              </el-input>
              <span class="hintL"
                >只能上传.doc,.docx,.pdf格式！且大小不超过10M</span
              >
            </div>
          </el-upload>
          <span class="hintR" @click="download">下载模板</span>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="applyState" :rows="2" placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="(dialog = false), (file = {}), (fileList = [])"
          >取消</el-button
        >
        <el-button type="primary" @click="authApply"
          >确认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { tableRowClassName } from "@/util/verify.js";
// import axios from "axios";
// import utils from "@/util/util.js";
import {
  getAuditList,
  getPassList,
  getRejectList,
  getPassUser,
  getRejectUser,
  getRemoveUser,
  getTransferManager,
  downloadAuthFile
} from "@/api/api";
export default {
  name: "OrganAdmin",
  watch:{
    // formInline:{
    //   handle(){
    //     if(formInline.user_name==''&&formInline.department==''&&formInline.position==''){
    //       console.log('122121212')
    //     }
    //   },
    //   deep:true
    // }  
  },
  computed:{

  },
  data() {
    return {
      tableData: [], //utils.Organlist
      page1: 1,
      page2:1,
      page3:1,
      lastPage: "",
      total: 1000,
      formInline: {
          user_name:'',
          department:'',
          position:''
      },
      activeName: "toAudit",
      currentPage1: 1,
      tabData: [
        { label: "待审核", name: "toAudit", count: 4 },
        { label: "通过", name: "auditPass", count: 0 },
        { label: "拒绝", name: "auditRefuse", count: 99 },
      ],
      dialogFormVisible: false,
      dialogTitle: "",
      commentsContent: "", //审核意见
      id:'',
      dialog:false,
      applyState:'',
       dialogData: {},
      filelist: [],
      file: {},
    };
  },

  components: {},
  methods: {
    tableRowClassName,
    // 审核通过
    handleAuditOk(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.dialogTitle = "审核通过";
      this.id = row.user_id;
      // this.$store.commit('setAuditManager',id)
    },

    // 审核不通过
    handleAuditNo(row) {
      this.dialogFormVisible = true;
      this.dialogTitle = "审核不通过";
      this.id = row.user_id;
    },
    // 移除
    removeUser(row) {
      let id = row.user_id;
      let that = this;
      console.log(id);
      this.$confirm("确认删除该用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除请求
          getRemoveUser({ userId: id }).then(function (response) {
            console.log(response);
            if (response.code == "1") {
              that.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              that.$message.error(response.des);
            }
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 转让管理员
    makeOverAdmin(row) {
      let id = row.user_id;
        this.dialog=true
    },
    // 审核弹框确定按钮
    handleOk() {
        let that=this
        let id=this.id
      if (this.dialogTitle === "审核通过") {
        getPassUser({ commentsContent: this.commentsContent, userId: id }).then(
          function (res) {
            console.log(res);
            that.dialogFormVisible=false
            that.handleAuditList()
          }
        );
      } else {
        getRejectUser({
          commentsContent: this.commentsContent,
          userId: id,
        }).then(function (res) {
            that.dialogFormVisible=false
            that.handleAuditList()
          console.log(res);
        });
      }
      
      this.commentsContent=''
      this.id=''
    },    
     // 文件状态改变时的钩子
    handleChangeUpload(file, fileList) {
      console.log(file)
      this.file = file;
      this.fileDocument=file.raw
    },
    // 文件上传时的钩子
    handleProgressUpload(event, file, fileList) {
      console.log(event, "response");
      console.log(file, "file");
      console.log(fileList, "fileList");
    },
    // 文件上传成功回调
    handleSuccessUpload(response, file, fileList) {
      console.log(response, "response");
      console.log(file, "file");
      console.log(fileList, "fileList");
    },
    // 转让申请 提交
    authApply(){
        let that=this
        let data=new FormData()
        data.append("authFile", this.fileDocument);
        data.append("target_user_id", this.id);
        data.append("trans_des", this.applyState);
        getTransferManager(data).then(function(res){
            console.log(res)
            that.dialog=false
            that.fileDocument=''
            that.id=''
            that.applyState
        })
    },
    // Tab切换
    handleTabChange(tab, event) {
      // auditPass     auditRefuse      toAudit
      this.activeName = tab.paneName;
      console.log(this.activeName);
        if(this.activeName=='auditPass'){
          this.handlePassList('1')    
          this.currentPage1=1 
          this.formInline={
          user_name:'',
          department:'',
          position:''
      }     
        }else if(this.activeName=='auditRefuse'){
          this.handleRejectList('1')
          this.currentPage1=1      
          this.formInline={
          user_name:'',
          department:'',
          position:''
      }     
        }else{
          this.handleAuditList('1')
          this.currentPage1=1      
          this.formInline={
          user_name:'',
          department:'',
          position:''
      }    
        }
    },
    // 分页器切换页
    handleCurrentChange(val) {
      console.log(`当前页:${val}`, val);
    //   toAudit   auditPass   auditRefuse
      let that = this;
      if(this.activeName==='toAudit'){
          that.page1 = `${val}`;
          that.handleAuditList(`${val}`);
      }else if(this.activeName==='auditPass'){
          that.page2 = `${val}`;
          that.handlePassList(`${val}`);
      }else{
          that.page3 = `${val}`;
          that.handleRejectList(`${val}`);
      }
            
    },
    // 条件查询--
    searchList(){
       console.log(this.formInline)
       if(this.activeName==='toAudit'){
          this.handleAuditList('1');
      }else if(this.activeName==='auditPass'){
          this.handlePassList('1');
      }else{
          this.handleRejectList('1');
      }
    },
    // 下载模板
    async download(){
      await downloadAuthFile('授权书模板.docx')   
    },
    // 待审核列表
    async handleAuditList(page) {

      let that = this;
      let data={
         user_name: this.formInline.user_name, 
         department: this.formInline.department,
         position: this.formInline.position,
         page:page,
         rows:"2"
      }
      await getAuditList(data).then(function (res) {
        console.log(res);
        that.tableData = res.data.userList.rows;
        that.total = res.data.userList.records;
        that.lastPage = res.data.userList.lastPage;
        const { auditCnt, passCnt, rejectCnt } = res.data.userStatis;
        that.tabData[0].count = auditCnt;
        that.tabData[1].count = passCnt;
        that.tabData[2].count = rejectCnt;
      });
    },
    // 通过 列表
    async handlePassList(page) {
      let that = this;
      let data={
         user_name: this.formInline.user_name, 
         department: this.formInline.department,
         position: this.formInline.position,
         page:page,
         rows:"2"
      }
      await getPassList(data).then(
        function (res) {
          that.tableData = res.data.userList.rows;
          that.total = res.data.userList.records;
          that.lastPage = res.data.userList.lastPage;
          const { auditCnt, passCnt, rejectCnt } = res.data.userStatis;
          that.tabData[0].count = auditCnt;
          that.tabData[1].count = passCnt;
          that.tabData[2].count = rejectCnt;
          console.log(res);
        }
      );
    },
    // 被拒绝--列表
    async handleRejectList(page) {
      let that = this;
      let data={
         user_name: this.formInline.user_name, 
         department: this.formInline.department,
         position: this.formInline.position,
         page:page,
         rows:"10"
      }
      await getRejectList(data).then(function (
        res
      ) {
        that.tableData = res.data.userList.rows;
        that.total = res.data.userList.records;
        that.lastPage = res.data.userList.lastPage;
        const { auditCnt, passCnt, rejectCnt } = res.data.userStatis;
        that.tabData[0].count = auditCnt;
        that.tabData[1].count = passCnt;
        that.tabData[2].count = rejectCnt;
        console.log(res);
      });
    },
  },
  created() {
    this.handleAuditList('1');
    // this.handlePassList();
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
  
  .hintT{
      width: 99%;
      border: 1px solid #f8eadd;
      color: #ff7b40;
      font-size: 12px;
      height: 32px;
      margin:0 auto;
      margin-bottom: 20px;
      line-height: 32px;
      text-align: center;
  }
  .avatar-uploader {
    position: relative;
    line-height: 64px;
    /deep/ .el-input-group__prepend {
      background: #2882fe;
      color: #fff;
    }
    /deep/ .el-upload {
      width: 100%;
    }
    .upload {
      width: 100px;
      border: 0;
      background-color: #2882fe;
      border-radius: 5px;
      color: #fff;
      height: 32px;
      line-height: 32px;
      font-size: 12px;
    }
    .hintL {
      font-size: 12px;
      color: #ccc;
      position: absolute;
      left: 0;
      top: 50px;
      line-height: 1;
    }

    .el-input__inner {
      height: 40px;
      line-height: 40px;
    }
  }
  .hintR {
    font-size: 12px;
    color: #2882fe;
    position: absolute;
    right: 0;
    top: 50px;
    cursor: pointer;
    line-height: 1;
  }
}
</style>
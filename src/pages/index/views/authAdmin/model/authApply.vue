<template>
  <div class="authApply">
    <div class="header">权限申请</div>
    <main>
      <!-- 表格 -->
      <el-table
        :row-class-name="tableRowClassName"
        :data="tableData"
        style="width: 100%; font-size: 12px"
        :row-style="{ height: '40px' }"
        :cell-style="{ padding: '0' }"
      >
        <!-- <el-table-column prop="name" align="center" label="姓名">
        </el-table-column> -->
        <el-table-column
          prop="role_name"
          label="角色名称"
          align="center"
          width="300"
          style="padding-left: 100px"
        >
        </el-table-column>
        <el-table-column prop="role_des" label="角色说明"> </el-table-column>
        <el-table-column prop="apply_status" label="状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.apply_status == 1">通过</span>
            <span v-else>拒绝</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.apply_status"
              @click="handleApply(scope.row)"
              type="text"
              size="small"
              >申请</el-button
            >
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="2"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </main>
    <!-- 申请弹框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="35%"
    >
      <el-form label-width="auto" :model="dialogData">
        <el-form-item label="申请角色:">
          {{ dialogData.role_name }}
        </el-form-item>
        <el-form-item label="角色说明:">
          {{ dialogData.role_des }}
        </el-form-item>
        <div class="line"></div>
        <el-form-item label="授权书:">
          <el-upload
            ref="upload"
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
          <span class="hintR" @click="a">下载模板</span>
        </el-form-item>
        <el-form-item label="申请说明:">
          <el-input
            type="textarea"
            v-model="applyState"
            :rows="2"
            placeholder="请输入内容"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="(dialogFormVisible = false), (file = {}), (fileList = [])"
          >取消</el-button
        >
        <el-button type="primary" @click="authApply">申请</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import utils from "@/util/util";
import { tableRowClassName } from "@/util/verify.js";
import { getRoleList, roleApply, downloadRoleFile } from "@/api/api.js";
export default {
  data() {
    return {
      tableData: [],
      page1: 1,
      currentPage1: 1,
      lastPage: "",
      total: 1000,
      dialogTitle: "申请角色",
      dialogFormVisible: false,
      dialogData: {},
      filelist: [],
      file: {},
      applyState: "",
    };
  },
  methods: {
    tableRowClassName,
    //   申请
    handleApply(row) {
      console.log(row);
      this.dialogData = row;
      this.dialogFormVisible = true;
    },
    // 文件状态改变时的钩子
    handleChangeUpload(file, fileList) {
      console.log(file);
      this.file = file;
      this.fileDocument = file.raw;
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let that = this;
      console.log(`当前页: ${val}`);
      that.page1 = `${val}`;
      that.getList(`${val}`);
    },
    // 获取权限申请列表
    async getList(page) {
      let that = this;
      let data = {
        page: page,
        rows: "2",
      };
      await getRoleList(data).then(function (res) {
        console.log(res);
        that.tableData = res.rows;
        that.total = res.records;
        that.lastPage = res.lastPage;
      });
    },
    // 角色申请
    async authApply() {
      let that = this;
      let data = new FormData();
      data.append("applyFile", this.fileDocument);
      data.append("role_id", this.dialogData.role_id);
      data.append("apply_des", this.applyState);
      await roleApply(data).then(function (res) {
        console.log(res);
        that.dialogFormVisible = false;
      });
    },
    async a() {
      await downloadRoleFile("模板.docx");
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.authApply {
  .line {
    height: 1px;
    width: 100%;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 8px;
  }
  .el-form-item {
    margin-bottom: 8px;
  }
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
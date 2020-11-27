<template>
  <div class="userDetail">
    <header>
      {{ title }}
    </header>
    <main>
      <el-form :model="searchForm" ref="searchForm" label-width="auto">
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构全称:" prop="name">
              <el-input v-model="searchForm.organ_name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构类别:" prop="name">
              <el-input v-model="searchForm.organ_type" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码:" prop="name">
              <el-input v-model="searchForm.organ_uscc" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册资本(万元):" prop="name">
              <el-input v-model="searchForm.reg_money" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人名称:" prop="name">
              <el-input
                v-model="searchForm.legal_user_name"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号:" prop="name">
              <el-input v-model="searchForm.legal_id_code" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="成立时间:" prop="name">
              <el-input v-model="searchForm.founded_date" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有效期:" prop="name">
              <el-input v-model="searchForm.valid_date" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="营业执照:" prop="name">
              <el-image
                style="width: 100px; height: 150px"
                :src="url1"
                :preview-src-list="srcList1"
              >
              </el-image>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构logo:" prop="name">
              <el-image
                style="width: 100px; height: 100px"
                :src="url2"
                :preview-src-list="srcList2"
              >
              </el-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所在部门:" prop="name">
              <el-input v-model="searchForm.department" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职务:" prop="name">
              <el-input v-model="searchForm.position" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="授权材料:" prop="name">
              <el-image
                style="width: 150px; height: 200px"
                :src="url1"
                :preview-src-list="srcList1"
              >
              </el-image>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </main>
    <div class="auditTable" v-if="type === 'detail'">
      <div class="auditTable__title">审核记录</div>
      <div class="auditTable__table">
        <el-table
          :data="tableData"
          style="width: 100%; font-size: 12px"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0' }"
        >
          <el-table-column align="center" prop="user_name" label="审核人">
          </el-table-column>
          <el-table-column
            align="center"
            prop="comments_content"
            label="审核意见"
          >
            <template slot-scope="scope">
              <el-tooltip placement="top">
                <p class="auditTable__hide--text">
                  {{ scope.row.comments_content }}
                </p>
                <div slot="content" class="name-wrapper">
                  <p>{{ scope.row.comments_content }}</p>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="create_date"
            label="审核时间"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer__btn">
      <el-button type="primary" @click="handleAudit(1)" v-if="type === 'audit'"
        >通过</el-button
      >
      <el-button type="primary" @click="handleAudit(0)" v-if="type === 'audit'"
        >拒绝</el-button
      >
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { managerDetail, auditPass, auditReject } from "@/api/api";
export default {
  components: {},
  data() {
    return {
      title: "查看",
      searchForm: {},
      rules: {
        name: [{ required: true }],
      },
      dialogTitle: "",
      dialogFormVisible: false,
      url1: "",
      url2: "",
      srcList1: [],
      srcList2: [],
      tableData: [],
      id: "",
      commentsContent: "", //审核意见
    };
  },
  created() {
    const query = this.$route.query;
    console.log(query);
    this.type = query.type;
    if (this.type === "audit") {
      this.title = "审核";
    } else {
      this.title = "查看";
    }
    // this.id=this.$store.state.auditManager
    this.id = this.$route.query.id;
    this.showUserInfo();
  },
  methods: {
    // 个人信息展示
    showUserInfo() {
      let that = this;
      managerDetail({ user_id: this.id }).then(function (res) {
        console.log(res);
        let url = that.$store.state.url;
        let a = [
          res.data.organAuthLog.organ_certificate_file,
          res.data.organAuthLog.organ_logo_file,
        ];
        let imgUrl = [];
        for (let i = 0; i < a.length; i++) {
          imgUrl.push(url + "/attach/binary?attachmentId=" + a[i]);
        }
        console.log(imgUrl);
        that.url1 = imgUrl[0];
        that.url2 = imgUrl[1];
        that.srcList1.push(imgUrl[0]);
        that.srcList2.push(imgUrl[1]);
        that.searchForm = res.data.organAuthLog;
        that.tableData = res.data.auditLog;
      });
    },
    // 返回
    goBack() {
      window.history.go(-1);
    },
    // 审核弹窗
    handleAudit(v) {
      this.dialogTitle = v ? "审核通过" : "审核不通过";
      this.commentsContent = v ? "同意" : "";
      this.dialogFormVisible = true;
    },
    handleOk() {
      let that = this;
      // 审核通过
      if (this.dialogTitle == "审核通过") {
        auditPass({
          commentsContent: this.commentsContent,
          userId: this.id,
        }).then(function (res) {
          console.log(res);
          that.$router.push({
            path: "/userAdmin/organAdmin/list",
            query: {
              activeName:auditPass,
            },
          });
        });
      } else {
        auditReject({
          commentsContent: this.commentsContent,
          userId: this.id,
        }).then(function (res) {
          console.log(res);
        });
      }
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.userDetail {
  height: 100%;
  /deep/ .el-input__inner {
    width: 90%;
    color: #000;
  }
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
    padding: 0 40px;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
  .auditTable {
    .auditTable__title {
      padding: 20px 20px 10px;
      font-weight: 600;
    }
    .auditTable__table {
      padding: 0 20px;
      .auditTable__hide--text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .footer__btn {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
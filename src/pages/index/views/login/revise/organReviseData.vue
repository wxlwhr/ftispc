<template>
  <div class="reviseData">
    <header>修改资料</header>
    <main class="tab">
      <!-- Tab1 -->
      <el-tabs type="card" class="tab_header">
        <el-tab-pane label="个人信息管理" class="changePersonal">
          <span slot="label" @click="personMsgTab">
            <span class="label">个人信息管理</span>
          </span>
          <slot name="paneContent"></slot>
          <el-form
            :model="searchForm"
            :rules="rules"
            ref="searchForm"
            class="personForm"
          >
            <el-row>
              <el-form-item label="机构:">
                <el-input v-model="organ_name" disabled></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="部门:">
                <el-input v-model="searchForm.department"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="职务:">
                <el-input v-model="searchForm.position"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="手机号:">
                <el-input v-model="phone" disabled> </el-input>
                <span class="changemobile" @click="changephonenum">变更</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="邮箱:">
                <el-input v-model="email" disabled></el-input>
                <span class="changemobile" @click="changeemail">变更</span>
              </el-form-item>
            </el-row>
            <el-row class="footer">
              <el-button>取 消</el-button>
              <el-button type="primary" @click="submit">保存</el-button>
            </el-row>
          </el-form>
        </el-tab-pane>
        <!-- Tab2 机构信息管理-->
        <el-tab-pane label="机构信息管理" class="changeOrgan">
          <span slot="label" @click="organMsgTab">
            <span class="label">机构信息管理</span>
          </span>
          <!-- ----------------- -->
          <div class="change_record">
            变更记录：<Slt
              :listParameter="changeRecord"
              class="select_box"
              @input="changeval"
              v-if="flag"
              style="width: 345px"
            ></Slt>
            <!-- <el-button type="primary" icon="el-icon-search" @click="searchRecord">查询</el-button> -->
          </div>
          <div class="basic_information">
            <div class="basic_title">基本信息</div>
            <el-form
              :model="unAccreditOrganform"
              :rules="rules"
              ref="organ_form"
              label-width="130px"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="统一社会信用代码:" prop="name">
                    <el-input
                      placeholder="请输入"
                      class="organ_uscc"
                      v-model="unAccreditOrganform.organ_uscc"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="机构全称:" prop="name">
                    <el-input
                      placeholder="请输入"
                      class="organ_name"
                      v-model="unAccreditOrganform.organ_name"
                      clearable
                      autofocus
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="机构类别:" prop="name">
                    <Slt
                      :listParameter="organ_type2"
                      @input="organValue"
                      :select-value="unAccreditOrganform.organ_type"
                      class="select_box"
                      v-if="flag2"
                    ></Slt>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="注册资本(万元):" prop="name">
                    <el-input
                      placeholder="请输入"
                      class="reg_money"
                      v-model="unAccreditOrganform.reg_money"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="法人姓名:" prop="name">
                    <el-input
                      placeholder="请输入"
                      class="legal_user_name"
                      v-model="unAccreditOrganform.legal_user_name"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="法人身份证号:" prop="name">
                    <el-input
                      placeholder="请输入"
                      class="legal_id_code"
                      v-model="unAccreditOrganform.legal_id_code"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="成立时间:" prop="name">
                    <el-input
                      placeholder="请输入"
                      class="founded_date"
                      v-model="unAccreditOrganform.founded_date"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="有效期:" prop="name">
                    <el-date-picker
                      v-model="unAccreditOrganform.valid_date"
                      class="valid_date"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      style="width: 100%"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="座机:" prop="name">
                    <el-input
                      placeholder="请输入"
                      class="special_plane"
                      v-model="unAccreditOrganform.telephone"
                      clearable
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    prop="organ_certificate"
                    label="营业执照:"
                    style="height: 100%"
                    ref="uploadElement"
                  >
                    <el-upload
                      class="avatar-uploader"
                      :show-file-list="false"
                      action="/index/upload"
                      :before-upload="beforeUpload"
                      :on-change="handleChange"
                      :auto-upload="false"
                      :data="unAccreditOrganform"
                    >
                      <img
                        v-if="unAccreditOrganform.organ_certificate_file"
                        :src="img1"
                        id="img1"
                        class="avatar"
                      />
                      <div class="img_box" v-else>
                        <div class="organ_certificate">
                          选择文件<i
                            class="el-icon-upload"
                            style="
                              color: #fff;
                              font-size: 12px;
                              margin-left: 2px;
                            "
                          ></i>
                        </div>
                        <!-- <span class="hint"
                          >只能上传.jpg,.png格式！且不超过10M</span
                        > -->
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="机构logo:" prop="name">
                    <el-upload
                      class="avatar-uploader"
                      :show-file-list="false"
                      action="/index/upload"
                      :before-upload="beforeUpload"
                      :on-change="handleChangeLogo"
                      :auto-upload="false"
                      :data="unAccreditOrganform"
                    >
                      <img
                        v-if="unAccreditOrganform.organ_logo_file"
                        :src="img2"
                        class="avatar_logo"
                      />

                      <div class="img_box" v-else>
                        <div class="organ_certificate">
                          选择文件<i
                            class="el-icon-upload"
                            style="
                              color: #fff;
                              font-size: 12px;
                              margin-left: 2px;
                            "
                          ></i>
                        </div>
                        <!-- <span class="hint"
                          >只能上传.jpg,.png格式！且不超过10M</span
                        > -->
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="auditTable">
            <div class="auditTable__title">审核记录</div>
            <div class="auditTable__table">
              <el-table
                :data="tableData"
                style="width: 100%; font-size: 12px"
                :row-style="{ height: '40px' }"
                :cell-style="{ padding: '0' }"
              >
                <el-table-column align="center" prop="name" label="审核人">
                </el-table-column>
                <el-table-column align="center" prop="address" label="审核意见">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>{{ scope.row.address }}</p>
                      <div slot="reference" class="name-wrapper">
                        <p class="auditTable__hide--text">
                          {{ scope.row.address }}
                        </p>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="date"
                  label="审核时间"
                ></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="footer__btn">
            <el-button type="primary" @click="handleApplyChange"
              >申请变更</el-button
            >
          </div>
          <!-- ----------------- -->
        </el-tab-pane>
      </el-tabs>

      <!-- 弹出框 -->
      <el-dialog
        v-model="dialogForm"
        :title="dialogForm.title"
        :visible.sync="dialogFormVisible"
        class="dialog_box"
        width="37%"
      >
        <el-form :model="changeform">
          <el-form-item
            :label="dialogForm.row1 + ':'"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="changeform.olddata"
              autocomplete="off"
              :placeholder="dialogForm.row1"
              class="mobile_input"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" :label-width="formLabelWidth">
            <el-input
              v-model="changeform.passwd"
              autocomplete="off"
              placeholder="密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="dialogForm.row3 + ':'"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="changeform.newdata"
              autocomplete="off"
              :placeholder="dialogForm.row3"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码:" :label-width="formLabelWidth">
            <el-input
              v-model="changeform.code"
              autocomplete="off"
              placeholder="短信验证码"
            >
              <template slot="append"
                ><span class="sendCode" @click="sendcode"
                  >发送验证码</span
                ></template
              >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitChangeData">确 定</el-button>
        </div>
      </el-dialog>
    </main>
  </div>
</template>

<script>
import {
  getRealnameOrganInfo,
  getRealnameOrganOption,
  changephonenum,
  changeemail,
  changephonenumvericode,
  changeemailvericode,
  changeUserIfor,
  getSltChangeData,
  getOrganInfo,
  getApplyChange,
  getSelectData,
} from "@/api/api";
export default {
  data() {
    return {
      phone: "",
      email: "",
      organ_id: "",
      searchForm: {
        department: "",
        position: "",
      },
      rules: {},
      dialogFormVisible: false,
      changeform: {
        olddata: "",
        passwd: "",
        newdata: "",
        code: "",
      },
      formLabelWidth: "80px",
      codetype: "1",
      dialogForm: {
        title: "",
        row1: "",
        row3: "",
      },
      organ_name: "",
      organ_arr: [],
      // 机构信息变更
      unAccreditOrganform: {
        organ_uscc: "", //统一社会信用代码
        organ_type: "", //机构类型
        organ_name: "", //机构全称
        reg_money: "", //注册资本
        legal_user_name: "", //法人姓名
        legal_id_code: "", //法人身份证号
        founded_date: "", //成立时间
        valid_date: "", //有效期
        telephone: "", //座机
        organ_certificate: "", //营业执照
        organ_logo: "", //机构logo
        organ_certificate_file:'',  //营业执照(旧)
        organ_logo_file:'', //机构logo(旧)
      },
      organ_type2: [], //下拉框数据
      dialogImageUrl: false, // 图片,
      dialogVisible: false,
      disabled: false,
      img1: "",
      img2: "",
      downloadhttp: "",
      flag: false,
      tableData: [],
      // change_id:'',
      changeRecord: [], //变更记录
      flag2: false,
    };
  },
  computed: {},
  watch: {
    dialogFormVisible(oldval, newval) {
      // console.log(oldval,newval)
      if (oldval === false && newval === true) {
        this.changeform = {
          olddata: "",
          passwd: "",
          newdata: "",
          code: "",
        };
      }
    },
  },
  methods: {
    // 个人信息修改--提交
    submit() {
      let that = this;
      console.log(this.searchForm);
      changeUserIfor(this.searchForm).then(function (response) {
        if (response.code == "1") {
          if (response.des == "用户信息修改成功") {
            // that.$store.commit("setUserIfor", that.searchForm);
            that.$message.success(response.des);
          }
        } else {
          that.$message.error(response.des);
        }
        console.log(response);
      });
    },
    //  手机修改弹窗
    changephonenum() {
      this.dialogForm = {
        title: "手机号变更",
        row1: "手机号",
        row3: "新手机号",
      };
      this.dialogFormVisible = true;
      this.codetype = "1";
    },
    // email 修改弹窗
    changeemail() {
      this.dialogForm = {
        title: "邮箱变更",
        row1: "邮箱",
        row3: "新邮箱",
      };
      this.dialogFormVisible = true;
      this.codetype = "2";
    },
    // 发送验证码
    sendcode() {
      if (this.codetype === "1") {
        // 手机号短信
        changephonenumvericode({ mobile: this.changeform.newdata }).then(
          function (response) {
            console.log(response);
          }
        );
      } else {
        // email短信
        changeemailvericode({ email: this.changeform.newdata }).then(function (
          response
        ) {
          console.log(response);
        });
      }
    },
    // 个人信息修改--弹出框内容提交
    submitChangeData() {
      this.dialogFormVisible = false;
      let data = {
        newMobile: this.changeform.newdata,
        oldMobile: this.changeform.olddata,
        passwd: this.changeform.passwd,
        verifyCode: this.changeform.code,
      };
      let data2 = {
        newEmail: this.changeform.newdata,
        oldEmail: this.changeform.olddata,
        passwd: this.changeform.passwd,
        verifyCode: this.changeform.code,
      };

      if (this.codetype == "2") {
        changeemail(data2).then(function (response) {
          console.log(response);
        });
      } else {
        changephonenum(data).then(function (response) {
          console.log(response);
        });
      }

      console.log(data);
    },
    // 个人信息回显
    async getuserIfor() {
      let that = this;
      await getRealnameOrganOption().then(function (res) {
        that.organ_arr = res.data.organOption;
      });
      await getRealnameOrganInfo().then(function (res) {
        console.log(res);
        that.organ_id = res.data.user.organ_id;
        that.searchForm.department = res.data.user.department;
        that.searchForm.position = res.data.user.position;
        that.phone = res.data.user.mobile;
        that.email = res.data.user.email;
      });
      for (let i = 0; i < this.organ_arr.length; i++) {
        if (this.organ_arr[i].value === this.organ_id) {
          console.log(this.organ_arr[i].label);
          this.organ_name = this.organ_arr[i].label;
        }
      }
    },
    // tab切换--个人信息修改
    personMsgTab() {
      console.log("geren个人信息变更");
    },
    // tab切换--机构信息修改
    organMsgTab() {
      let that = this;
      this.getorganInfor();
    },
    // 提交机构变更信息--表单
    handleApplyChange() {
      let that=this
       let data = new FormData();
      data.append("organ_uscc", this.unAccreditOrganform.organ_uscc);
      data.append("organ_type", this.unAccreditOrganform.organ_type);
      data.append("organ_name", this.unAccreditOrganform.organ_name);
      data.append("reg_money", this.unAccreditOrganform.reg_money);
      data.append("legal_user_name", this.unAccreditOrganform.legal_user_name);
      data.append("legal_id_code", this.unAccreditOrganform.legal_id_code);
      data.append("founded_date", this.unAccreditOrganform.founded_date);
      data.append("valid_date", this.unAccreditOrganform.valid_date);
      data.append(
        "organ_certificate",
        this.unAccreditOrganform.organ_certificate
      );
      data.append("organ_logo", this.unAccreditOrganform.organ_logo);
      data.append(
        "organ_certificate_file",
        this.unAccreditOrganform.organ_certificate_file
      );
      data.append("organ_logo_file", this.unAccreditOrganform.organ_logo_file);
      data.append("telephone", this.unAccreditOrganform.telephone);
      getApplyChange(data).then(function(res){
        console.log(res)
        if(res.code=='1'){
          that.$message({
              message: "提交成功",
              type: "success",
            });
        }else if(res.code==='3'){
          that.$message({
            message:res.des,
             type: 'warning'
          })
        }else{
          that.$message({
            message:res.des
          })
        }
      })
    },
    // 营业执照--上传事件
    handleChange(file, fileList) {
      console.log(file, fileList);
      this.unAccreditOrganform.organ_certificate = file.raw;
      this.img1 = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      return true;
    },
    // Logo--上传事件
    handleChangeLogo(file, fileList) {
      console.log(file)
      this.unAccreditOrganform.organ_logo = file.raw;
      this.img2 = URL.createObjectURL(file.raw);
      console.log(this.img2)
    },

    // 变更时间点
    changeval(val) {
      console.log(val)
      // this.change_id=val
      this.getorganInfor(val)
    },
    // 点击查询，把变更时间框对应的value传给后端
    // searchRecord(){

    //   let val=this.change_id
    //   console.log(val)
    //   this.getorganInfor(val)
    // },
    // 机构类型选择
    organValue() {
      let that = this;
    },

    // 获取记录下拉框内容
    async getSelectRecord() {
      let that = this;
      await getSltChangeData().then(function (res) {
        if (res.code == "1") {
          that.changeRecord = res.data.changeOption;
          that.flag = true;
        }
        console.log(res);
      });
      // 机构类型下拉框数据请求
      await getSelectData(["ORGAN_TYPE"]).then(function (response) {
        that.organ_type2 = response[0].ORGAN_TYPE;
        console.log(response);
      });
    },
    // 获取机构信息
    async getorganInfor(change_id) {
      let that = this;
      await getOrganInfo({changeId:change_id}).then(function (res) {
        that.unAccreditOrganform = res.data.organ;
        that.unAccreditOrganform.organ_certificate_file =
          res.data.organ.organ_certificate_file;
        that.unAccreditOrganform.organ_logo_file = res.data.organ.organ_logo_file;

        let url = that.$store.state.url;
        let attachmentId = [
          res.data.organ.organ_certificate_file,
          res.data.organ.organ_logo_file,
        ];
        let imgUrl = [];
        for (let i = 0; i < attachmentId.length; i++) {
          imgUrl.push(url + "/attach/binary?attachmentId=" + attachmentId[i]);
        }
          console.log(imgUrl);
        that.img1 = imgUrl[0]
        that.img2 = imgUrl[1]
        
        that.flag2 = true;
        console.log(res);
      });
    },
    // 获取图片base64
    getimgUrl() {
      let url = this.$store.state.url;
      let attachmentId = res.data.organ.organ_certificate_file;
      let imgUrl = url + "/attach/base64?attachmentId=" + attachmentId;
      this.img1 = imgUrl;
    },
  },
  created() {
    let that = this;
    this.getuserIfor();
    this.getSelectRecord();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.reviseData {
  background: #fff;
  header {
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
  }
  //   .el-input {
  //     height: 42px;
  //   }
  main {
    /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none;
    }
    /deep/ .el-tabs__item {
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
      background-color: #e8ecf0;
      margin-top: 24px;
      margin-left: 15px;
    }
    /deep/ .is-active {
      background: #2882fe;
      .label {
        color: #fff;
      }
    }

    .changePersonal {
      margin: auto;
      width: 500px;
      text-align: end;
      .el-input {
        height: 42px;
        width: 440px;
      }
      /deep/ .el-input.is-disabled .el-input__inner {
        background-color: #eef1f5;
        color: #3c4b5e;
      }
      .changemobile {
        width: 28px;
        font-size: 14px;
        color: #2882fe;
        cursor: pointer;
        position: absolute;
        right: 12px;
      }
    }
    .changeOrgan {
      width: 96%;
      margin-left: 2%;
      // /deep/ .el-input__inner {
      //   width: 90%;
      // }
      .change_record {
        height: 40px;
        line-height: 40px;
        margin: 15px 0;
        display: flex;
        .el-button {
          width: 70px;
          height: 34px;
          line-height: 34px;
          padding: 0;
          margin-top: 3px;
          margin-left: 25px;
        }
      }
      .basic_information {
        position: relative;
        .basic_title {
          position: absolute;
          top: -10px;
          // left: 80px;
          background-color: #fff;
        }

        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 0 30px;
        margin-top: 20px;
        padding-top: 20px;
        /deep/ .el-upload {
          width: 100px;
          height: 32px;
          .img_box {
            width: 208px;
            .organ_certificate {
              width: 100px;
              border: 0;
              background-color: #2882fe;
              border-radius: 5px;
              // border-bottom-left-radius: 6px;
              color: #fff;
              height: 32px;
              line-height: 32px;
              font-size: 12px;
            }
            .hint {
              width: 208px;
              height: 16px;
              font-size: 12px;
              color: #ccc;
              position: absolute;
              left: 110px;
              top: 9px;
            }
          }
        }
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
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar {
        width: 110px;
        height: 160px;
        margin-right: 300px;
      }
      .avatar_logo {
        width: 110px;
        height: 110px;
        margin-right: 300px;
      }
    }
    .dialog_box {
      .el-input {
        width: 420px;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .el-button {
      width: 60px;
      height: 32px;
      font-size: 12px;
      padding: 0;
    }
    .el-button:nth-child(2) {
      margin-left: 20px;
    }
  }
}
</style>
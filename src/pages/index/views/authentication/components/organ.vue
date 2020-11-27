<template>
  <div class="wrapper">
    <!-- 机构实名认证 -->
    <el-form
      :model="organform"
      :rules="rules"
      ref="organform"
      class="organ_form"
      style="margin-top: 18px"
      label-width="auto"
      v-if="showForm === '1'"
    >
      <el-row>
        <el-form-item prop="organId" label="已实名认证机构:">
          <!-- <el-select v-model="value" filterable placeholder="--请选择--">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
          <Slt
            :listParameter="organOption"
            class="select_box"
            @input="organOptionValue"
            :select-value="organform.organId"
            v-if="flag"
          ></Slt>
        </el-form-item>
        <span class="organ_unAccredit" @click="handleToOrganAuthentication"
          >机构未认证</span
        >
      </el-row>

      <el-row>
        <el-form-item prop="department" label="所在部门:">
          <el-input
            placeholder="请输入"
            class="department"
            v-model="organform.department"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="position" label="职务:">
          <el-input
            placeholder="请输入"
            class="position"
            v-model="organform.position"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="telephone" label="座机:">
          <el-input
            placeholder="请输入"
            class="special_plane"
            v-model.number="organform.telephone"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button
            class="apply_btn"
            type="primary"
            @click="applyForOrgan('organform')"
            >机构授权申请</el-button
          >
        </el-form-item>
      </el-row>
    </el-form>

    <!-- 未认证机构资料上传 -->
    <el-form
      :model="unAccreditOrganform"
      :rules="rules"
      ref="unorganform"
      class="organ_form"
      style="margin-top: 18px"
      label-width="auto"
      v-else-if="showForm === '2'"
    >
      <el-row>
        <el-form-item prop="organ_uscc" label="统一社会信用代码:">
          <el-input
            placeholder="请输入"
            class="organ_uscc"
            v-model="unAccreditOrganform.organ_uscc"
            clearable
            autofocus
          >
          </el-input>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item prop="organ_type" label="机构类型:">
          <Slt
            :listParameter="organ_type2"
            @input="organValue"
            :select-value="unAccreditOrganform.organ_type"
            class="select_box"
            v-if="flag"
          ></Slt>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item prop="organ_name" label="机构全称:">
          <el-input
            placeholder="请输入"
            class="organ_name"
            v-model="unAccreditOrganform.organ_name"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="reg_money" label="注册资本（万元）:">
          <el-input
            placeholder="请输入"
            class="reg_money"
            v-model="unAccreditOrganform.reg_money"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="legal_user_name" label="法人姓名:">
          <el-input
            placeholder="请输入"
            class="legal_user_name"
            v-model="unAccreditOrganform.legal_user_name"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="legal_id_code" label="法人身份证号:">
          <el-input
            placeholder="请输入"
            class="legal_id_code"
            v-model="unAccreditOrganform.legal_id_code"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="founded_date" label="成立时间:">
          <el-input
            placeholder="请输入"
            class="founded_date"
            v-model="unAccreditOrganform.founded_date"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="valid_date" label="有效期:">
          <el-date-picker
            v-model="unAccreditOrganform.valid_date"
            class="valid_date"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
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
              v-if="unAccreditOrganform.organ_certificate"
              :src="img1"
              class="avatar"
            />
            <div class="img_box" v-else>
              <div class="organ_certificate">
                选择文件<i
                  class="el-icon-upload"
                  style="color: #fff; font-size: 12px; margin-left: 2px"
                ></i>
                <!-- <span>只能上传.jpg,.png格式！且不超过10M</span> -->
              </div>
              <span class="hint">只能上传.jpg,.png格式！且不超过10M</span>
            </div>
          </el-upload>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="organ_logo" label="机构logo:">
          <!-- <el-input
            placeholder="请输入"
            class="organ_logo"
            v-model="unAccreditOrganform.organ_logo"
            clearable
          >
          </el-input> -->
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
              v-if="unAccreditOrganform.organ_logo"
              :src="img2"
              class="avatar_logo"
            />

            <div class="img_box" v-else>
              <div class="organ_certificate">
                选择文件<i
                  class="el-icon-upload"
                  style="color: #fff; font-size: 12px; margin-left: 2px"
                ></i>
                <!-- <span>只能上传.jpg,.png格式！且不超过10M</span> -->
              </div>
              <span class="hint">只能上传.jpg,.png格式！且不超过10M</span>
            </div>
          </el-upload>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="department" label="所在部门:">
          <el-input
            placeholder="请输入"
            class="department"
            v-model="unAccreditOrganform.department"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="position" label="职务:">
          <el-input
            placeholder="请输入"
            class="position"
            v-model="unAccreditOrganform.position"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="telephone" label="座机:">
          <el-input
            placeholder="请输入"
            class="special_plane"
            v-model="unAccreditOrganform.telephone"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="auth_material" label="授权资料:">
          <!-- <el-input
            placeholder="请输入"
            class="auth_material"
            v-model="unAccreditOrganform.auth_material"
            clearable
          >
          </el-input> -->
          <el-upload
            ref="upload"
            :limit="1"
            :on-remove="handleRemove"
            :on-error="onError"
            :file-list="fileList"
            :auto-upload="false"
            :http-request="uploadFile"
            action="url"
            class="upload-demo"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
              style="background-color: #2882fe"
              >选取文件<i class="el-icon-upload el-icon--right"></i
            ></el-button>
            <!-- <a class='download' :href='downloadhttp' download="downloadhttp"  title="下载">模板下载</a> -->
            <span @click="download">模板下载</span>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
            <div slot="tip" class="el-upload__tip">
              支持上传 {{ fileType }} 格式，且不超过 {{ fileSize }}M
            </div>
          </el-upload>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button
            class="apply_btn"
            type="primary"
            @click="applyForRealNameAuth('unAccreditOrganform')"
            >申请企业实名认证</el-button
          >
        </el-form-item>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import {
  getSelectData,
  getRealnameOrganOption,
  getRealnameOrganInfo,
  getRealnameOrgan,
  getRealnamePersonalOrgan,
  getRealnameAuthtemplate,
  downloadFile,
  getRealnameOrganLastlog,
} from "@/api/api.js";
import {
    unvalidateOrganUscc,
    unvalidateOrganType,
    unvalidateOrganName,
    unvalidateOrganMoney,
    unvalidateLegalname,
    unvalidateLegalcode,
    unvalidateAuthmaterial,
    unvalidateFounddate,
    unvalidateValid,
    unvalidateCertificate,
    unvalidateLogo,
    unvalidateDepartment,
    unvalidatePosition,
    unvalidateTelephone,
} from "./unOrganreg.js"
export default {
  name: "organ",
  props: {
    pagetype: Object,
  },
  watch: {
    unAccreditOrganform() {},
  },
  data() {
    const validateOrganId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择机构"));
      } else {
        callback();
      }
    };
    const validateDepartment = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入所在部门"));
      } else {
        callback();
      }
    };
    const validatePosition = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入职务"));
      } else {
        callback();
      }
    };
    const validateTelephone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入座机"));
      } else {
        callback();
      }
    };
    return {
      showForm: "1",
      organform: {
        organId: "",
        department: "",
        position: "",
        telephone: "",
      },
      unAccreditOrganform: {
        organ_uscc: "", //统一社会信用代码
        organ_type: "", //机构类型
        organ_name: "", //机构全称
        reg_money: "", //注册资本
        legal_user_name: "", //法人姓名
        legal_id_code: "", //法人身份证号
        founded_date: "", //成立时间
        valid_date: "", //有效期
        organ_certificate: "", //营业执照
        organ_logo: "", //机构logo
        department: "", //所在部门
        position: "", //职务
        telephone: "", //座机
        auth_material: "", //授权材料
      },
      rules: {
        organId: [
          { required: true, validator: validateOrganId, trigger: "blur" },
        ],
        department: [
          { required: true, validator: validateDepartment, trigger: "blur" },
        ],
        position: [
          { required: true, validator: validatePosition, trigger: "blur" },
        ],
        telephone: [
          { required: true, validator: validateTelephone, trigger: "blur" },
          {
            min: 3,
            max: 11,
            message: "长度在 3 到 11 个数字",
            trigger: "blur",
          },
        ],
        organ_uscc: [
          { required: true, validator: unvalidateOrganUscc, trigger: "blur" },
        ],
        organ_type: [
          { required: true, validator: unvalidateOrganType, trigger: "blur" },
        ],
        organ_name: [
          { required: true, validator: unvalidateOrganName, trigger: "blur" },
        ],
        reg_money: [
          { required: true, validator: unvalidateOrganMoney, trigger: "blur" },
        ],
        legal_user_name: [
          { required: true, validator: unvalidateLegalname, trigger: "blur" },
        ],
        legal_id_code: [
          { required: true, validator: unvalidateLegalcode, trigger: "blur" },
        ],
        founded_date: [
          { required: true, validator: unvalidateFounddate, trigger: "blur" },
        ],
        valid_date: [
          { required: true, validator: unvalidateValid, trigger: "blur" },
        ],
        organ_certificate: [
          { required: true, validator: unvalidateCertificate, trigger: "blur" },
        ],
        organ_logo: [
          { required: true, validator: unvalidateLogo, trigger: "blur" },
        ],        
        auth_material: [
          { required: true, validator: unvalidateAuthmaterial, trigger: "blur" },
        ],
      },
      rulesUnauth: {
        
      },
      organ_type2: [], //下拉框数据
      organOption: [], //已有企业下拉列表
      dialogImageUrl: false, // 图片,
      dialogVisible: false,
      disabled: false,
      img1: "",
      img2: "",
      // 附件列表
      fileList: [],
      // 允许的文件类型
      fileType: [
        "xls",
        "xlsx",
        "pdf",
        "doc",
        "docx",
        "txt",
        "jpg",
        "png",
        "jpeg",
      ],
      // 运行上传文件大小，单位 M
      fileSize: 10,
      downloadhttp: "",
      flag: false,
    };
  },
  computed: {},

  methods: {
    applyForOrgan(organform) {
      let that = this;
      console.log(this.organform);
      this.$refs[organform].validate((valid) => {
        if (valid) {
          getRealnamePersonalOrgan(that.organform).then(function (res) {
            console.log(res);
            if (res.code == "1") {
              that.$emit("changeActive", 3);
              that.$message({
                message: "提交成功",
                type: "success",
              });
            } else {
              this.$message.error(res.des);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 已有企业下拉框 value
    organOptionValue(val) {
      console.log(val);
      this.organform.organId = val;
    },
    // 显示新增企业信息页面
    handleToOrganAuthentication() {
      this.showForm = "2";
      // if (this.showForm == "2") {
      this.getselectList();
      // }
    },
    // 新增企业信息页面下拉框数据
    getselectList() {
      let that = this;
      getSelectData(["ORGAN_TYPE"]).then(function (response) {
        that.organ_type2 = response[0].ORGAN_TYPE;
        console.log(response);
      });
    },
    // 未注册机构---机构类型
    organValue(val) {
      console.log(val);
      this.unAccreditOrganform.organ_type = val;
    },
    applyForRealNameAuth() {
      console.log(this.unAccreditOrganform);
      // this.$refs[unAccreditOrganform].validate((valid) => {
      //   if (valid) {
      // 
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      this.submitUpload();
      let that = this;
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
      data.append("department", this.unAccreditOrganform.department);
      data.append("position", this.unAccreditOrganform.position);
      data.append("telephone", this.unAccreditOrganform.telephone);
      data.append("auth_material", this.unAccreditOrganform.auth_material);

      getRealnameOrgan(data).then(function (res) {
        console.log(res);
        if (res.code == "1") {
          that.$emit("changeActive", 3);
          that.$message({
            message: res.des,
            type: "success",
          });
        } else {
          that.$message.error(res.des);
        }
      });
    },

    // 图片中的函数--删除
    handleRemove(file) {
      console.log(file);
    },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // 图片中的函数--下载
    // handleDownload(file) {
    //   console.log(file);
    // },
    handleChange(file, fileList) {
      console.log(file, fileList);
      this.unAccreditOrganform.organ_certificate = file.raw;
      this.img1 = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      return true;
    },
    handleChangeLogo(file, fileList) {
      this.unAccreditOrganform.organ_logo = file.raw;
      this.img2 = URL.createObjectURL(file.raw);
    },
    // 附件检查
    // 检查附件是否属于可上传类型
    // 检查附件是否超过限制大小
    checkFile() {
      var flag = true;
      var tip = "";
      var files = this.$refs.upload.uploadFiles;
      files.forEach((item) => {
        // 文件过大
        if (item.size > this.fileSize * 1024 * 1024) {
          flag = false;
          tip = " 文件超过" + this.fileSize + "M";
        }
        // 文件类型不属于可上传的类型
        if (!this.fileType.includes(lastSubstring(item.name, "."))) {
          flag = false;
          tip = " 文件类型不可上传";
        }
      });
      if (!flag) {
        message("error", tip);
      }
      return flag;
    },
    // 自定义文件上传方法
    uploadFile(file) {
      console.log(file);
      // 把文件放入 FormData 进行提交
      // const param = new FormData();
      // param.append("files", file.file);
      this.unAccreditOrganform.auth_material = file.file;
    },
    submitUpload(file, fileList) {
      console.log(file, fileList);
      this.$refs.upload.submit();
    },
    // 移除附件
    handleRemove(file, fileList) {
      console.log("移除附件...");
    },
    // 附件上传失败，打印下失败原因
    onError(err) {
      message("error", "附件上传失败");
      console.log(err);
    },
    // 字符串重组
    strRebuild(str) {
      return strRebuild(str);
    },
    //模板下载，后端配置好地址，只需要用a标签下载即可
    download() {
      downloadFile("模板.docx");
    },
  },
  async created() {
    let that = this;
    if (this.showForm === "1") {
      await getRealnameOrganOption().then(function (res) {
        if (res.code == "1") {
          that.organOption = res.data.organOption;
          that.flag = true;
        }
        console.log(res);
      });
    }

    // 审核失败 -- 信息回显
    if (this.pagetype.type == "change" && this.pagetype.formList == "2") {
      this.handleToOrganAuthentication();
      // 新建机构实名认证 信息回显
      await getRealnameOrganLastlog().then(function (res) {
        console.log(res);
        that.unAccreditOrganform = res.data.organ;
        that.flag = true;
      });
    } else if (this.pagetype.type == "change") {
      this.showForm = "1";
      //已有机构实名认证 信息回显
      await getRealnameOrganInfo().then(function (res) {
        // that.organform.organId=res.data.user.organ_id
        // that.organform.department=res.data.user.department
        // that.organform.position=res.data.user.position
        // that.organform.telephone=res.data.user.telephone
        console.log(res);
        that.organform = res.data.user;
        that.$store.commit("setUserIfor", res.data.user);
        that.flag = true;
      });
    }
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.wrapper {
  // margin: auto;
  .el-form {
    margin-bottom: 20px;
  }
  .select_box {
    width: 420px;
    height: 100%;
    /deep/ .el-input {
      height: 45px;
      width: 100%;
    }
  }

  .organ_unAccredit {
    font-size: 14px;
    color: #2882fe;
    position: absolute;
    top: 34px;
    right: 255px;
    cursor: pointer;
  }
  .el-form-item {
    width: 560px;
    // height: 45px;
    margin: 20px auto;
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
  .el-input,
  .el-select {
    width: 420px;
    height: 45px;
  }

  .apply_btn {
    width: 420px;
    height: 45px;
    background-color: #2882fe;
    color: #fff;
    font-size: 16px;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
  }
  // .avatar-uploader .el-upload {
  //   border: 1px dashed #d9d9d9;
  //   border-radius: 6px;
  //   cursor: pointer;
  //   position: relative;
  //   overflow: hidden;
  // }
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
</style>
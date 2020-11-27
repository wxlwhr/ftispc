<template>
  <div class="wrapper">
    <el-dialog title="新增角色" :visible.sync="visibleRole" width="35%">
    <el-form ref="ruleForm" :model="ruleForm" label-width="auto" status-icon :rules="rules">
      <el-form-item prop="role_bel_type" placeholder="请输入" label="角色所属:">
          <Slt :listParameter="roleBelType" class="select_box" v-model="ruleForm.role_bel_type"></Slt>
      </el-form-item>
      <el-form-item prop="role_name" label="角色名:">
        <el-input placeholder="请输入" v-model="ruleForm.role_name" clearable></el-input>
      </el-form-item>
      <el-form-item prop="role_des" label="角色描述:">
        <el-input placeholder="请输入" type="textarea" v-model="ruleForm.role_des" clearable></el-input>
      </el-form-item>
      <el-form-item prop="role_update" label="授权书模板:">

        <el-upload ref="upload" :limit="1" :on-remove="handleRemove" :on-exceed="listMax" :on-error="onError" :file-list="fileList"
          :auto-upload="false" :http-request="uploadFile" action="url" class="upload-demo">
          <el-button slot="trigger" size="small" type="primary" style="background-color:#2882fe">选取文件<i class="el-icon-upload el-icon--right"></i></el-button>
          <div slot="tip" class="el-upload__tip">
            支持上传 {{ fileType }} 格式，且不超过 {{ fileSize }}M
          </div>
        </el-upload>

      </el-form-item>
      <el-form-item prop="is_open" label="是否公开:">
        <el-radio-group v-model="ruleForm.is_open">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="audit_type" label="审批模式:">
        <Slt :listParameter="auditType" class="select_box" v-model="ruleForm.audit_type"></Slt>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visibleRole = false">取 消</el-button>
      <el-button type="primary" @click="addRole()" >确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { addOrgRole,getSelectData } from "@/api/api.js";
export default {
  name: "Role",
  components: {},
  data() {
    const validateRoleBelType = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择角色所属"));
      } else {
        callback();
      }
    };
    const validateRoleName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入角色名"));
      } else {
        callback();
      }
    };
    const validateRoleDes = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入角色描述"));
      } else {
        callback();
      }
    };
    const validateIsOpen = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择是否公开"));
      } else {
        callback();
      }
    };
    const validateaAuditType = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择审批模式"));
      } else {
        callback();
      }
    };
    return {
      ruleForm:{
        role_bel_type:"",
        role_name:"",
        role_des:"",
        is_open:"",
        audit_type:""
      },
      auth_material_file:"",
      fileList: [],
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
      roleBelType:[],
      auditType:[],
      visibleRole:false,

      // 运行上传文件大小，单位 M
      fileSize: 10,
      rules: {
        role_bel_type: [
          { required: true, validator: validateRoleBelType, trigger: "blur" },
        ],
        role_name: [
          { required: true, validator: validateRoleName, trigger: "blur" },
        ],
        role_des: [
          { required: true, validator: validateRoleDes, trigger: "blur" },
        ],
        is_open: [
          { required: true, validator: validateIsOpen, trigger: "blur" },
        ],
        audit_type: [
          { required: true, validator: validateaAuditType, trigger: "blur" },
        ]
      },
    };
  },
  mounted: function () {
    let that = this;
    getSelectData(["ROLE_BEL_TYPE","ROLE_AUDIT_TYPE"]).then(function (response) {
      that.roleBelType = response[0].ROLE_BEL_TYPE
      that.auditType = response[1].ROLE_AUDIT_TYPE
    })
  },
  methods: {
    addRole(){
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.submitUpload()
          let data = new FormData();
          data.append("role_bel_type", this.ruleForm.role_bel_type);
          data.append("role_name", this.ruleForm.role_name);
          data.append("role_des", this.ruleForm.role_des);
          data.append("is_open", this.ruleForm.is_open);
          data.append("audit_type", this.ruleForm.audit_type);
          data.append("auth_material_file", this.auth_material_file);
          addOrgRole(data).then( (response)=> {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.$emit('getorganrole')
          })
          this.visibleRole = false;
        } else {
          return false;
        }
      })
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
    onError(err) {
      message("error", "附件上传失败");
      console.log(err);
    },
    uploadFile(file) {
      this.auth_material_file = file.file;
    },
    submitUpload(file,fileList) {
      this.$refs.upload.submit();
    },
    listMax(){
      this.$message({
        type: "error",
        message: "最多只可选择一条上传!",
      });
    },
    handleRemove(file, fileList) {
      console.log("移除附件...");
    },
    handlexsyc(){
      this.visibleRole=true
    }
  },
};
</script>
<style lang="scss" scoped>
// .wrapper{}
</style>

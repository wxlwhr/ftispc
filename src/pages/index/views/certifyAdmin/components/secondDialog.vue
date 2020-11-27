<template>
   <div class="wrapper">
       <!-- 弹出框 -->
      <el-dialog
        v-model="addForm"
        title="新增"
        :visible.sync="dialogFormVisible"
        class="dialog_box"
        width="37%"
      >
        <el-form ref="addForm" :model="addForm" label-width="auto" status-icon :rules="rules">
            <el-form-item
                prop="catalog_name"
                label="名称："
                >
                <el-input
                placeholder="名称"
                class="mobile_input"
                v-model="addForm.catalog_name"
                ></el-input>
            </el-form-item>
            
            <el-form-item
                prop="publish_des"
                label="披露说明："
                >
                <el-input
                type="textarea"
                placeholder="披露说明..."
                class="mobile_input"
                v-model="addForm.publish_des"
                ></el-input>
            </el-form-item>

            <el-form-item
                prop="catalog_seq"
                label="序号："
                >
                <el-input
                placeholder=""
                class="mobile_input"
                v-model="addForm.catalog_seq"
                ></el-input>
            </el-form-item>

            <el-form-item 
                label="披露材料清单:">
                <el-upload 
                    ref="upload" 
                    :limit="1" 
                    :on-error="onError" 
                    :file-list="fileList"
                    :auto-upload="false" 
                    :http-request="uploadFile" 
                    :on-preview="previewClick"
                    action="url" 
                    class="upload-demo">
                <el-button slot="trigger" size="small" type="primary" style="background-color:#2882fe">选取文件<i class="el-icon-upload el-icon--right"></i></el-button>
                <div slot="tip" class="el-upload__tip">
                    支持上传 {{ fileType }} 格式
                </div>
                </el-upload>
            </el-form-item>

            <el-form-item prop="is_support_auth" label="是否支持认证">
                <el-select v-model="addForm.is_support_auth" placeholder="--请选择--" class="mobile_input">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                prop="auth_des"
                label="认证说明："
                v-if="addForm.is_support_auth == '是'"
                >
                <el-input
                type="textarea"
                placeholder="认证说明..."
                class="mobile_input"
                v-model="addForm.auth_des"
                ></el-input>
            </el-form-item>

            <el-form-item 
                label="认证材料清单:">
                <el-upload 
                    ref="uploadAuth" 
                    :limit="1" 
                    :on-error="onError" 
                    :file-list="fileListAuth"
                    :auto-upload="false" 
                    :http-request="uploadFileAuth" 
                    :on-preview="previewClick"
                    action="url" 
                    class="upload-demo">
                <el-button slot="trigger" size="small" type="primary" style="background-color:#2882fe">选取文件<i class="el-icon-upload el-icon--right"></i></el-button>
                <div slot="tip" class="el-upload__tip">
                    支持上传 {{ fileType }} 格式
                </div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitType ? editChangeData() : submitChangeData()">确 定</el-button>
        </div>
      </el-dialog>
   </div>
</template>

<script>
import { insertProductCatalogTow, updateProductCatalogTow, getSubCatalogByCatalogId } from "@/api/api.js";
export default {
    props:{
        select:{
            type:String,
            required:true
        }
    },
    data () {
        return {
            dialogFormVisible: false,
            formLabelWidth: "100px",
            addForm:{
                catalog_name:'',
                parent_catalog:'',
                catalog_seq:'',
                is_support_auth: '',
                auth_des: '',
            },
            rules: {
                catalog_name: [
                    { required: true, message: '请输入名称', trigger: "blur" },
                ],
                publish_des: [
                    { required: true, message: '请输入披露说明', trigger: "blur" },
                ],
                catalog_seq: [
                    { required: true, message: '请输入披露说明', trigger: "blur" },
                ],
                is_support_auth: [
                    { required: true, message: '请选择是否认证', trigger: "change" },
                ],
                auth_des: [
                    { required: true, message: '请输入认证说明', trigger: "blur" },
                ],
            },
            material_list_file: '',
            auth_list_file: '',
            type:'',
            fileList:[],
            fileListAuth:[],
            fileType: [
                "xls",
                "xlsx",
            ],
            // 运行上传文件大小，单位 M
            fileSize: 10,
            submitType: false // 保存 ？ 修改
        };
    },

    components: {},

    computed: {},

    methods: {
        // 获取详情
        getSubCatalogByCatalogId(id) {
            getSubCatalogByCatalogId({
                catalog_id: id
            }).then(res =>{
                if(res){
                    this.addForm = {...res}
                    if(res.auth_list_file_src_path){
                        this.fileListAuth = [{name: res.auth_list_file_src_name, url: res.auth_list_file_src_path, auth_list_file: res.auth_list_file}]
                    }
                    if(res.material_list_file_src_path){
                        this.fileList = [{name: res.material_list_file_src_name, url: res.material_list_file_src_path, auth_list_file: res.material_list_file}]
                    }
                    this.material_list_file = res.material_list_file
                    this.auth_list_file = res.auth_list_file
                }
            })
        },
        // 添加
        submitChangeData(){
            this.$refs["addForm"].validate(valid => {
                if (valid) {
                    this.submitUpload()
                    let data = new FormData();
                    if(!this.material_list_file){
                        this.$message({
                            type: "error",
                            message: "请上传披露材料清单!",
                        });
                        return
                    }
                    if(!this.auth_list_file){
                        this.$message({
                            type: "error",
                            message: "请上传认证材料清单!",
                        });
                        return
                    }
                    data.append("catalog_name", this.addForm.catalog_name);
                    data.append("publish_des", this.addForm.publish_des);
                    data.append("parent_catalog", this.addForm.parent_catalog);
                    data.append("catalog_seq", this.addForm.catalog_seq);
                    data.append("is_support_auth", this.addForm.is_support_auth);
                    data.append("auth_des", this.addForm.auth_des);
                    data.append("material_list_file_name", this.material_list_file);
                    data.append("auth_list_file_name", this.auth_list_file);

                    insertProductCatalogTow(data).then((response)=> {
                        this.$message({
                            type: "success",
                            message: "添加成功!",
                        });
                    })

                    setTimeout(()=> {
                        // 执行父组件的刷新
                        this.$emit('handle', this.addForm.parent_catalog);
                        this.dialogFormVisible=false
                    },500)
                } else {
                    return false;
                }
            })
        },
        // 修改
        editChangeData(){
            this.$refs["addForm"].validate(valid => {
                if (valid) {
                    this.submitUpload()
                    let data = new FormData();
                    if(!this.material_list_file){
                        this.$message({
                            type: "error",
                            message: "请上传披露材料清单!",
                        });
                        return
                    }
                    if(!this.auth_list_file){
                        this.$message({
                            type: "error",
                            message: "请上传认证材料清单!",
                        });
                        return
                    }
                    data.append("catalog_id", this.addForm.catalog_id);
                    data.append("catalog_name", this.addForm.catalog_name);
                    data.append("publish_des", this.addForm.publish_des);
                    data.append("parent_catalog", this.addForm.parent_catalog);
                    data.append("catalog_seq", this.addForm.catalog_seq);
                    data.append("is_support_auth", this.addForm.is_support_auth);
                    data.append("auth_des", this.addForm.auth_des);
                    data.append("material_list_file", this.addForm.material_list_file);
                    data.append("auth_list_file", this.addForm.auth_list_file);
                    data.append("material_list_file_name", this.material_list_file);
                    data.append("auth_list_file_name", this.auth_list_file);
                    
                    updateProductCatalogTow(data).then((response)=> {
                        this.$message({
                            type: "success",
                            message: "修改成功!",
                        });

                        setTimeout(()=> {
                            // 执行父组件的刷新
                            this.$emit('handle', this.addForm.parent_catalog);
                            this.dialogFormVisible=false
                        },500)
                    })
                } else {
                    return false;
                }
            })
        },
        submitUpload(file,fileList) {
            this.$refs.upload.submit();
            this.$refs.uploadAuth.submit();
        },
        parentHandleclick(val) {
            this.addForm = {
                catalog_name:'',
                parent_catalog:'',
                catalog_seq:'',
                material_list_file: '',
                is_support_auth: '',
                auth_des: '',
                auth_list_file: ''
            }
            this.$nextTick(()=>{
                this.$refs['addForm'].clearValidate(); // 清除校验规则
            })
            
            this.addForm['parent_catalog'] = val
            this.fileList = []
            this.fileListAuth= []
            this.submitType= false
            this.dialogFormVisible = true;
        },
        editScene(row) {
            this.fileList = []
            this.fileListAuth= []

            this.$nextTick(()=>{
                this.$refs['addForm'].clearValidate(); // 清除校验规则
            })

            this.submitType= true
            this.dialogFormVisible = true;
            
            this.getSubCatalogByCatalogId(row.catalog_id)
        },
        onError(err) {
            this.$message({
                type: "error",
                message: "附件上传失败!",
            });
            console.log(err);
        },
        uploadFile(file) {
            this.material_list_file = file.file;
        },
        uploadFileAuth(file) {
            this.auth_list_file = file.file;
        },
        // 点击认证材料清单 下载附件
        previewClick(file){
            if(file.auth_list_file){
                let url = this.$store.state.url;
                let file_url = `${url}/attach/binary?attachmentId=${file.auth_list_file}`
                this.attachmentDownload(file_url)
            }
                
        },
        attachmentDownload(url){
            var a = document.createElement('a');
            var event = new MouseEvent('click');
            a.href = url;
            a.dispatchEvent(event);
        }
    },
    created(){

    }
}
</script>
<style lang='scss' scoped>
.dialog_box {
  .el-input {
    height: 45px;
    width: 420px;
  }
  .resource{
      margin-left: 10px;
  }
  .mobile_input{
      width: 90%;
  }
}
</style>
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
            <el-form-item prop="cer_type" label="证书类型">
                <Slt :listParameter="cerType" class="select_box" v-model="addForm.cer_type"></Slt>
            </el-form-item>

            <el-form-item
                prop="cer_name"
                label="证书名称："
                >
                <el-input
                placeholder="证书名称"
                class="mobile_input"
                v-model="addForm.cer_name"
                ></el-input>
            </el-form-item>
            
            <el-form-item
                prop="cer_organ_name"
                label="颁发机构："
                >
                <el-input
                placeholder="颁发机构"
                class="mobile_input"
                v-model="addForm.cer_organ_name"
                ></el-input>
            </el-form-item>

            <el-form-item
                prop="cer_no"
                label="证书编号："
                >
                <el-input
                placeholder="证书编号"
                class="mobile_input"
                v-model="addForm.cer_no"
                ></el-input>
            </el-form-item>

            <el-form-item
                prop="cer_date"
                label="颁发日期："
                >
                <el-date-picker
                v-model="addForm.cer_date"
                type="date"
                class="mobile_input"
                value-format=" yyyy-MM-dd HH:mm" 
                format="yyyy-MM-dd HH:mm"
                placeholder="颁发日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item
                prop="cer_valid_date"
                label="有效日期："
                >
                <el-date-picker
                v-model="addForm.cer_valid_date"
                type="date"
                class="mobile_input"
                value-format=" yyyy-MM-dd HH:mm" 
                format="yyyy-MM-dd HH:mm"
                placeholder="有效日期">
                </el-date-picker>
            </el-form-item>
            
            <el-form-item 
                label="证件扫描件:">
                <el-upload
                    class="upload-box"
                    ref="upload"
                    action="url"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :file-list="imgsList"
                    :on-change="changeFile"
                    :on-remove="removeFile"
                    :http-request="uploadFile"
                    >
                    <i class="el-icon-upload"></i>
                </el-upload>
                <el-dialog 
                    :append-to-body="true"
                    :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
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
import { insertCertificate, updateCertificate, getCertificateInfo, getSelectData } from "@/api/api.js";
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
                cer_type:'',
                cer_name:'',
                cer_organ_name:'',
                cer_no: '',
                cer_date: '',
                cer_valid_date: '',
                cer_file_list: []
            },
            rules: {
                cer_type: [
                    { required: true, message: '请选择证书类型', trigger: "change" },
                ],
                cer_name: [
                    { required: true, message: '请输入证书名称', trigger: "blur" },
                ],
                cer_organ_name: [
                    { required: true, message: '请输入颁发机构', trigger: "blur" },
                ],
                cer_no: [
                    { required: true, message: '请输入证书编号', trigger: "blur" },
                ],
                cer_date: [
                    { required: true, message: '请选择颁发日期', trigger: "change" },
                ],
                cer_valid_date: [
                    { required: true, message: '请选择有效日期', trigger: "change" },
                ],
            },
            type:'',
            fileList:[], // 上传
            imgsList: [], // 回显
            delete_cer_file_list: [], // 需要删除的图片
            submitType: false, // 保存 ？ 修改
            dialogImageUrl: '',
            cerType: [],
            dialogVisible: false
        };
    },

    components: {},

    computed: {},
    mounted: function () {
        getSelectData(["CER_TYPE"]).then((response)=>{
            this.cerType = response[0].CER_TYPE
        })
    },
    methods: {
        // 添加
        submitChangeData(){
            this.$refs["addForm"].validate(valid => {
                if (valid) {
                    this.submitUpload()
                    if(!this.fileList.length){
                        this.$message({
                            type: "error",
                            message: "请上传证件扫描件!",
                        });
                        return
                    }

                    let data = new FormData();
                    data.append("cer_type", this.addForm.cer_type);
                    data.append("cer_name", this.addForm.cer_name);
                    data.append("cer_organ_name", this.addForm.cer_organ_name);
                    data.append("cer_no", this.addForm.cer_no);
                    data.append("cer_date", this.addForm.cer_date);
                    data.append("cer_valid_date", this.addForm.cer_valid_date);
                    //循环已选择文件列表 fileList，将文件取出放入 formData 的file数组中
                    for (let i = 0; i < this.fileList.length; i++) {
                        data.append("cer_file_name",this.fileList[i].raw);
                    }	

                    insertCertificate(data).then((response)=> {
                        this.$message({
                            type: "success",
                            message: "添加成功!",
                        });

                        setTimeout(()=> {
                            // 执行父组件的刷新
                            this.$emit('handle');
                            this.dialogFormVisible=false
                        },500)
                    })

                    
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
                    if(!this.fileList.length){
                        this.$message({
                            type: "error",
                            message: "请上传证件扫描件!",
                        });
                        return
                    }

                    let data = new FormData();
                    data.append("cer_id", this.addForm.cer_id);
                    data.append("cer_type", this.addForm.cer_type);
                    data.append("cer_name", this.addForm.cer_name);
                    data.append("cer_organ_name", this.addForm.cer_organ_name);
                    data.append("cer_no", this.addForm.cer_no);
                    data.append("cer_date", this.addForm.cer_date);
                    data.append("cer_valid_date", this.addForm.cer_valid_date);
                    data.append("delete_cer_file_list", this.delete_cer_file_list);

                    //循环已选择文件列表 fileList，将文件取出放入 formData 的file数组中
                    for (let i = 0; i < this.fileList.length; i++) {
                        if(this.fileList[i].raw){
                            data.append("cer_file_name",this.fileList[i].raw);
                        }
                    }	

                    updateCertificate(data).then((response)=> {
                        this.$message({
                            type: "success",
                            message: "修改成功!",
                        });

                        setTimeout(()=> {
                            // 执行父组件的刷新
                            this.$emit('handle');
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
        },
        parentHandleclick(val) {
            this.imgsList = []
            this.delete_cer_file_list = []
            this.$nextTick(()=>{
                this.$refs['addForm'].clearValidate(); // 清除校验规则
                this.$refs['addForm'].resetFields();
            })
            
            this.submitType= false
            this.dialogFormVisible = true;
        },
        editScene(row) {
            this.imgsList = []
            this.delete_cer_file_list = []
            this.submitType= true
            this.dialogFormVisible = true;
            
            this.$nextTick(()=>{
                this.$refs['addForm'].clearValidate(); // 清除校验规则
            })
            this.getCertificateInfo(row.cer_id)
        },
        // 获取详情
        getCertificateInfo(id){
            let url = this.$store.state.url;
            getCertificateInfo({
                cer_id: id
            }).then(res =>{
                this.addForm = {...res}
                 res.cer_file_list.map(item=>{
                     this.imgsList.push({name: item.target_filename,url: `${url}/attach/binary?attachmentId=${item.attachment_id}`,attachment_id: item.attachment_id})
                 })
            })
        },
        onError(err) {
            this.$message({
                type: "error",
                message: "附件上传失败!",
            });
            console.log(err);
        },
        changeFile(file, fileList){
          let fileName = file.name;
	      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
	      if (regex.test(fileName.toLowerCase())) {
	        this.fileList = fileList;
	      } else {
            this.$message.error("请选择图片文件");
          }
        },
        // 移除图片
        removeFile(file, fileList){
            if(file.attachment_id){
                this.delete_cer_file_list.push(file.attachment_id)
                this.fileList = fileList
            }
        },
        // 自定义上传
        uploadFile(file) {
            this.addForm.cer_file_list = this.fileList;
        },
        // 点击大图显示
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
  /deep/ .upload-box {

        .el-upload-list--picture-card .el-upload-list__item{
            width: 100px;
            height: 100px;
        }
        .el-upload--picture-card{
            width: 100px;
            height: 100px;
            line-height: 127px;

            i{
                font-size: 55px;
            }
        }
    }
}
</style>
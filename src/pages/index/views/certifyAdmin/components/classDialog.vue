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
                prop="catalog_seq"
                label="序号："
                >
                <el-input
                placeholder="序号"
                class="mobile_input"
                v-model="addForm.catalog_seq"
                ></el-input>
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
import { insertProductCatalogOne, updateProductCatalogOne } from "@/api/api.js";
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
                catalog_seq:'',
            },
            rules: {
                catalog_name: [
                    { required: true, message: '请输入名称', trigger: "blur" },
                ],
                catalog_seq: [
                    { required: true, message: '请输入序号', trigger: "blur" },
                ],
            },
            submitType: false // 保存 ？ 修改
        };
    },

    components: {},

    computed: {},

    methods: {
        // 添加
        submitChangeData(){
            this.$refs["addForm"].validate(valid => {
                if (valid) {
                    let data = new FormData();
                    data.append("catalog_name", this.addForm.catalog_name);
                    data.append("catalog_seq", this.addForm.catalog_seq);
                    data.append("subject_id", this.addForm.subject_id);
                    data.append("parent_catalog", this.addForm.subject_id);
                    insertProductCatalogOne(data).then((response)=> {
                        this.$message({
                            type: "success",
                            message: "添加成功!",
                        });
                    })
                    
                    // 执行父组件的刷新
                    setTimeout(()=> {
                        this.$emit('classhandle', this.addForm.subject_id);
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
                    let data = new FormData();
                    data.append("catalog_name", this.addForm.catalog_name);
                    data.append("catalog_seq", this.addForm.catalog_seq);
                    data.append("catalog_id", this.addForm.catalog);
                    data.append("parent_catalog", this.addForm.parent_catalog);
                    updateProductCatalogOne(data).then((response)=> {
                        this.$message({
                            type: "success",
                            message: "修改成功!",
                        });

                        // 执行父组件的刷新
                        setTimeout(()=> {
                            this.$emit('classhandle',this.addForm.parent_catalog);
                            this.dialogFormVisible=false
                        },500)
                    })
                } else {
                    return false;
                }
            })
        },
        parentHandleclick(val) {
            this.addForm = {
                catalog_name:'',
                catalog_seq:'',
            }
            this.$nextTick(()=>{
                this.$refs['addForm'].clearValidate(); // 清除校验规则
            })
            this.addForm['subject_id'] = val
            this.submitType= false
            this.dialogFormVisible = true;
        },
        editScene(row) {
            this.submitType= true
            this.dialogFormVisible = true;
            this.addForm = {
                catalog_name: row.catalog_name,
                catalog_seq: row.catalog_seq,
            }
            this.addForm['catalog'] = row.catalog_id
            this.addForm['parent_catalog']= row.parent_catalog
            console.log(this.addForm)
        },
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
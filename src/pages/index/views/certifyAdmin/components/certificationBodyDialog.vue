<template>
   <div class="wrapper">
       <!-- 弹出框 -->
      <el-dialog
        v-model="addForm"
        title="新增关联机构"
        :visible.sync="dialogFormVisible"
        class="dialog_box"
        width="37%"
      >
        <el-form ref="addForm" :model="addForm" label-width="auto" status-icon :rules="rules">
            <el-form-item prop="organ_id_array" label="选择机构">
                <el-select
                    class="mobile_input"
                    v-model="addForm.organ_id_array" 
                    multiple 
                    collapse-tags 
                    placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.organ_id"
                    :label="item.organ_name"
                    :value="item.organ_id">
                    </el-option>
                </el-select>
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
import { insertAuthOrgan, getSearchNoAuthOrganList } from "@/api/api.js";
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
                organ_id_array:[],
            },
            rules: {
                organ_id_array: [
                    { required: true, message: '请选择机构', trigger: "change" },
                ]
            },
            options: [],
            submitType: false // 保存 ？ 修改
        };
    },

    components: {},

    computed: {},
    methods: {
        getSearchNoAuthOrganList(id){
            getSearchNoAuthOrganList({
                catalog_id: id,
                organ_id_array: []
            }).then((res)=>{
                this.options = res
            })
        },
        // 添加
        submitChangeData(){
            this.$refs["addForm"].validate(valid => {
                if (valid) {
                    insertAuthOrgan(this.addForm).then((response)=> {
                        this.$message({
                            type: "success",
                            message: "添加成功!",
                        });
                    })
                    
                    // 执行父组件的刷新
                    setTimeout(()=> {
                        this.$emit('classhandle', this.addForm.catalog_id);
                        this.dialogFormVisible=false
                    },500)
                        
                } else {
                    return false;
                }
            })
        },
        parentHandleclick(val) {
            console.log(val)
            this.addForm['catalog_id'] = val
            this.submitType= false
            this.dialogFormVisible = true;
            this.getSearchNoAuthOrganList(val)
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
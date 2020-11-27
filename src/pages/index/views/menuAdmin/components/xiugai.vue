<template>
   <div class="wrapper">
       <!-- 弹出框 -->
      <el-dialog
        v-model="addForm"
        title="新增子菜单"
        :visible.sync="dialogFormVisible"
        class="dialog_box"
        width="37%"
      >
        <el-form :model="addForm">
          <el-form-item
            label="上层菜单："
            :label-width="formLabelWidth"
          >
            <el-input
              autocomplete="off"
              :placeholder="select"
              class="mobile_input"
              disabled
            >{{select}}</el-input>
          </el-form-item>
          <el-form-item label="菜单名称：" :label-width="formLabelWidth">
            <el-input
              v-model="addForm.module_name"
              autocomplete="off"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="是否公开：" class="resource" :label-width="formLabelWidth">
          <el-radio-group v-model="addForm.is_open">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

          <el-form-item
            label="菜单url:"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addForm.module_url"
              autocomplete="off"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
          
          <el-form-item
            label="菜单序号:"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="addForm.module_seq"
              autocomplete="off"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitChangeData">确 定</el-button>
        </div>
      </el-dialog>
   </div>
</template>

<script>
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
              module_name:'',
              is_open:'1',
              module_url:'',
              module_seq:''
          },
      };
   },

   components: {},

   computed: {},

   methods: {
       submitChangeData(){
           this.$emit('handle',this.addForm)
           this.dialogFormVisible=false
           this.addForm={}
       },
       parentHandleclick() {
        this.dialogFormVisible = true;
       },

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
}
</style>
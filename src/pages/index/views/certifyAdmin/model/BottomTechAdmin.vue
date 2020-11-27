<!-- 披露认证-底层技术管理 -->
<template>
  <div class="wrapper">
    <div class='header'>底层技术管理</div>
    <main>
      <el-row>
        <el-button type="primary" size="small" class="addButton" @click="addSpecial"><i class="el-icon-plus"></i>新建技术</el-button>
      </el-row>
      <!--新建弹窗-->
      <el-dialog title="新建" :visible.sync="dialogFormVisible" width='500px'>
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" style="display:flex">
          <el-form-item label="技术名称" prop="tec_name">
            <el-input type="text" class='addinput' v-model="formData.tec_name">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editType ? editTopic('formData') : addTopic('formData')"
            >确 认</el-button
          >
        </div>
      </el-dialog>

      <el-row>
        <el-table
          :data="tableData.rows"
          border
          style="width: 96%;margin-left:2%;">
          <el-table-column prop="tec_name" label="技术名称" ></el-table-column>
          <el-table-column prop="create_date" label="创建时间" ></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editSpecial(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="delSpecial(scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页器 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-row>
    </main>
    
  </div>
</template>

<script>
import utils from "@/util/util";
import { getSearchTechnologyList, addTechnology, editTechnology, deleteTechnology} from "@/api/api.js";
export default {
  data () {
    return {
       tableData: [],
       rowData: {
       	page: "1",
		    rows: "10"
       },
       pageNum: 1,
       pageSize: 10,
       total: 0,
       dialogFormVisible:false,
       formData: {
        tec_name:'',
       },
       rules: {
          tec_name: [
            { required: true, message: '请输入技术名称', trigger: 'blur' },
          ],
        },
       editType: false // 保存 ？编辑
    };
  },

  components: {},

  computed: {
    
  },
  created() {
    this.getSearchTechnologyList()
  },
  methods: {
      // 获取技术列表
      getSearchTechnologyList(){
      	this.rowData.page = `${this.pageNum}`
        this.rowData.rows = `${this.pageSize}`
        getSearchTechnologyList({...this.rowData}).then(res =>{
          if(res){
            this.tableData = res
          }
        })
      },
      addSpecial() {
        this.editType = false
        this.dialogFormVisible = true
        this.resetData()
      },
      // 添加 技术
      addTopic(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addTechnology({
              tec_name: this.formData.tec_name
            }).then(res =>{
              if(res.code == 1){
                this.$message({
                  message: "添加成功",
                  type: "success",
                });

                this.dialogFormVisible = false
                this.resetData()
                this.getSearchTechnologyList()
              }
            })
          } else {
            return false;
          }
        });
      },
      editSpecial(row) {
        this.editType = true
        this.dialogFormVisible = true
        this.formData['tec_name'] = row.tec_name
        this.formData['tec_id'] = row.tec_id
      },
      // 编辑 技术
      editTopic(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editTechnology({
              tec_id: this.formData.tec_id,
              tec_name: this.formData.tec_name
            }).then(res =>{
              if(res.code == 1){
                this.$message({
                  message: "修改成功",
                  type: "success",
                });

                this.dialogFormVisible = false
                this.resetData()
                this.getSearchTechnologyList()
              }
            })
          } else {
            return false;
          }
        });
          
      },
      // 删除
      delSpecial(row) {
        this.$confirm('是否确认删除该技术?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTechnology({
            tec_id: row.tec_id,
          }).then(res =>{
            if(res.code == 1){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });

              this.getSearchTechnologyList()
            }
          })
        }).catch(() => {
               
        });
        
      },
      // 重置数据
      resetData() {
        this.formData.tec_name = ''
        this.formData['tec_id'] = ''
      },
      handleSizeChange(val) {
        this.pageNum = val
        this.getSearchTechnologyList()
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getSearchTechnologyList()
      },
  }
}

</script>
<style lang='scss' scoped>
.wrapper {
  background-color: #fff;
  height: 100%;
  .header {
    padding-left:15px;
    height:50px;
    line-height:50px;
    border-bottom: 1px solid #ccc;
    font-weight:600;
  }
  .addinput{
    width:300px
  }
  .addButton{
    margin:10px 2% 10px;
    font-size:14px;

    i{
      margin-right:3px;
    }
  }
  .block{
    padding-left:15px;
  }
}
</style>
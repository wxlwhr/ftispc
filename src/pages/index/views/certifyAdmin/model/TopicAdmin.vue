<!-- 披露认证-专题管理 -->
<template>
  <div class="wrapper">
    <div class='header'>专题管理</div>
    <main>
      <el-row>
        <el-button type="primary" size="small" class="addButton" @click="addSpecial"><i class="el-icon-plus"></i>新建专题</el-button>
      </el-row>
      <!--新建弹窗-->
      <el-dialog title="新建" :visible.sync="dialogFormVisible" width='500px'>
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" style="display:flex">
          <el-form-item label="专题名称" prop="subject_name">
            <el-input type="text" class='addinput' v-model="formData.subject_name">
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
          :data="tableData"
          border
          style="width: 96%;margin-left:2%;">
          <el-table-column prop="subject_name" label="专题名称" ></el-table-column>
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
import { getSearchSubjectList, addSearchSubject, editSearchSubject, delSearchSubject} from "@/api/api.js";
export default {
  data () {
    return {
       tableData: [],
       rowData: {
        page: 1,
        rows: 10
       },
       pageNum:1,
       pageSize:10,
       total: 0,
       dialogFormVisible:false,
       formData: {
        subject_name:'',
       },
       rules: {
          subject_name: [
            { required: true, message: '请输入专题名称', trigger: 'blur' },
          ],
        },
       editType: false // 保存 ？编辑
    };
  },

  components: {},

  computed: {
    
  },
  created() {
    this.getSearchSubjectLists()
  },
  methods: {
      // 获取专题列表
      getSearchSubjectLists(){
        this.rowData.page = `${this.pageNum}`
        this.rowData.rows = `${this.pageSize}`
        getSearchSubjectList({...this.rowData}).then(res =>{
          if(res){
            this.tableData = res.rows
            this.total = res.records
          }
        })
      },
      addSpecial() {
        this.editType = false
        this.dialogFormVisible = true
        this.resetData()
      },
      // 添加 专题
      addTopic(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addSearchSubject({
              subject_name: this.formData.subject_name
            }).then(res =>{
              if(res.code == 1){
                this.$message({
                  message: "添加成功",
                  type: "success",
                });

                this.dialogFormVisible = false
                this.resetData()
                this.getSearchSubjectLists()
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
        this.formData['subject_name'] = row.subject_name
        this.formData['subject_id'] = row.subject_id
      },
      // 编辑 专题
      editTopic(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            editSearchSubject({
              subject_id: this.formData.subject_id,
              subject_name: this.formData.subject_name
            }).then(res =>{
              if(res.code == 1){
                this.$message({
                  message: "修改成功",
                  type: "success",
                });

                this.dialogFormVisible = false
                this.resetData()
                this.getSearchSubjectLists()
              }
            })
          } else {
            return false;
          }
        });
          
      },
      // 删除
      delSpecial(row) {
        this.$confirm('是否确认删除该专题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delSearchSubject({
            subject_id: row.subject_id,
          }).then(res =>{
            if(res.code == 1){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });

              this.getSearchSubjectLists()
            }
          })
        }).catch(() => {
               
        });
        
      },
      // 重置数据
      resetData() {
        this.formData.subject_name = ''
        this.formData['subject_id'] = ''
      },
      handleSizeChange(val) {
        this.pageNum = val
        this.getSearchSubjectLists()
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getSearchSubjectLists()
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
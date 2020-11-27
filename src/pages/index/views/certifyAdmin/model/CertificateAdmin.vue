<!-- 披露认证-证书管理 -->
<template>
  <div class="wrapper">
    <div class='header'>证书管理</div>
    <main>
      <el-row>
        <el-button type="primary" size="small" class="addButton" @click="addSpecial"><i class="el-icon-plus"></i>添加</el-button>
      </el-row>
      <el-row>
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 96%;margin-left:2%;">
          <el-table-column prop="cer_type" label="证书类型" ></el-table-column>
          <el-table-column prop="cer_name" label="证书名称" ></el-table-column>
          <el-table-column prop="cer_organ_name" label="发证机构" ></el-table-column>
          <el-table-column prop="cer_date" label="颁发日期" ></el-table-column>
          <el-table-column prop="cer_valid_date" label="有效日期" ></el-table-column>
          <el-table-column prop="audit_status" label="状态" ></el-table-column>
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
    <CertificateDialog
    ref="mysecond"
    :select="selectMenu"
    @handle="getSearchCertificateLists"
    />
  </div>
</template>

<script>
import utils from "@/util/util";
import { getSearchCertificateList, deleteCertificateInfo} from "@/api/api.js";
import CertificateDialog from "../components/certificateDialog";

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
       selectMenu: '',
       rules: {
          subject_name: [
            { required: true, message: '请输入专题名称', trigger: 'blur' },
          ],
        },
       editType: false // 保存 ？编辑
    };
  },

  components: {
      CertificateDialog,  
  },

  computed: {
    
  },
  created() {
    this.getSearchCertificateLists()
  },
  methods: {
      // 获取专题列表
      getSearchCertificateLists(){
        this.rowData.page = `${this.pageNum}`
        this.rowData.rows = `${this.pageSize}`
        getSearchCertificateList({...this.rowData}).then(res =>{
          if(res){
            this.tableData = res.rows
            this.total = res.records
          }
        })
      },
      addSpecial() {
        this.$refs.mysecond.parentHandleclick();
      },
      editSpecial(row){
        this.$refs.mysecond.editScene(row);
      },
      // 删除
      delSpecial(row) {
        this.$confirm('是否确认删除该证书?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCertificateInfo({
            cer_id: row.cer_id,
          }).then(res =>{
            if(res.code == 1){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });

              this.getSearchCertificateLists()
            }
          })
        }).catch(() => {
               
        });
        
      },
      handleSizeChange(val) {
        this.pageNum = val
        this.getSearchCertificateLists()
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getSearchCertificateLists()
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
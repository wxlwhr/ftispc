<template>
   <div class="wrapper">
       <!-- 弹出框 -->
      <el-dialog
        :title="submitType ? '修改':'新增'"
        :visible.sync="dialogFormVisible"
        class="dialog_box"
        width="50%"
      >
        <el-container class="organ_menu">
            <el-container>
                <el-aside width="230px">
                <div class="menu__structure">
                    <i class='iconfont iconcaidan' id="menu__icon"></i>
                    产品目录
                    <i 
                    class='el-icon-refresh' 
                    id="menu__refresh"
                    :class="animation && 'animation'"
                    @click="animation=!animation;menuRefresh(catalog_id)"></i>
                </div>
                <Tree :dataList="treeData" @changeNode="changeTreeData" class="treemenu"></Tree>
                </el-aside>
                <el-main>
                <el-table
                    ref="multipleTable"
                    :data="tableData" 
                    :row-style="{ height: '40px',color: '#000' }" 
                    :cell-style="{ padding: '0' }" 
                    style="width: 96%;margin-top: 20px; margin-left: 2%;font-size: 12px;"
                    :header-cell-style="tableHeaderColor"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column prop="product_name" align="center" label="产品名称" ></el-table-column>
                    
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
                </el-main>
            </el-container>
        </el-container>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitType ?  editChangeData() : submitChangeData()">确 定</el-button>
        </div>
      </el-dialog>
   </div>
</template>

<script>
import Tree from "@/components/tree.vue";
import { getSubjecttree, getProductCaseNORelListByCase, insertProductCaseProduct} from "@/api/api.js";
export default {
    props:{
       
    },
    data () {
        return {
            dialogFormVisible: false,
            formLabelWidth: "100px",
            animation:false,//图标旋转参数
            treeData: [],
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 0,
            rowData: {
                page: "1",
                rows: "10"
            },
            case_id: '',
            submitType: false, // 保存 ？ 修改
            handleSelection: [] // 选择的数据
        };
    },

    components: {
        Tree,
    },

    computed: {},
    created() {
        this.getSubjecttree()
        this.getSearchCaseByCatalogs('-1')
    },
    methods: {
        tableHeaderColor({ row, rowIndex, column, columnIndex }) {
            if (rowIndex === 0) {
                return "background-color:#f6f7fb;color:#000;";
            }
        },
        // 获取专题目录树
        getSubjecttree() {
            getSubjecttree().then((res)=>{
                this.treeData = res.data.subjectTree
            });
        },
        // 获取列表
        getSearchCaseByCatalogs(val) {
            this.catalog_id = val
            this.rowData.page = `${this.pageNum}`
            this.rowData.rows = `${this.pageSize}`
            getProductCaseNORelListByCase({
                catalog_id: val,
                case_id: this.case_id
            }).then((res)=>{
                this.tableData = res
            });
        },
        menuRefresh(){
            this.getSubjecttree()
        },
        // 点击 目录树
        changeTreeData(e){
            this.getSearchCaseByCatalogs(e.data.id)
        },
        // 接收 父组件的参数
        parentHandleclick(status,id) {
            this.submitType= status
            this.dialogFormVisible = true;

            this.$nextTick(()=>{
                this.$refs.multipleTable.clearSelection(); // 清除选中状态
            })
            this.handleSelection = []
            this.case_id = id
        },
        // 分页
        handleSizeChange(val) {
            this.pageNum = val
            this.getSearchCaseByCatalogs()
        },
        // 分页
        handleCurrentChange(val) {
            this.pageNum = val
            this.getSearchCaseByCatalogs()
        },
        // 点击多选
        handleSelectionChange(val) {
            this.handleSelection = val
        },
        // 添加
        submitChangeData(){
            if(!this.handleSelection.length){
                this.$message({
                    type: "error",
                    message: "请选择产品!",
                });
                return
            }

            this.$message({
                type: "success",
                message: "添加成功!",
            });
            this.$emit('classhandle', this.handleSelection);
            this.dialogFormVisible = false;
        },
        // 修改
        editChangeData() {
            if(!this.handleSelection.length){
                this.$message({
                    type: "error",
                    message: "请选择产品!",
                });
                return
            }

            let data = this.handleSelection.map(res => {return res.product_id})
            insertProductCaseProduct({
                case_id: this.case_id,
                product_id_array: data
            }).then(res =>{
                if(res.code == 1){
                    this.$message({
                        type: "success",
                        message: "添加成功!",
                    });

                    this.getSearchCaseByCatalogs(this.catalog_id)
                    this.dialogFormVisible = false;
                    this.$emit('classhandle');
                }else{
                    this.$message({
                        type: "error",
                        message: res.des,
                    });
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.el-header {
  background-color: #fff;
  border-bottom: 1px solid #ebeff3;
  text-align: start;
  line-height: 57px;
  font-weight: 600;
  font-size: 15px;
}
.el-main {
  min-height: 600px;
  background-color: #fff;
  .addMenuBtn {
    margin-top: 19px;
    margin-left: 10px;
    width: 60px;
    height: 32px;
    padding: 0;
    font-size: 12px;
  }
}
.el-aside {
  min-height: 600px;
  background-color: #fff;
  border-right: 1px solid #ebeff3;
  .menu__structure{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    font-weight: 500;
    color: #000;
    border-bottom: 1px solid #ebeff3;
    position: relative;
    #menu__icon{
      font-size: 10px;
      margin-left: 20px;
      margin-right: 5px;
    }
    #menu__refresh{
      color: #b3bbc6;
      position: absolute;
      -webkit-transition: -webkit-transform .5s;
      transition: -webkit-transform .5s;
      transition: transform .5s;
      transition: transform .5s, -webkit-transform .5s;
      cursor: pointer;
      right: 15px;
      top: 17px;
      font-size: 18px;
    }

    .animation {
        transform: rotate(-180deg);
    }
  }
  .treemenu {
    margin-top: 10px;
    margin-left: 10px;
  }
  
}
.block{
    padding-right: 10px;
}

/deep/  .el-dialog__body{
    padding: 0px;
}
</style>
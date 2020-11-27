<template>
   <div class="wrapper">
       <!-- 弹出框 -->
      <el-dialog
        v-model="addForm"
        :title="submitType ? '修改':'新增'"
        :visible.sync="dialogFormVisible"
        class="dialog_box"
        width="50%"
      >
        <el-form ref="addForm" :model="addForm" label-width="auto" status-icon :rules="rules">
            <el-form-item
                prop="case_name"
                label="解决方案名称："
                >
                <el-input
                placeholder="解决方案名称"
                class="mobile_input"
                v-model="addForm.case_name"
                ></el-input>
            </el-form-item>
            
            <el-form-item
                prop="case_content"
                label="解决方案详情："
                >
                <el-input
                type="textarea"
                rows="5"
                placeholder="解决方案详情"
                class="mobile_input"
                v-model="addForm.case_content"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="relatedProducts-box">
            <div class="relatedProducts-top">
                <span>关联产品：</span>
                <el-button type="primary" size="mini" @click="addProduct">添加产品</el-button>
            </div>
            <div class="relatedProducts-table">
                <el-table
                    :data="tableData" 
                    :row-style="{ height: '40px',color: '#000' }" 
                    :cell-style="{ padding: '0' }" 
                    style="width: 100%;margin-top: 20px;font-size: 12px;"
                    :header-cell-style="tableHeaderColor"
                >
                    <el-table-column prop="product_name" label="产品名称" ></el-table-column>
                    <el-table-column prop="create_date" label="添加时间"></el-table-column>
                    <el-table-column width="100px" label="操作">
                    <template slot-scope="scope">
                    <el-button
                        @click="submitType ? handleDelete(scope.row) : addDelete(scope.$index, scope.row)"
                        type="text"
                        size="small"
                        >移除</el-button
                    >
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitType ? editChangeData() : submitChangeData()">确 定</el-button>
        </div>
      </el-dialog>
      <AddProduct
        ref="addProduct"
        @classhandle="handleSelectionChange"
        />
   </div>
</template>

<script>
import { insertCase,getProductCaseRelListByCase,updateCase, searchCaseByCaseId, deleteProductCase} from "@/api/api.js";
import AddProduct from "./addProduct";
export default {
    props:{
    },
    data () {
        return {
            dialogFormVisible: false,
            formLabelWidth: "100px",
            tableData: [],
            addForm:{
                case_name:'',
                case_content:'',
                product_id_array: []
            },
            rules: {
                case_name: [
                    { required: true, message: '请输入名称', trigger: "blur" },
                ],
                case_content: [
                    { required: true, message: '请输入序号', trigger: "blur" },
                ],
            },
            submitType: false // 保存 ？ 修改
        };
    },

    components: {
        AddProduct
    },

    computed: {},

    methods: {
        tableHeaderColor({ row, rowIndex, column, columnIndex }) {
            if (rowIndex === 0) {
                return "background-color:#f6f7fb;color:#000;";
            }
        },
        // 获取 已关联的列表
        getProductCaseRelListByCase(id){
            getProductCaseRelListByCase({
                case_id: id
            }).then(res=> {
                this.tableData = res
            })
        },
        // 添加
        submitChangeData(){
            this.$refs["addForm"].validate(valid => {
                if (valid) {
                    if(!this.tableData.length){
                        this.$message({
                            type: "error",
                            message: "请先添加产品!",
                        });
                        return
                    }
                    this.addForm['product_id_array'] = this.tableData.map(item=>{return item.product_id})
                    insertCase(this.addForm).then((response)=> {
                        this.$message({
                            type: "success",
                            message: "添加成功!",
                        });

                        // 执行父组件的刷新
                        setTimeout(()=> {
                            this.$emit('classhandle', this.addForm.catalog_id);
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
                    if(!this.tableData.length){
                        this.$message({
                            type: "error",
                            message: "请先添加产品!",
                        });
                        return
                    }

                    updateCase(this.addForm).then((response)=> {
                        this.$message({
                            type: "success",
                            message: "修改成功!",
                        });

                        // 执行父组件的刷新
                        setTimeout(()=> {
                            this.$emit('classhandle',this.addForm.catalog_id);
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
                case_name:'',
                case_content:'',
            }
            this.submitType= false
            this.dialogFormVisible = true;
            
            this.$nextTick(()=>{
                this.$refs['addForm'].clearValidate(); // 清除校验规则
            })

            this.addForm['catalog_id'] = val
            this.tableData = []
           
        },
        editScene(row) {
            this.submitType= true
            this.dialogFormVisible = true;

            this.$nextTick(()=>{
                this.$refs['addForm'].clearValidate(); // 清除校验规则
            })

            this.tableData = []
            this.searchCaseByCaseId(row.case_id)
            this.getProductCaseRelListByCase(row.case_id)
        },
        // 获取详情
        searchCaseByCaseId(id){
            searchCaseByCaseId({
                case_id: id
            }).then(res=>{
                 this.addForm = res
            })
        },
        // 添加 产品
        addProduct(){
            this.$refs.addProduct.parentHandleclick(this.submitType, this.addForm.case_id);
        },
        // 选择的 关联产品
        handleSelectionChange(row){
            // 编辑的 时候就更新数据 否则就添加数据
            if(this.submitType){
                this.getProductCaseRelListByCase(this.addForm.case_id)
            }else{
                if(row){
                    let data = [...this.tableData,...row];
                    let hash = {}; //去重
                    let arr = data.reduce((preVal, curVal) => {
                        hash[curVal.product_id] ? "" : (hash[curVal.product_id] = true && preVal.push(curVal));
                        return preVal;
                    }, []);

                    this.tableData = arr
                }
            }
                
        },
        // 添加 移除
        addDelete(index) {
            this.tableData.splice(index, 1)
        },
        // 编辑 移除
        handleDelete(val) {
            let that = this;
            console.log(val);
            this.$confirm("此操作将永久删除该目录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                // 删除请求
                deleteProductCase({ catalog_id: val.catalog_id }).then(function (response) {
                    if (response.code == "1") {
                        that.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        that.getProductCaseRelListByCase(val.catalog_id)
                    } else {
                        that.$message.error(response.des);
                    }
                });
                })
                .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
    },
    created(){

    }
}
</script>
<style lang='scss' scoped>
.dialog_box {
  .relatedProducts-box{
    margin-top: 60px;
    margin-bottom: 25px;
  }
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
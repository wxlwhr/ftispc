<!-- 认证机构 -->
<template>
  <div class="wrapper">
    <el-container class="organ_menu">
      <el-header height="57px">认证机构管理</el-header>
      <el-container>
        <el-aside width="230px">
          <div class="menu__structure">
            <i class='iconfont iconcaidan' id="menu__icon"></i>
            目录
            <i 
              class='el-icon-refresh' 
              id="menu__refresh"
              :class="animation && 'animation'"
              @click="animation=!animation, menuRefresh(parent_catalog)"></i>
          </div>
          <Tree :dataList="treeData" @changeNode="changeTreeData" class="treemenu"></Tree>
        </el-aside>
        <el-main>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addTreeNode"
            size="medium"
            class="addMenuBtn"
            >新增关联机构</el-button
          >
          <!-- <el-button
            type="primary"
            icon="el-icon-minus"
            @click="addTreeNode"
            size="medium"
            class="addMenuBtn"
            >批量删除</el-button
          > -->
          <!-- 表格 -->
          <el-table
            :data="tableData" 
            :row-style="{ height: '40px',color: '#000' }" 
            :cell-style="{ padding: '0' }" 
            style="width: 96%;margin-top: 20px; margin-left: 2%;font-size: 12px;"
            :header-cell-style="tableHeaderColor"
          >
            <el-table-column prop="organ_name" label="关联机构名称" ></el-table-column>
            <el-table-column prop="create_date" label="创建时间"></el-table-column>
            <el-table-column width="150px" label="操作">
               <template slot-scope="scope">
              <el-button
                @click="handleDelete(scope.row)"
                type="text"
                size="small"
                >移除</el-button
              >
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

          <CertificationBody
            ref="myclass"
            :select="selectMenu"
            @classhandle="menuRefresh"
          />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Tree from "@/components/tree.vue";
import CertificationBody from "../components/certificationBodyDialog";
import { getSearchAuthOrganList, getSubjecttree, deleteAuthOrgan} from "@/api/api.js";
export default {
  data() {
    return {
      animation:false,//图标旋转参数
      treeData: [],
      rowData: {
       	page: "1",
		    rows: "10"
      },
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      checked: false,
      selectMenu: '',
      nodeData: '', // 当前树
      parent_catalog: ''
    };
  },

  components: {
    Tree,
    CertificationBody  // 二级
  },

  computed: {},
  created() {
    this.getSubjecttree()
    this.getSearchAuthOrganList('-1')
  },
  methods: {
    // 获取专题目录树
    getSubjecttree() {
      getSubjecttree().then((res)=>{
        if(res.code == 1){
          this.treeData = res.data.subjectTree
        }
      });
    },
    // 获取列表
    getSearchAuthOrganList(val) {
      this.parent_catalog = val
      this.rowData.page = `${this.pageNum}`
      this.rowData.rows = `${this.pageSize}`

      getSearchAuthOrganList({
        catalog_id: val,
        ...this.rowData
      }).then((res)=>{
        this.tableData = res.rows
      });
    },
    tableHeaderColor({ row, rowIndex, column, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color:#f6f7fb;color:#000;";
      }
    },
    changeTreeData(e, val) {
      this.nodeData = e.node
      this.getSearchAuthOrganList(e.data.id)
    },
    // 刷新树
    menuRefresh(val) {
      this.getSubjecttree();
      this.getSearchAuthOrganList(val)
    },
    // 添加
    addTreeNode(e) {
      // 1级 2级添加 二级菜单 3级添加3级菜单
      if(this.nodeData){
        let level = this.nodeData.level;
        
        if(level == 3){
          this.$refs.myclass.parentHandleclick(this.parent_catalog);
        }else{
          this.$message({
              type: "error",
              message: "只能关联第三级!",
          });
        }

      }else{
        this.$message({
            type: "error",
            message: "请选择目录!",
        });
        // this.$refs.myclass.parentHandleclick(this.parent_catalog);
      }
    },
    // 删除菜单按钮
    handleDelete(val) {
      let that = this;
      console.log(val);
      this.$confirm("是否确定移除该关联机构？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除请求
          deleteAuthOrgan({ catalog_id: val.catalog_id }).then(function (response) {
            if (response.code == "1") {
              that.$message({
                type: "success",
                message: "移除成功!",
              });
              that.getSubjecttree();
              that.getSearchAuthOrganList(val.parent_catalog)
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    handleSizeChange(val) {
      this.pageNum = val
      this.getSearchTechnologyList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getSearchTechnologyList()
    },
  },
};
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
    width: 100px;
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
    padding-right:15px;
  }
</style>
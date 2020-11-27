<!-- 解决方案目录 -->
<template>
  <div class="wrapper">
    <el-container class="organ_menu">
      <el-header height="57px">解决方案目录管理</el-header>
      <el-container>
        <el-aside width="230px">
          <div class="menu__structure">
            <i class='iconfont iconcaidan' id="menu__icon"></i>
            目录
            <i 
              class='el-icon-refresh' 
              id="menu__refresh"
              :class="animation && 'animation'"
              @click="animation=!animation;menuRefresh(parent_catalog)"></i>
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
            >新建</el-button
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
            <el-table-column prop="catalog_seq" label="序号" ></el-table-column>
            <el-table-column prop="catalog_name" label="名称"></el-table-column>
            <el-table-column width="150px" label="操作">
               <template slot-scope="scope">
              <el-button
                @click="handleAudit(scope.row)"
                type="text"
                size="small"
                >修改</el-button
              >
              <el-button
                @click="handleDelete(scope.row)"
                type="text"
                size="small"
                >删除</el-button
              >
            </template>
            </el-table-column>
          </el-table>
          <CaseCatalogDialog
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
import CaseCatalogDialog from "../components/caseCatalogDialog";
import SecondDialog from "../components/secondDialog";
import { getCaseSubCatalogList, getCaseTreeList, deleteCaseCatalog} from "@/api/api.js";
export default {
  data() {
    return {
      animation:false,//图标旋转参数
      treeData: [],
      tableData: [],
      checked: false,
      selectMenu: '',
      nodeData: '', // 当前树
      parent_catalog: ''
    };
  },

  components: {
    Tree,
    CaseCatalogDialog  // 二级
  },

  computed: {},
  created() {
    this.getCaseTreeList()
    this.getCaseSubCatalogLists('-1')
  },
  methods: {
    // 获取专题目录树
    getCaseTreeList() {
      getCaseTreeList().then((res)=>{
        this.treeData = res
      });
    },
    // 获取列表
    getCaseSubCatalogLists(val) {
      this.parent_catalog = val
      getCaseSubCatalogList({
        parent_catalog: val
      }).then((res)=>{
        this.tableData = res
      });
    },
    tableHeaderColor({ row, rowIndex, column, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color:#f6f7fb;color:#000;";
      }
    },
    changeTreeData(e, val) {
      this.nodeData = e.node
      this.getCaseSubCatalogLists(e.data.id)
    },
    // 刷新树
    menuRefresh(val) {
      this.getCaseTreeList();
      this.getCaseSubCatalogLists(val)
    },
    // 添加
    addTreeNode(e) {
      // 1级 添加二级菜单 2 3级添加三级菜单
      if(this.nodeData){
        let level = this.nodeData.level;
        
        if(level == 1 || level == 2 || level == 3){
          this.$refs.myclass.parentHandleclick(this.parent_catalog, level);
        }else{
          this.$message({
              type: "error",
              message: "最多只能添加四级哦!",
          });
        }
      }else{
        this.$refs.myclass.parentHandleclick(this.parent_catalog);
      }
    },
    // 修改
    handleAudit(row) {
      // 1级 添加二级菜单 2 3级添加三级菜单
      let level = this.nodeData.level;
      this.$refs.myclass.editScene(row, level);
    },
    // 删除菜单按钮
    handleDelete(val) {
      let that = this;
      console.log(val);
      this.$confirm("此操作将永久删除该目录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除请求
          deleteCaseCatalog({ catalog_id: val.catalog_id }).then(function (response) {
            console.log(response);
            if (response.code == "1") {
              that.$message({
                type: "success",
                message: "删除成功!",
              });
              that.getCaseTreeList();
              that.getCaseSubCatalogLists(val.parent_catalog)
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

</style>
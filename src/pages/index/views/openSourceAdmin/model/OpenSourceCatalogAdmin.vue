<!-- 开源软件目录 -->
<template>
  <div class="wrapper">
    <el-container class="organ_menu">
      <el-header height="57px">开源软件目录管理</el-header>
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
            <el-table-column prop="catalog_name" label="目录名称" ></el-table-column>
            <el-table-column prop="catalog_seq" label="序号"></el-table-column>
            <el-table-column prop="create_date" label="创建时间"></el-table-column>
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
          <ClassDialog
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
import ClassDialog from "../components/classDialog";
import { getOpenSubCatalogList, getOpenSourceCatalogTree, deleteOpenSourceCatalog} from "@/api/api.js";
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
    ClassDialog  // 二级
  },

  computed: {},
  created() {
    this.getOpenSourceCatalogTree()
    this.getOpenSubCatalogLists('-1')
  },
  methods: {
    // 获取专题目录树
    getOpenSourceCatalogTree() {
      getOpenSourceCatalogTree().then((res)=>{
        this.treeData = res
      });
    },
    // 获取列表
    getOpenSubCatalogLists(val) {
      this.parent_catalog = val
      getOpenSubCatalogList({
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
      this.getOpenSubCatalogLists(e.data.id)
    },
    // 刷新树
    menuRefresh(val) {
      this.getOpenSourceCatalogTree();
      this.getOpenSubCatalogLists(val)
    },
    // 添加
    addTreeNode(e) {
      // 1级 2级添加 二级菜单 3级添加3级菜单
      if(this.nodeData){
        let level = this.nodeData.level;
        this.$refs.myclass.parentHandleclick(this.parent_catalog);
      }else{
        this.$refs.myclass.parentHandleclick(this.parent_catalog);
      }
    },
    // 修改
    handleAudit(row) {
      // 1级 2级添加 二级菜单 3级添加3级菜单
      let level = this.nodeData.level;
      
      this.$refs.myclass.editScene(row);
    },
    // 删除菜单按钮
    handleDelete(val) {
      let that = this;
      console.log(val);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除请求
          deleteOpenSourceCatalog({ catalog_id: val.catalog_id }).then(function (response) {
            console.log(response);
            if (response.code == "1") {
              that.$message({
                type: "success",
                message: "删除成功!",
              });
              that.getOpenSourceCatalogTree();
              that.getOpenSubCatalogLists(val.parent_catalog)
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
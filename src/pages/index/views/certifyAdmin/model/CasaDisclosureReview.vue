<!-- 解决方案披露审核 -->
<template>
  <div class="wrapper">
    <el-container class="organ_menu">
      <el-header height="57px">解决方案披露审核</el-header>
      <el-container>
        <el-aside width="230px">
          <div class="menu__structure">
            <i class='iconfont iconcaidan' id="menu__icon"></i>
            目录
            <i 
              class='el-icon-refresh' 
              id="menu__refresh"
              :class="animation && 'animation'"
              @click="animation=!animation;menuRefresh(catalog_id)"></i>
          </div>
          <Tree :dataList="treeData" @changeNode="changeTreeData" class="treemenu"></Tree>
        </el-aside>
        <el-main>
            <g-tabs
              :model="activeName"
              :tabpane="tabData"
              :type="'card'"
              class="tabs-box"
              @tab-click="handleTabChange"
            >
            </g-tabs>
            <!-- 表格 -->
            <el-table
              :data="tableData" 
              :row-style="{ height: '40px',color: '#000' }" 
              :cell-style="{ padding: '0' }" 
              style="width: 96%; margin-left: 2%;font-size: 12px;"
              :header-cell-style="tableHeaderColor"
            >
              <el-table-column prop="case_name" label="解决方案名称" ></el-table-column>
              <el-table-column prop="publish_status" label="发布状态"></el-table-column>
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
          <CasaDisclosureDialog
            ref="myclass"
            @classhandle="menuRefresh"
          />

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
  </div>
</template>

<script>
import Tree from "@/components/tree.vue";
import CasaDisclosureDialog from "../components/casaDisclosureDialog";
import SecondDialog from "../components/secondDialog";
import { getSearchCaseByCatalog, getCaseTreeList, deleteCase} from "@/api/api.js";
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
        nodeData: '', // 当前树
        catalog_id: '',
        activeName: "toAudit",
        tabData: [
          { label: "待审核", name: "toAudit", count: 4 },
          { label: "通过", name: "auditPass", count: 0 },
          { label: "拒绝", name: "auditRefuse", count: 99 },
        ],
    };
  },

  components: {
    Tree,
    CasaDisclosureDialog  // 二级
  },

  computed: {},
  created() {
    this.getCaseTreeList()
    this.getSearchCaseByCatalogs('-1')
  },
  methods: {
    // 获取专题目录树
    getCaseTreeList() {
      getCaseTreeList().then((res)=>{
        this.treeData = res
      });
    },
    // 获取列表
    getSearchCaseByCatalogs(val) {
      this.catalog_id = val
      this.rowData.page = `${this.pageNum}`
      this.rowData.rows = `${this.pageSize}`
      getSearchCaseByCatalog({
        catalog_id: val
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
      this.getSearchCaseByCatalogs(e.data.id)
    },
    // 刷新树
    menuRefresh(val) {
      this.getCaseTreeList();
      this.getSearchCaseByCatalogs(val)
    },
    // tab
    handleTabChange(tab, event) {

    },
    handleSizeChange(val) {
        this.pageNum = val
        this.getSearchCaseByCatalogs()
    },
    handleCurrentChange(val) {
        this.pageNum = val
        this.getSearchCaseByCatalogs()
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
.tabs-box{
  margin-top: 20px;
  padding-left: 20px;
}
</style>
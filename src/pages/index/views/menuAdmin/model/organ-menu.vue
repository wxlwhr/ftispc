<!-- 机构菜单管理页面 -->
<template>
  <div class="organ_menu">
    <el-container class="organ_menu">
      <el-header height="57px">机构菜单管理</el-header>
      <el-container>
        <el-aside width="230px">
          <div class="menu__structure">
            <i class="iconfont iconcaidan" id="menu__icon"></i>
            结构菜单
            <i
              class="el-icon-refresh"
              id="menu__refresh"
              :class="animation && 'animation'"
              @click="animation=!animation, menuRefresh"
              title="刷新"
            ></i>
          </div>
          <Tree
            ref="treeX"
            :dataList="treeData"
            @changeNode="changeTreeData"
            class="treemenu"
          ></Tree>
        </el-aside>
        <el-main>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addTreeNode"
            size="medium"
            class="addMenuBtn"
            >新建菜单</el-button
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
            :row-style="{ height: '40px', color: '#000' }"
            :cell-style="{ padding: '0' }"
            style="
              width: 96%;
              margin-top: 20px;
              margin-left: 2%;
              font-size: 12px;
            "
            :header-cell-style="tableHeaderColor"
          >
            <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
            <el-table-column
              prop="module_name"
              label="菜单名称"
              width="300"
            ></el-table-column>
            <el-table-column
              prop="module_url"
              label="url地址"
            ></el-table-column>
            <el-table-column
              prop="is_open_disp"
              label="是否公开"
              align="center"
            ></el-table-column>
            <el-table-column prop="amount3" label="排序" align="center">
              <template slot-scope="scope">
                <!-- <span><img src="@/assets/arrow_up_normal.png" alt="上升" style="width:8px;height:15px;"></span>
                <span><img src="@/assets/arrow_down_normal.png" alt="下降" style="width:8px;height:15px;margin-left:15px"></span> -->
                <span @click="upListItem(scope.row)">
                  <i class="el-icon-top" style="width: 10px; height: 20px; color: #2882fe"></i>
                </span>
                <span
                  style="width: 10px; height: 20px; padding-left: 15px"
                  @click="downListItem(scope.row)"
                  ><i
                    class="el-icon-bottom"
                    style="width: 8px; height: 15px"
                  ></i
                ></span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="handleAmend(scope.row)"
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
          <!-- <Dialog ref="mychild" :dataList='dialogForm'></Dialog> -->
          <Dialog
            ref="mychild"
            :select="selectMenu"
            @handle="handleAddIfor"
            @amend="handleAmendIfor"
          />
          <!-- <Xiugai ref="xg"/> -->
        </el-main></el-container
      ></el-container
    >
  </div>
</template>

<script>
import Dialog from "../components/dialog";
import {
  getTree,
  addSonMenu,
  getMenuList,
  deleteMenu,
  changeMenu,
  changeMenuOrder,
} from "@/api/api.js";
export default {
  data() {
    return {
      animation:false,//图标旋转参数
      treeData: [],
      tableData: [],
      checked: false,
      selectMenu: "",
      select: "",
    };
  },

  components: {
    Dialog,
  },

  computed: {},

  methods: {
    tableHeaderColor({ row, rowIndex, column, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color:#f6f7fb;color:#000;";
      }
    },
    changeTreeData(e, val) {
      // this.$refs.treeX.setCurrent(e);
      console.log(e);
      this.selectMenu = e.data.name;
      this.select = e.data.id;
      this.getMenu(e.data.id);
    },
    addTreeNode(e) {
      this.$refs.mychild.parentHandleclick(this.id);
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
    // 刷新树
    menuRefresh() {
      console.log("刷新菜单");
      this.getTreeData();
    },
    // 新建子菜单事件
    handleAddIfor(value) {
      console.log(value, "-------------------");
      let that = this;
      let data = {
        parent_id: this.select,
        module_name: value.module_name,
        is_open: value.is_open,
        module_url: value.module_url,
        module_seq: value.module_seq,
      };
      // 这里调用新增的接口
      addSonMenu(data).then(function (response) {
        that.getTreeData();
        console.log(response);
      });
    },
    // 左边树控件数据请求
    getTreeData() {
      let _this = this;
      getTree().then(function (response) {
        _this.treeData = response.data.module;
        console.log(response);
      });
    },
    // 修改按钮事件
    handleAmend(value) {
      this.$refs.mychild.amend(value);
    },
    handleAmendIfor(value) {
      console.log(value, "============");
      let that = this;
      let data = {
        parent_id: this.select,
        module_name: value.module_name,
        is_open: value.is_open,
        module_url: value.module_url,
        module_seq: value.module_seq,
      };
      // 这里调用新增的接口
      changeMenu(data).then(function (response) {
        that.getTreeData();
        console.log(response);
      });
    },
    // 获取菜单列表
    getMenu(val) {
      let that = this;
      getMenuList({ parent_id: val }).then(function (response) {
        console.log(response);
        that.tableData = response;
      });
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
          deleteMenu({ ids: [val.module_id] }).then(function (response) {
            console.log(response);
            if (response.code == "1") {
              that.$message({
                type: "success",
                message: "删除成功!",
              });
              that.getTreeData();
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
    // 排序 上升
    upListItem(e) {
      console.log(e);
      let that = this;
      let a = e.module_id;
      let arr = [];
      let data = this.tableData;
      for (let i = 0; i < data.length; i++) {
        if (a == data[i].module_id) {
          let list = data.splice(i, 1);
          data.splice(i - 1, 0, e);
          changeMenuOrder(data).then(function (response) {
            console.log(response);
            that.getTreeData();
          });
        }
      }
    },
    // 排序下降
    downListItem(e) {
      console.log(e);
      let that = this;
      let a = e.module_id;
      let arr = [];
      let data = this.tableData;
      for (let i = 0; i < data.length; i++) {
        if (a == data[i].module_id) {
          let list=data.splice(i, 1);
          let arr1=[]
          for(let j = 0; j < data.length; j++){
            arr1.push(data[j])
          }
          arr1.splice(i+1,0,e)
          this.tableData=arr1
          // ********
          // let arr1=data.slice(0,i)
          // let arr2=data.slice(i+1)
          // let arr3=arr2.splice(1,0,e)
          // let dataList=arr1.concat(arr2)
          // ***********

          changeMenuOrder(arr1).then(function (response) {
            console.log(response);
            that.getTreeData();
          });
        }
      }
    },
  },
  created() {
    this.getTreeData();
    this.getMenu('-1');
  },
  mounted(){
    
  }
};
</script>
<style lang='scss' scoped>
@import '../css/menuAdmin.scss'

</style>
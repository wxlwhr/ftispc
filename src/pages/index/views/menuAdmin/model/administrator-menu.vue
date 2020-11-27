<!-- 机构菜单管理页面 -->
<template>
  <div class="organ_menu">
    <el-container class="organ_menu">
      <el-header height="57px">管理员菜单管理</el-header>
      <el-container>
        <el-aside width="230px">
          <div class="menu__structure">
            <i class="iconfont iconcaidan" id="menu__icon"></i>
            结构菜单
            <i
              class="el-icon-refresh"
              id="menu__refresh"
              :class="animation && 'animation'"
              @click="animation = !animation"
              title="刷新"
            ></i>
          </div>
          <Tree
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
              prop="id"
              label="菜单名称"
              width="300"
            ></el-table-column>
            <el-table-column prop="amount1" label="url地址"></el-table-column>
            <el-table-column
              prop="amount3"
              label="是否公开"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="amount2"
              label="排序"
              align="center"
            ></el-table-column>
            <el-table-column prop="amount2" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="handleAudit(scope.row)"
                  type="text"
                  size="small"
                  >修改</el-button
                >
                <el-button
                  @click="handleView(scope.row)"
                  type="text"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Tree from "@/components/tree.vue";
export default {
  data() {
    return {
      animation: false, //图标旋转参数
      treeData: [
        {
          id: "11111111",
          level: "0",
          name: "根目录",
          parentId: "-1",
          children: [
            {
              id: "10010000",
              level: "0",
              name: "菜单管理",
              parentId: "11111111",
              children: [
                {
                  children: [],
                  id: "10010100",
                  level: "1",
                  name: "机构菜单管理",
                  parentId: "10010000",
                },
                {
                  children: [],
                  id: "10010200",
                  level: "1",
                  name: "管理员菜单管理",
                  parentId: "10010000",
                },
              ],
            },
            {
              id: "10020000",
              level: "0",
              name: "角色管理",
              parentId: "11111111",
              children: [
                {
                  children: [],
                  id: "10020100",
                  level: "1",
                  name: "机构角色管理",
                  parentId: "10020000",
                },
                {
                  children: [],
                  id: "10020200",
                  level: "1",
                  name: "管理员角色管理",
                  parentId: "10020000",
                },
              ],
            },
            {
              id: "10010000",
              level: "0",
              name: "用户管理",
              parentId: "11111111",
              children: [
                {
                  children: [],
                  id: "10010100",
                  level: "1",
                  name: "机构用户管理",
                  parentId: "10010000",
                },
                {
                  children: [],
                  id: "10010200",
                  level: "1",
                  name: "机构管理员管理",
                  parentId: "10010000",
                },
                {
                  children: [],
                  id: "10010200",
                  level: "1",
                  name: "平台管理员管理",
                  parentId: "10010000",
                },
              ],
            },
          ],
        },
      ],
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
      checked: false,
    };
  },

  components: {
    Tree,
  },

  computed: {},

  methods: {
    tableHeaderColor({ row, rowIndex, column, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color:#f6f7fb;color:#000;";
      }
    },
    changeTreeData(e, val) {
      console.log(e);
      console.log(val);
    },
    addTreeNode(e) {
      console.log(e);
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
  created() {
    for (let i in this.treeData) {
      console.log(i);
    }
  },
};
</script>
<style lang='scss' scoped>
@import '../css/menuAdmin.scss'
</style>
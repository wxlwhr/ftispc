<template>
  <div class="product">
    <div class="product-title">
      <span class="product-title-tag"></span>
      <span class="product-title-tit">数字化转型产品解决方案列表</span>
    </div>
    <div class="product-content">
      <div class="product-content-left">
        <div class="title">
          <img src="@/assets/catalog.png" alt="" />
          目录
        </div>
        <div class="tree">
          <el-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </div>
      <div class="product-content-right">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="case_name" label="解决方案名称" width="auto">
          </el-table-column>
          <el-table-column prop="creator_organ_name" label="机构名称" width="auto">
          </el-table-column>
          <el-table-column prop="create_date" label="发布时间" width="auto">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" type="text" size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { caseTree, caseList } from "@/api/api.js";
export default {
  name: "Solution",
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      tableData: [
      ],
    };
  },

  components: {},

  computed: {},

  methods: {
    handleView(row) {
      console.log(row);
      this.$router.push({path:"/solutionInfo",query:{id:row.case_id}});
    },
    handleNodeClick(data) {
      console.log(data);
      if (data.level === "3") {
        this.getCaseList(data.id);
      }
    },
    // 产品树获取
    async handelecasetree() {
      let that = this;
      await caseTree().then(function (res) {
        // that.data=res.data.productTree[0].children
        that.data = res.data.caseTree;
        console.log(res);
      });
    },
    // 根据产品树获取产品列表
    getCaseList(val) {
      let that = this;
      let data = {
        catalog_id: val
      };
      caseList(data).then(function (res) {
        that.tableData = res.data.casePageInfo.rows;
        console.log(res);
      });
    },
  },
  created() {
    this.handelecasetree();
  },
};
</script>
<style lang='scss' scoped>
.product {
  height: 100%;
  padding: 0 360px;
  min-height: 77.25rem;
  &-title {
    margin-top: 1.79rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: start;

    &-tag {
      width: 0.29rem;
      height: 24px;
      background-color: #2882fe;
    }

    &-tit {
      font-size: 24px;
      color: #35393f;
      font-weight: bold;
      margin-left: 1rem;
    }
  }
  &-content {
    height: 61.57rem;
    box-shadow: 0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1);
    border: 1px solid #d6dce7;
    display: flex;

    &-left {
      width: 220px;
      height: 100%;
      border-right: 1px solid #d6dce7;

      .title {
        img {
          vertical-align: middle;
        }
        height: 4rem;
        line-height: 4rem;
        border-bottom: 1px solid #d6dce7;
        padding-left: 1rem;
        font-size: 1.4rem;
        color: #35393f;
        font-weight: bold;
      }
      .tree {
        margin-top: 0.93rem;
        padding: 0 1rem;
      }
    }

    &-right {
      padding: 15px;
      width: calc(100% - 220px);
      font-size: 1rem;
    }
  }
}
</style>
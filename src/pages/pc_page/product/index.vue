<template>
  <div class="product">
    <div class="product-title">
      <span class="product-title-tag"></span>
      <span class="product-title-tit">数字化转型专题产品列表</span>
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
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </div>
      <div class="product-content-right">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="auto"> </el-table-column>
          <el-table-column prop="province" label="省份" width="auto"> </el-table-column>
          <el-table-column prop="city" label="市区" width="auto"> </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleView(scope.row)"
                type="text"
                size="small"
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
export default {
  name:"Product",
  data() {
    return {
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
    };
  },

  components: {},

  computed: {},

  methods: {
    handleView(row) {
      console.log(row);
      this.$router.push('/productInfo')
    },
    handleNodeClick(data) {
      console.log(data);
    },
  },
};
</script>
<style lang='scss' scoped>
.product {
  height: 100%;
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
        height: 3.57rem;
        line-height: 3.57rem;
        border-bottom: 1px solid #d6dce7;
        padding-left: 1rem;
        font-size: 1.14rem;
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
    }
  }
}
</style>
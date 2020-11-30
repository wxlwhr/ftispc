<template>
  <div class="productInfo">
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品概述</span>
    </div>
    <img src="@/assets/2_05.jpg" style="width:100%" alt="" />
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品功能</span>
    </div>
    <img src="@/assets/2_09.jpg"  style="width:100%" alt="" />
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品优势</span>
    </div>
    <img src="@/assets/2_13.jpg"  style="width:100%"  alt="" />
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">关联解决方案</span>
    </div>
    <div class="productInfo-solution">
      <el-carousel trigger="click" height="15.188rem">
        <el-carousel-item v-for="item in solutionData" :key="item">
          <el-row style="height: 15.188rem">
            <el-col v-for="(v, i) in item" :key="i" :span="6">
              <div>
                <div>
                  <img src="@/assets/Solution.png" alt="" />
                  <span>{{ v.title }}</span>
                </div>
                <div class="goto">
                  <img src="@/assets/arrow_right.png" alt="" />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name:"ProductInfo",
  components: {},
  props: {},
  data() {
    return {
      solutionData: [
        { title: "解决方案名称" },
        { title: "解决方案名称" },
        { title: "解决方案名称" },
        { title: "解决方案名称" },
        { title: "解决方案名称" },
        { title: "解决方案名称" },
        { title: "解决方案名称" },
        { title: "解决方案名称" },
        { title: "第九个" },
        { title: "解决方案名称" },
        { title: "解决方案名称" }
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
      this.dealSolutionData()
  },
  methods: {
    dealSolutionData() {
      const data = this.solutionData;
      let newData = [];
      for (var i = 0; i < data.length; i += 8) {
        newData.push(data.slice(i, i + 8));
      }
      this.solutionData = newData
    },
  },
};
</script>
<style lang="scss" scoped>
.productInfo {
  width: 100%;
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
      margin-left: 1rem;
    }
  }
  &-solution {
    width: 100%;
    .el-col {
      padding: 0 0.834rem;
      > div {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ffffff;
        border: solid 0.063rem #e9ecf7;
        margin-bottom: 1.668rem;
        padding: 0 1.66rem;
        img:first-child {
          vertical-align: sub;
        }
        .goto {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
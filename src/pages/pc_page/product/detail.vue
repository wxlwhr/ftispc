<template>
  <div class="productInfo">
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品概述</span>
    </div>
    <img src="@/assets/2_05.jpg" alt="" />
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品功能</span>
    </div>
    <img src="@/assets/2_09.jpg" alt="" />
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品优势</span>
    </div>
    <img src="@/assets/2_13.jpg" alt="" />
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">关联解决方案</span>
    </div>
    <div class="productInfo-solution">
      <el-carousel :autoplay="false" trigger="click" height="15.188rem">
        <el-carousel-item v-for="(item, index) in solutionData" :key="index">
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
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">客户案例</span>
    </div>
    <img src="@/assets/2_16.jpg" alt="" />
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品评价</span>
    </div>
    <div class="productInfo-evaluate">
      <div class="productInfo-evaluate-num">
        <span class="number">45</span>
        <span>条评价</span>
      </div>
      <div class="productInfo-evaluate-content">
        <div style="color: #35393f; margin-bottom: 10px;font-weight: bold;">发表评价</div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="evaluate"
        >
        </el-input>
        <div class="productInfo-evaluate-footer">
          <el-checkbox v-model="isOpen">是否公开</el-checkbox>
          <el-button class="footer-btn" type="primary">发表</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        { title: "解决方案名称" },
      ],
      evaluate: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.dealSolutionData();
  },
  methods: {
    dealSolutionData() {
      const data = this.solutionData;
      let newData = [];
      for (var i = 0; i < data.length; i += 8) {
        newData.push(data.slice(i, i + 8));
      }
      this.solutionData = newData;
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
  &-evaluate {
      margin-bottom: 20px;
    &-num {
      .number {
        color: #ff6854;
        font-size: 24px;
        font-family: Georgia;
      }
    }
    &-content {
      padding: 16px;
      background-color: #eaeef2;
      border: solid 1px #ccd3df;
      margin-top: 15px;
    }
    .el-textarea__inner {
      color: #35393f;
      background-color: #e5e5e5;
    }
    &-footer {
      text-align: end;
      margin-top: 16px;
      .footer-btn {
        margin-left: 25px;
        width: 64px;
        height: 30px;
        padding: 0;
        background-color: #2882fe;
      }
    }
  }
}
</style>
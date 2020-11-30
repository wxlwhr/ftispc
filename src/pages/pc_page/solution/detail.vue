<template>
  <div class="solutionInfo">
    <div class="solutionInfo-title">
      <span class="solutionInfo-title-tag"></span>
      <span class="solutionInfo-title-tit">解决方案详情</span>
    </div>
    <!-- <div class="solutionInfo-children-title">方案简介</div> -->
    <img src="@/assets/3_05.jpg" style="width: 100%" alt="" />
    <!-- <div class="solutionInfo-children-title">方案优势</div> -->
    <div class="solutionInfo-title">
      <span class="solutionInfo-title-tag"></span>
      <span class="solutionInfo-title-tit">涉及产品</span>
    </div>
    <div class="solutionInfo-solution">
      <el-carousel :autoplay="false" trigger="click" height="15.188rem">
        <el-carousel-item v-for="(item, index) in productData" :key="index">
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
    <div class="solutionInfo-title">
      <span class="solutionInfo-title-tag"></span>
      <span class="solutionInfo-title-tit">解决方案评价</span>
    </div>
    <div class="solutionInfo-evaluate">
      <div class="solutionInfo-evaluate-num">
        <span class="number">45</span>
        <span>条评价</span>
      </div>
      <div class="solutionInfo-evaluate-content">
        <div style="color: #35393f; margin-bottom: 10px;font-weight: bold;">发表评价</div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="evaluate"
        >
        </el-input>
        <div class="solutionInfo-evaluate-footer">
          <el-checkbox v-model="isOpen">是否公开</el-checkbox>
          <el-button class="footer-btn" type="primary" @click="handlecomment()">发表</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SolutionInfo",
  data() {
    return {
      productData: [
        { title: "智能决策产品" },
        { title: "解决方案名称2" },
        { title: "解决方案名称3" },
        { title: "解决方案名称4" },
        { title: "解决方案名称5" },
        { title: "解决方案名称6" },
        { title: "解决方案名称7" },
        { title: "解决方案名称8" },
        { title: "第九个" },
        { title: "解决方案名称" },
        { title: "解决方案名称" },
      ],
    };
  },

  components: {},

  computed: {},

  methods: {
    dealSolutionData() {
      const data = this.productData;
      let newData = [];
      for (var i = 0; i < data.length; i += 8) {
        newData.push(data.slice(i, i + 8));
      }
      this.productData = newData;
    },
    handlecomment(){
        
    }
  },
  mounted(){
      this.dealSolutionData();
  }
};
</script>
<style lang='scss' scoped>
.solutionInfo {
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
      font-size: 26px;
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
  &-children-title {
    font-size: 24px;
    color: #343436;
  }
}
</style>
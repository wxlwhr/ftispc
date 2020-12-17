<template>
<div class="productInfo-box">
  <div class="top-bg" :style="productBg">
      <p>
        {{product_Infor.product_name}}
      </p>
  </div>

  <div class="productInfo">

    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品概述</span>
    </div>
    <div class="ql-snow">
      <div class="ql-snow ql-editor" v-html="product_Infor.product_des"></div>
    </div>
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品功能</span>
    </div>
    <div class="ql-snow">
      <div class="ql-editor" v-html="product_Infor.product_func"></div>
    </div>
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品优势</span>
    </div>
    <div class="ql-snow">
      <div class="ql-editor" v-html="product_Infor.product_adv"></div>
    </div>
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品场景</span>
    </div>
    <div class="ql-snow">
      <div class="ql-editor" v-html="product_Infor.product_scene"></div>
    </div>
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
                  <span>{{ v.case_name }}</span>
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
    <div class="ql-snow">
      <div class="ql-editor" v-html="product_Infor.product_case"></div>
    </div>
    <div class="productInfo-title">
      <span class="productInfo-title-tag"></span>
      <span class="productInfo-title-tit">产品评价</span>
    </div>
    <div class="productInfo-evaluate">
      <div class="productInfo-evaluate-num">
        <span class="number">{{ productcommentList.length }}</span>
        <span>条评价</span>
      </div>
      <div class="productInfo-evaluate-content">
        <div style="color: #35393f; margin-bottom: 10px;font-size:1.1rem; font-weight: bold">
          发表评价
        </div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="evaluate"
        >
        </el-input>
        <div class="productInfo-evaluate-footer">
          <el-checkbox v-model="isOpen">是否公开</el-checkbox>
          <el-button
            class="footer-btn"
            type="primary"
            @click="handleproductComment"
            >发表</el-button
          >
        </div>
      </div>
    </div>
    <div class="commit-content">
      <ul class="commit-list">
        <li
          class="col"
          v-for="(item, index) in productcommentList"
          :key="index"
        >
          <div class="img-box">
            <img src="@/assets/logo.png" alt="" />
          </div>
          <!--  -->
          <div class="content">
            <p>
              {{ item.comment_organ_name }}<span>{{ item.create_date }}</span>
            </p>
            <p>{{ item.comment_content }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="consult-img" @click="handleproductask">
      <img src="@/assets/consult.png" alt="" />
      <div>产品咨询</div>
    </div>
    <!-- 咨询弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span class="text-area">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入需要咨询的问题"
          v-model="textarea"
        >
        </el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlesubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import { productDetail, productAsk, productComment } from "@/api/api.js";
export default {
  name: "ProductInfo",
  components: {},
  props: {},
  data() {
    return {
      solutionData: [],
      evaluate: "",
      isOpen: false,
      id: "",
      dialogVisible: false,
      textarea: "",
      product_Infor: "", //产品详情
      num: "",
      productcommentList: [],
      productBg: {
        background:
          " url(" +
          require("@/assets/top-bg.jpg") +
          ") no-repeat scroll center center / 100% ",
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    let id = this.$route.query.id;
    this.id = id;
    this.getDetail(id);
    console.log(this.$route.query);
  },
  mounted() {
    // this.dealSolutionData();
  },
  methods: {
    async getDetail(id) {
      let that = this;
      let data = {
        product_id: id,
      };
      await productDetail(data).then(function (res) {
        that.product_Infor = res.data.product;
        that.productcommentList = res.data.productCommentList;
        let solutionData = res.data.caseList;
        that.dealSolutionData(solutionData);
        console.log(that.solutionData);
        console.log(res);
      });
    },
    dealSolutionData(data) {
      let newData = [];
      for (var i = 0; i < data.length; i += 8) {
        newData.push(data.slice(i, i + 8));
      }
      this.solutionData = newData;

    },
    handlecomment() {},
    handleproductask() {
      this.dialogVisible = true;
    },
    // 提交产品咨询
    handlesubmit() {
      let that = this;
      let data = {
        ask_content: this.textarea,
        product_id: this.id,
      };
      if (localStorage.getItem("Authorization")) {
        if (localStorage.getItem("AuthStatus") === "6") {
          productAsk(data).then(function (res) {
            console.log(res);
            that.textarea=""
          });
        }
      } else {
        this.$message.warning("未登录，请先登录后提交内容");
      }
    },
    // 提交评论
    handleproductComment() {
      let that = this;
      let is = "";
      if (this.isOpen) {
        is = "1";
      } else {
        is = "0";
      }
      let data = {
        product_id: this.id,
        is_open: is,
        comment_content: this.evaluate,
      };
      if (localStorage.getItem("Authorization")) {
        if (localStorage.getItem("AuthStatus") === "6") {
          productComment(data).then(function (res) {
            console.log(res);
            if (res.code === "1") {
              that.$message.success("评论成功");
              // that.getDetail(that.id)
            } else {
              that.$message.error(res.des);
            }
          });
        }
      } else {
        this.$message.warning("未登录，请先登录后提交内容");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.top-bg{
  height: 15rem;
  p{
    font-size: 3rem;
    color: #fff;
    margin-left: 18.17%;
    line-height: 15rem;
  }
}
.productInfo {
  width: 62.5%;
  margin: 0 auto;
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
        font-size: 1.2rem;
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
  .commit-content {
    padding: 1rem 0 3rem 0;
    .commit-list {
      .col {
        display: flex;
        .img-box {
          img {
          }
        }
        .content {
          margin-left: 1rem;
          height: 6.25rem;
          p:nth-child(1) {
            font-size: 1.5rem;
            color: #586caa;
            span {
              margin-left: 2rem;
              font-size: 1rem;
              color: #97a5b2;
            }
          }
          p:nth-child(2) {
            font-size: 1.2rem;
            color: #3d464e;
          }
        }
      }
    }
  }
  .consult-img {
    background-color: #aaaeb8;
    width: 6.25rem;
    height: 6.25rem;
    position: fixed;
    top: 50%;
    right: 0;
    text-align: center;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    img {
      margin-top: 10%;
    }
    div {
      font-size: 1rem;
      color: #ffffff;
    }
  }
  .el-dialog {
    .text-area {
      height: 10rem;
    }
  }
}
</style>
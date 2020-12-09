<template>
  <div class="index">
    <div class="index-banner">
      <el-carousel trigger="click">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="system-infor">
            <p class="row1">金融科技服务能力共享系统</p>
            <p class="row2">
              打造金融+科技+场景多维开放生态，连接监管机构、金融机构、科技服务商、场景商户
            </p>
            <el-button class="btn">立即查看</el-button>
          </div>
          <img
            src="@/assets/homepage_banner.jpg"
            width="100%"
            height="100%"
            alt=""
          />
        </el-carousel-item>
        <!-- <el-carousel-item>
          <img src="@/assets/dynamic_bg.jpg" width="100%" alt="" />
        </el-carousel-item> -->
      </el-carousel>
    </div>
    <div class="index-tab">
      <div class="col1">
        <img
          src="@/assets/icon1.png"
          style="width: 3rem; height: 3rem"
          alt=""
        />
        <div class="text">
          <p>数字化解决方案</p>
          <p>API能力、中台服务</p>
        </div>
      </div>
      <div class="col1">
        <img
          src="@/assets/icon1.png"
          style="width: 3rem; height: 3rem"
          alt=""
        />
        <div class="text">
          <p>数字化解决方案</p>
          <p>API能力、中台服务</p>
        </div>
      </div>
      <div class="col1">
        <img
          src="@/assets/icon1.png"
          style="width: 3rem; height: 3rem"
          alt=""
        />
        <div class="text">
          <p>数字化解决方案</p>
          <p>API能力、中台服务</p>
        </div>
      </div>
      <div class="col1">
        <img
          src="@/assets/icon1.png"
          style="width: 3rem; height: 3rem"
          alt=""
        />
        <div class="text">
          <p>数字化解决方案</p>
          <p>API能力、中台服务</p>
        </div>
      </div>
    </div>
    <div class="index-product" :style="productBg">
      <div class="index-product-box">
        <div class="row">
          <p>产品</p>
          <span @click="handleToproduct"
            >更多<img src="@/assets/arrow_right.png" alt=""
          /></span>
        </div>
        <div class="title">技术产品</div>
        <div class="list">
          <div class="col" v-for="(item, index) in productList.slice(0, 4)" :key="index">
            <div class="little_box">
              <div class="row1">
                <img
                  src="@/assets/icon2.png"
                  style="width: 24px; height: 22px"
                  alt=""
                /><span>{{ item.product_name }}</span>
              </div>
              <div class="txt">
                {{ item.product_des }}
              </div>
            </div>
          </div>
        </div>
        <div class="title">业务产品</div>
        <div class="list">
          <div
            class="col"
            v-for="(item, index) in productList.slice(0, 4)"
            :key="'info2-' + index"
          >
            <div class="little_box">
              <div class="row1">
                <img
                  src="@/assets/icon2.png"
                  style="width: 24px; height: 22px"
                  alt=""
                /><span>{{ item.product_name }}</span>
              </div>
              <div class="txt">
                {{ item.product_des }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="index-solution">
      <div class="index-solution-left" :style="leftBg">
        <div class="solution-box">
          <p class="title">解决方案</p>
          <p class="content">
            解决方案解决方案解决方案解决方案解决方案解决方案
            解决方案解决方案解决方案解决方案解决方案
          </p>
        </div>
      </div>
      <div class="index-solution-right" :style="rightBg">
        <div class="out-box">
          <ul class="row1">
            <li
              class="row1-col"
              :class="tab1 === i ? 'active' : ''"
              v-for="(item, i) in tabdata1"
              :key="i"
              @click="handleTab1(i)"
            >
              {{ item }}
            </li>
            <span
              >更多<img src="@/assets/dynamic_arrow_right.png" alt=""
            /></span>
          </ul>
          <div class="row2">
            <div class="row2-box">
              <div
                class="row2-box-col"
                :class="tab2 === j ? 'active' : ''"
                v-for="(item, j) in tabdata2"
                :key="j"
                @click="handleTab2(item, j)"
              >
                {{ item.catalog_name }}
              </div>
              <!-- <div class="row2-box-col" v-for="(item,index) in solutionTree[1].children" :key="index">{{item.name}}</div> -->
            </div>
          </div>
          <div class="row3">
            <div
              class="row3-col"
              :class="tab3 === k ? 'active' : ''"
              v-for="(item, k) in tabdata3"
              :key="k"
              @click="handleTab3(item, k)"
            >
              <p>{{ item.catalog_name }}</p>
              <p>模块描述模块描述模块描述</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="index-policy" :style="policyBg">
      <div class="index-policy-box">
        <div class="row1">
          <span>政策信息</span
          ><span>更多<img src="@/assets/arrow_right.png" alt="" /></span>
        </div>
        <div class="row2">
          <div
            class="row2-col"
            v-for="(item, index) in policyList"
            :key="index"
          >
            <p>
              {{item.catalog.catalogName}}<span
                ><img
                  src="@/assets/policy_arrow.png"
                  style="width: 0.9375rem; height: 0.875rem"
                  alt=""
              /></span>
            </p>
            <div class="ul-box">
              <ul class="ul_left">
                <li v-for="(item,j) in item.policyList" :key="j">{{item.content_title}}</li>
              </ul>
              <ul class="ul_time">
                <li v-for="(item,j) in item.policyList" :key="j+'1'">{{item.publish_date.slice(5,10)}}</li>
              </ul>
            </div>
          </div>

          
        </div>
      </div>
    </div>
    <div class="index-dynamic">
      <div class="index-dynamic-title">
        <div class="title">
          <span>动态发布</span>
          <span>更多<img src="@/assets/arrow_right.png" alt="" /></span>
        </div>
      </div>
      <div class="index-dynamic-content" :style="dynamicBg">
        <div class="box">
          <!-- <div class="box-left"> -->
          <div class="box-left" v-for="(item, i) in dtlistLeft" :key="i">
            <p class="row1">{{ item.content_title }}</p>
            <p class="row2">
              {{ item.content_text }}
            </p>
            <!-- <p class="row1">文章主题</p>
            <p class="row2">文章内容</p> -->
            <div class="btn">
              查看详情<img src="@/assets/dynamic_arrow_right.png" alt="" />
            </div>
          </div>
          <div class="box-right">
            <el-carousel
              :autoplay="false"
              trigger="click"
              type="card"
              height="160px"
              ref="carousel"
              :initial-index="0"
              @change="handlechange"
            >
              <el-carousel-item
                name="1"
                v-for="(item, index) in imglist"
                :key="index"
              >
                <img
                  :src="item"
                  style="width: 100%; height: 100%"
                  alt=""
                  @click="handlechange(index)"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="index-organ">
      <div class="index-organ-box">
        <div class="title">
          入驻机构
        </div>
        <div>

        </div>
      </div>
    </div> -->
    <div class="plat_intro" :style="organBg">
      <div class="title">入驻机构</div>
      <!-- <div class="a">ad</div> -->
      <div class="plat_infor">
        <OrganList :logolist="organLogoList" v-if="organLogoList.length != 0" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  organList,
  productListData,
  caselistbyparent,
  dynamicList,
  policyIndex,
} from "@/api/api.js";
import OrganList from "@/components/organList";
import img1 from "@/assets/organlogos/logo1.jpg";
import img2 from "@/assets/organlogos/logo2.jpg";
import img3 from "@/assets/organlogos/logo3.jpg";
import img4 from "@/assets/organlogos/logo4.jpg";
import img5 from "@/assets/organlogos/logo5.jpg";
import img6 from "@/assets/organlogos/logo6.jpg";
import img7 from "@/assets/organlogos/logo7.jpg";
import img8 from "@/assets/organlogos/logo8.jpg";
import img9 from "@/assets/organlogos/logo9.jpg";
export default {
  name: "Index",
  data() {
    return {
      plat_infor:
        "金融科技服务能力共享系统是一个以AI驱动产业数字化的新型数字平台。平台以AI、数据技术、物联网、区块链等前沿数字科技为基础，建立并发展起核心的风险管理能力、用户运营能力、产业理解能力和企业服务能力。平台以AI、数据技术、物联网、区块链等前沿数字科技为基础，建立并发展起核心。",
      plat_infor2:
        "金融科技服务能力共享系统是一个以AI驱动产业数字化的新型数字平台。平台以AI、数据技术、物联网、区块链等前沿数字科技为基础，建立并发展起核心的风险管理能力、用户运营能力、产业理解能力和企业服务能力。",
      currentDate: new Date(),
      organLogoList: [],
      productList: [],
      solutionTree: [],
      tabdata1: ["银行业"],
      tabdata2: [],
      tabdata3: [],
      tab1: 0,
      tab2: 0,
      tab3: 0,
      dtlist: [],
      dtlistLeft: [],
      imglist: [],
      policyList: {},
      productBg: {
        background:
          " url(" +
          require("@/assets/pro_bg.png") +
          ") no-repeat scroll center center / 100% ",
      },
      leftBg: {
        background:
          "#e9edf5 url(" +
          require("@/assets/solution_bg1.png") +
          ") no-repeat scroll 70% 50%/40% ",
      },
      rightBg: {
        background:
          "#2c73ff url(" +
          require("@/assets/solution_bg2.png") +
          ") no-repeat scroll 0% 50% /73% 100% content-box ",
      },
      policyBg: {
        background:
          " url(" +
          require("@/assets/policy_bg.png") +
          ") no-repeat scroll 72% center / 21% content-box ",
      },
      dynamicBg: {
        background:
          " url(" +
          require("@/assets/dynamic_bg.jpg") +
          ") no-repeat scroll center center /100%",
      },
      organBg: {
        background:
          " url(" +
          require("@/assets/organ_bg.jpg") +
          ") no-repeat scroll center center /100% 100%",
      },
    };
  },

  components: {
    OrganList,
  },

  computed: {},

  methods: {
    handleToproduct() {
      this.$router.push("/product");
    },
    handleTopolicy() {
      this.$router.push("/policy");
    },
    handleTodynamic() {
      this.$router.push("/dynamic_issue");
    },
    // 入驻机构列表申请
    async getOrganList() {
      let that = this;
      let data = {
        page: "1",
        rows: "12",
      };
      await organList(data).then(function (res) {
        that.organLogoList = res.data.organPageInfo.rows;
        console.log(res);
      });
    },
    // 产品列表
    async getProductList() {
      let that = this;
      let data = {
        page: "1",
        rows: "12",
      };
      await productListData({
        catalog_id: "2953a34edde84903bb58848fb0e6656b",
      }).then(function (res) {
        that.productList = res.data.productPageInfo.rows;
        console.log(res);
      });
    },

    // 解决方案列表
    async getSolutionList() {
      let that = this;
      let data = {
        page: "1",
        rows: "12",
      };
      await caseList({
        catalog_id: "2953a34edde84903bb58848fb0e6656b",
      }).then(function (res) {
        // that.productList = res.data.productPageInfo.rows;
        console.log(res);
      });
    },
    // 解决方案tab获取
    async getTreeList() {
      let that = this;
      await caselistbyparent({
        parentCatalog: "51c2ec2c9bdf471195db647c12bb8fe6",
      }).then(function (res) {
        that.tabdata2 = res;
        // that.treeRender(tree)
        console.log(res);
        that.handleTab2(res[0], 0);
      });
    },
    treeRender(val) {
      console.log(val);
    },
    handleTab1(i) {
      this.tab1 = i;
    },
    handleTab2(item, j) {
      console.log(item, j);
      let that = this;
      this.tab2 = j;
      caselistbyparent({ parentCatalog: item.catalog_id }).then(function (res) {
        that.tabdata3 = res;
      });
    },
    handleTab3(item, k) {
      this.tab3 = k;
    },
    // 政策信息
    async policy() {
      let that = this;
      await policyIndex().then(function (res) {
        that.policyList = res.data;
        console.log(res);
      });
    },
    // 动态发布列表
    async dt() {
      let that = this;
      await dynamicList({}).then(function (res) {
        that.dtlist = res.data.dynamicPageInfo.rows;
        that.imgListData();
        that.handlechange(0);
        console.log(res);
      });
    },
    handlechange(index) {
      console.log(index);
      this.$refs.carousel.setActiveItem(index);
      // this.dtlistLeft.push(this.dtlist[index])
      this.dtlist.slice(index, index + 1);
      this.dtlistLeft = this.dtlist.slice(index, index + 1);
    },
    imgListData() {
      let url = this.$store.state.url;
      let list = [];
      let src = url + "/attach/binary?attachmentId=";
      // item.imageAttachId
      this.dtlist.map((item, index) => {
        list.push(src + "b647ff882a644def9e54e614264649bd");
      });
      this.imglist = list;
    },
  },
  created() {
    this.getOrganList();
    this.getProductList();
    this.getTreeList();
    this.policy();
    this.dt();
    // this.handleTab2(this.tabdata2[0])
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.index {
  padding: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  &-banner {
    .el-carousel__item {
      .system-infor {
        width: 36.625rem;
        position: absolute;
        top: 8.5rem;
        left: 30rem;
        p {
          color: #fff;
        }
        .row1 {
          font-size: 2.5rem;
          font-weight: 600;
        }
        .row2 {
          font-size: 1.5rem;
          margin-top: 1.625rem;
        }
        .btn {
          padding: 0;
          margin-top: 2rem;
          width: 7rem;
          height: 2.5rem;
          font-size: 1rem;
          background-color: #ff871d;
          color: #fff;
          border: 0;
          border-radius: 0;
        }
      }
      h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
      }
    }
  }
  &-tab {
    height: 7.5rem;
    width: 62.5%;
    background-color: #fff;
    display: flex;
    position: absolute;
    top: 32.5rem;
    // position: relative;
    // top: -3.85rem;
    left: 18.75%;
    z-index: 999;
    border: 0;
    border-radius: 5px;
    box-shadow: #d9e0ec 0 2px 5px 0px;
    .col1 {
      width: 25%;
      height: 100%;
      display: flex;
      img {
        margin: auto 0;
        margin-left: 5rem;
      }
      .text {
        height: 100%;
        position: relative;
        top: 30%;
        left: 4%;
        p:nth-child(1) {
          font-size: 1rem;
          color: #3d464e;
        }
        p:nth-child(2) {
          margin-top: 0.2rem;
          font-size: 0.875rem;
          color: #808e9b;
        }
      }
    }
  }
  &-product {
    height: 44rem;
    width: 100%;
    &-box {
      width: 62.5%;
      height: 100%;
      margin: 0 auto;
      padding-top: 9rem;
      .row {
        display: flex;
        justify-content: space-between;
        line-height: 3rem;
        p {
          font-size: 3rem;
        }
        span {
          cursor: pointer;
          text-align: center;
          width: 6rem;
          height: 3rem;
          line-height: 3rem;
          color: #2882fe;
          border: 1px solid #2882fe;
          img {
            margin-left: 5px;
          }
        }
      }
      .title {
        font-size: 2rem;
        color: #2882fe;
        margin-left: 10px;
        margin-top: 2rem;
      }
      .list {
        display: flex;
        margin-top: 1rem;
        .col {
          width: 25%;
          height: 9rem;
          // background-color: #ff871d;
          .little_box {
            width: 94%;
            height: 8rem;
            background: #fff;
            border: 1px solid #cfd2d7;
            margin-top: 0.5rem;
            margin-left: 3%;
            cursor: pointer;
            transition: all 0.4s;
            .row1 {
              margin-left: 1.2rem;
              margin-top: 10px;
              img {
                position: absolute;
              }
              span {
                margin-left: 2.8rem;
              }
            }
            .txt {
              width: 70%;
              margin-top: 4px;
              margin-left: 4rem;
              font-size: 0.6rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
          .little_box:hover {
            box-shadow: #cfd2d7 0 0 20px 0px;
            // transform: scale(1.02);
          }
        }
      }
    }
  }
  &-solution {
    width: 100%;
    height: 30.25rem;
    display: flex;
    &-left {
      width: 38%;
      display: flex;
      align-items: center;
      .solution-box {
        margin-left: 50%;
        .title {
          font-size: 3rem;
        }
        .content {
          margin-top: 10px;
          font-size: 0.875rem;
          color: #3d464e;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          margin-right: 18px;
        }
      }
    }
    &-right {
      width: 62%;
      .out-box {
        width: 70%;
        margin-top: 2.625rem;
        margin-left: 2rem;
        display: flex;
        flex-direction: column;
        .row1 {
          display: flex;
          height: 2rem;
          line-height: 2rem;
          &-col {
            cursor: pointer;
            width: 6.25rem;
            overflow: hidden;
            margin-right: 8px;
            font-size: 1rem;
            height: 2.2rem;
            line-height: 2.2rem;
            color: #fff;
          }
          span {
            position: absolute;
            right: 18%;
            font-size: 1rem;
            cursor: pointer;
            text-align: center;
            width: 6rem;
            height: 3rem;
            line-height: 3rem;
            color: #fff;
            border: 1px solid #fff;
            img {
              height: 1rem;
              margin-left: 5px;
            }
          }
          .active {
            font-size: 1.375rem;
            height: 2.2rem;
            line-height: 2.2rem;
            border-bottom: 1px solid #fff;
          }
        }
        .row2 {
          margin-top: 1.4rem;
          position: relative;
          height: 2.25rem;
          &-box {
            border: 1px solid #cfd2d7;
            float: left;
            display: flex;
            &-col {
              cursor: pointer;
              height: 2.25rem;
              line-height: 2.25rem;
              padding: 0 10px;
              font-size: 1rem;
              color: #b3c5ff;
            }
            .active {
              color: #2882fe;
              background-color: #fff;
            }
          }
        }
        .row3 {
          display: flex;
          // justify-content: space-between;
          flex-wrap: wrap;
          &-col {
            cursor: pointer;
            color: #fff;
            height: 8.125rem;
            width: 32%;
            text-align: center;
            border: 1px solid #cfd2d7;
            margin-right: 1%;
            margin-top: 1.625rem;
            p:nth-child(1) {
              font-size: 1.25rem;
              margin-top: 1rem;
            }
            p:nth-child(2) {
              // color: #fff;
              font-size: 1rem;
              margin-top: 1rem;
            }
          }
          .active {
            color: #2882fe;
            background-color: #fff;
          }
        }
      }
    }
  }
  &-policy {
    height: 31.25rem;
    width: 100%;
    &-box {
      width: 62.5%;
      margin: 0 auto;
      .row1 {
        padding-top: 4.375rem;
        display: flex;
        justify-content: space-between;
        span:nth-child(1) {
          font-size: 3rem;
        }
        span:nth-child(2) {
          cursor: pointer;
          text-align: center;
          width: 6rem;
          height: 3rem;
          line-height: 3rem;
          color: #2882fe;
          border: 1px solid #2882fe;
          img {
            margin-left: 5px;
          }
        }
      }
      .row2 {
        margin-top: 1.6875rem;
        display: flex;
        justify-content: space-between;
        &-col {
          width: 32%;
          border: 1px solid #cfd2d7;
          p {
            color: #fff;
            font-size: 1.3rem;
            height: 2.5rem;
            line-height: 2.5rem;
            padding-left: 1rem;
            background-color: #2882fe;
            span {
              width: 0.9375rem;
              height: 0.875rem;
              float: right;
              padding-right: 2rem;
            }
          }
          .ul-box {
            display: flex;
            justify-content: space-between;
            .ul_left {
              width: 80%;
              padding-left: 1rem;
              margin-top: 1rem;
              margin-bottom: 1rem;
              li {
                // width: 20px;
                font-size: 1rem;
                height: 2rem;
                line-height: 2rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              li:hover {
                cursor: pointer;
                color: #2882fe;
              }
            }
            .ul_time {
              width: 18%;
              color: #b0b1b5;
              font-size: 1rem;
              margin-top: 1rem;
              font-size: 1rem;
              margin-right: 1rem;
              li {
                text-align: end;
                font-size: 1rem;
                height: 2rem;
                line-height: 2rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
  &-dynamic {
    &-title {
      width: 62.5%;
      margin: 0 auto;
      .title {
        display: flex;
        line-height: 3rem;
        padding: 2rem 0;
        span:nth-child(1) {
          font-size: 3rem;
        }
        span:nth-child(2) {
          cursor: pointer;
          text-align: center;
          width: 6rem;
          height: 3rem;
          line-height: 3rem;
          color: #2882fe;
          border: 1px solid #2882fe;
          margin-left: 3rem;
          img {
            margin-left: 5px;
          }
        }
      }
    }
    &-content {
      height: 13.75rem;
      .box {
        width: 62.5%;
        margin: 0 auto;
        display: flex;
        &-left {
          width: 50%;
          color: #fff;
          .row1 {
            font-size: 1.2rem;
            margin: 2rem 0;
          }
          .row2 {
            font-size: 0.875rem;
          }
          .btn {
            cursor: pointer;
            font-size: 1rem;
            border: 1px solid #fff;
            line-height: 2.5rem;
            width: 8.125rem;
            margin-top: 1rem;
            text-align: center;
            img {
              height: 1rem;
              margin-left: 5px;
            }
          }
        }
        &-right {
          width: 50%;
          position: relative;
          .el-carousel {
            margin: auto 5%;
            width: 90%;
            position: absolute;
            bottom: -1rem;
          }
          .el-carousel__item h3 {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 200px;
            margin: 0;
          }
          .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
          }

          .el-carousel__item:nth-child(2n + 1) {
            background-color: #d3dce6;
          }
        }
      }
    }
  }
  .plat_intro {
    .title {
      padding-top: 2rem;
      width: 62.5%;
      margin: 0 auto;
      font-size: 3rem;
    }
    .plat_infor {
      display: flex;
      justify-content: space-between;
      margin: auto;
      .img_box {
        width: 47.5%; //35.625rem
        height: 100%; // 32rem
        margin-top: 1.875rem;
      }
      .plat_msg {
        width: 50%; //43rem
        font-weight: normal;
        font-stretch: normal;
        line-height: 2rem;
        color: #35393f;
        margin: auto 0;
        text-align: start;
        position: relative;
        p {
          margin-top: 0.5rem;
          font-size: 1rem;
        }
        .more_btn {
          width: 100px;
          height: 36px;
          padding: 0;
          font-size: 1rem;
          position: absolute;
          right: 0;
          //bottom: 0;  //-50
        }
      }
    }

    //   卡片
    .dynamic {
      width: 31.6667%; //24rem
      height: 100%; //23.125rem
      font-size: 1rem;
      position: relative;
      .img_box {
        width: 100%; //24rem
        height: 71.35%; //16.5rem
      }
      .dynamic_infor {
        p {
          font-size: 1rem;
          margin-top: 1rem;
        }
        .more_btn {
          width: 98px;
          height: 32px;
          padding: 0;
          font-size: 1rem;
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
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
          <span>更多<img src="@/assets/arrow_right.png" alt="" /></span>
        </div>
        <div class="title">技术产品</div>
        <div class="list">
          <div class="col">
            <div class="little_box">
              <div class="row1">
                <img
                  src="@/assets/icon2.png"
                  style="width: 24px; height: 22px"
                  alt=""
                /><span>AI</span>
              </div>
              <div class="txt">
                产品相关描述产品相关描述产品相关描述产品相关
              </div>
            </div>
          </div>
          <div class="col">
            <div class="little_box">
              <div class="row1">
                <img
                  src="@/assets/icon2.png"
                  style="width: 24px; height: 22px"
                  alt=""
                /><span>AI</span>
              </div>
              <div class="txt">
                产品相关描述产品相关描述产品相关描述产品相关
              </div>
            </div>
          </div>
          <div class="col">
            <div class="little_box">
              <div class="row1">
                <img
                  src="@/assets/icon2.png"
                  style="width: 24px; height: 22px"
                  alt=""
                /><span>AI</span>
              </div>
              <div class="txt">
                产品相关描述产品相关描述产品相关描述产品相关
              </div>
            </div>
          </div>
          <div class="col">
            <div class="little_box">
              <div class="row1">
                <img
                  src="@/assets/icon2.png"
                  style="width: 24px; height: 22px"
                  alt=""
                /><span>AI</span>
              </div>
              <div class="txt">
                产品相关描述产品相关描述产品相关描述产品相关
              </div>
            </div>
          </div>
        </div>
        <div class="title">业务产品</div>
        <div class="list">
          <div class="col">
            <div class="little_box">
              <div class="row1">
                <img
                  src="@/assets/icon2.png"
                  style="width: 24px; height: 22px"
                  alt=""
                /><span>AI</span>
              </div>
              <div class="txt">
                产品相关描述产品相关描述产品相关描述产品相关
              </div>
            </div>
          </div>
          <div class="col">
            <div class="little_box">
              <div class="row1">
                <img
                  src="@/assets/icon2.png"
                  style="width: 24px; height: 22px"
                  alt=""
                /><span>AI</span>
              </div>
              <div class="txt">
                产品相关描述产品相关描述产品相关描述产品相关
              </div>
            </div>
          </div>
          <div class="col">
            <div class="little_box">
              <div class="row1">
                <img
                  src="@/assets/icon2.png"
                  style="width: 24px; height: 22px"
                  alt=""
                /><span>AI</span>
              </div>
              <div class="txt">
                产品相关描述产品相关描述产品相关描述产品相关
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
            解决方案解决方案解决方案解决方案解决方案解决方案
          </p>
        </div>
      </div>
      <div class="index-solution-right" :style="rightBg">2</div>
    </div>
    <div class="plat_intro">
      <p class="title">政策信息</p>
      <div class="bottom_wire"></div>
      <div
        class="plat_infor"
        style="border: 1px solid #ccc; margin-top: 1.5rem"
      >
        <ul class="ul_left">
          <li>中华人民共和国人民银行法（修正）</li>
          <li>中华人民共和国人民银行法</li>
          <li>中华人民共和国人民银行法（修正）</li>
          <li>
            全国人民代表大会常任理事会《中华人民共和国人民银行法（修正）》
          </li>
          <li>中华人民共和国人民银行法</li>
        </ul>
        <ul class="ul_time">
          <li>01-01</li>
          <li>01-01</li>
          <li>01-01</li>
          <li>01-01</li>
          <li>01-01</li>
        </ul>
        <ul class="ul_left">
          <li>中华人民共和国人民银行法（修正）</li>
          <li>中华人民共和国人民银行法</li>
          <li>中华人民共和国人民银行法（修正）</li>
          <li>
            全国人民代表大会常任理事会常任理事会常任理事会《中华人民共和国人民银行法（修正）》
          </li>
          <li>中华人民共和国人民银行法</li>
        </ul>
        <ul class="ul_time">
          <li>01-01</li>
          <li>01-01</li>
          <li>01-01</li>
          <li>01-01</li>
          <li>01-01</li>
        </ul>
      </div>
    </div>
    <div class="plat_intro">
      <p class="title">动态发布</p>
      <div class="bottom_wire"></div>
      <div class="plat_infor">
        <div class="dynamic">
          <div class="img_box">
            <img
              src="@/assets/jd.jpg"
              style="width: 100%; height: 100%"
              alt=""
            />
          </div>
          <div class="dynamic_infor">
            <p>京东数科陈圣枪：京东京东京东京东京东京东京东京东</p>
            <el-button type="primary" class="more_btn"
              >查看更多<i class="el-icon-arrow-right el-icon--right"></i
            ></el-button>
          </div>
        </div>
        <div class="dynamic">
          <div class="img_box">
            <img
              src="@/assets/man.jpg"
              style="width: 100%; height: 100%"
              alt=""
            />
          </div>
          <div class="dynamic_infor">
            <p>京东数科陈圣枪：京东京东京东京东京东京东京东京东</p>
            <el-button type="primary" class="more_btn"
              >查看更多<i class="el-icon-arrow-right el-icon--right"></i
            ></el-button>
          </div>
        </div>
        <div class="dynamic">
          <div class="img_box">
            <img
              src="@/assets/money.jpg"
              style="width: 100%; height: 100%"
              alt=""
            />
          </div>
          <div class="dynamic_infor">
            <p>京东数科陈圣枪：京东京东京东京东京东京东京东京东</p>
            <el-button type="primary" class="more_btn"
              >查看更多<i class="el-icon-arrow-right el-icon--right"></i
            ></el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="plat_intro" style="margin-top: 50px">
      <p class="title">入驻机构</p>
      <div class="bottom_wire"></div>
      <!-- <div class="a">ad</div> -->
      <div class="plat_infor">
        <OrganList :logolist="logolist" />
      </div>
    </div>
  </div>
</template>

<script>
import OrganList from "@/components/organList";
import img1 from "@/assets/du.png";
export default {
  name: "Index",
  data() {
    return {
      plat_infor:
        "金融科技服务能力共享系统是一个以AI驱动产业数字化的新型数字平台。平台以AI、数据技术、物联网、区块链等前沿数字科技为基础，建立并发展起核心的风险管理能力、用户运营能力、产业理解能力和企业服务能力。平台以AI、数据技术、物联网、区块链等前沿数字科技为基础，建立并发展起核心。",
      plat_infor2:
        "金融科技服务能力共享系统是一个以AI驱动产业数字化的新型数字平台。平台以AI、数据技术、物联网、区块链等前沿数字科技为基础，建立并发展起核心的风险管理能力、用户运营能力、产业理解能力和企业服务能力。",
      currentDate: new Date(),
      logolist: [
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
      ],
      bg_url: "@/assets/pro_bg.png",
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
    };
  },

  components: {
    OrganList,
  },

  computed: {},

  methods: {},
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
            box-shadow: #cfd2d7 0 0 1px 1px;
            transform: scale(1.04);
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
    }
  }
  .plat_intro {
    margin: 30px auto;
    .title {
      font-family: MicrosoftYaHei;
      font-size: 2rem;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #2882fe;
      text-align: center;
      margin-top: 2.5rem;
    }
    .bottom_wire {
      width: 4rem;
      height: 3px;
      background-color: #2882fe;
      border-radius: 6px;
      margin: auto;
      margin-top: 6px;
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
    .ul_left {
      list-style: inside !important;
      margin-left: 2rem;
      width: 31rem;
      margin-top: 1rem;
      li {
        width: 26rem;
        font-size: 1rem;
        height: 2.8125rem;
        line-height: 2.8125rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      li:hover {
        cursor: pointer;
        color: #2882fe;
      }
      i {
        position: relative;
        float: right;
        color: #b0b1b5;
      }
    }
    .ul_time {
      color: #b0b1b5;
      font-size: 1rem;
      height: 2.8125rem;
      line-height: 2.8125rem;
      margin-top: 1rem;
      font-size: 1rem;
      margin-right: 1.25rem;
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
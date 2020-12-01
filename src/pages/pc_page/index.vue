<template>
  <div class="index">
    <div class="plat_intro">
      <p class="title">平台简介</p>
      <div class="bottom_wire"></div>
      <!-- <div class="a">ad</div> -->
      <div class="plat_infor">
        <div class="img_box">
          <img
            src="@/assets/plat_img.png"
            alt=""
            style="width: 100%; height: 100%"
          />
        </div>
        <div class="plat_msg">
          <p>{{ plat_infor }}</p>
          <p>{{ plat_infor }}</p>
          <p>{{ plat_infor2 }}</p>

          <el-button type="primary" class="more_btn"
            >查看更多<i class="el-icon-arrow-right el-icon--right"></i
          ></el-button>
        </div>
      </div>
    </div>
    <div class="plat_intro">
      <p class="title">政策信息</p>
      <div class="bottom_wire"></div>
      <div
        class="plat_infor"
        style="border: 1px solid #ccc; margin-top: 1.5rem"
      >
        <ul class="ul_left" style="list-style: initial">
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
import OrganList from '@/components/organList'
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
  width: 100%;
  height: 100%;
  margin: 0 auto;
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
      list-style: initial !important;
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
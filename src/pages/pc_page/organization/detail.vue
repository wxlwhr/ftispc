<template>
  <div class="organizatioanDetail">
    <div class="organizatioanDetail-header">
      <div class="ql-snow">
        <div class="ql-snow ql-editor" v-html="organ_Infor"></div>
      </div>
    </div>
    <div class="organizatioanDetail-drapdown">
      <el-row>
        <el-col :span="3">
          <Dropdown />
        </el-col>
        <el-col :span="3">
          <Dropdown />
        </el-col>
        <el-col :span="3">
          <Dropdown />
        </el-col>
      </el-row>
    </div>
    <div class="organizatioanDetail-title">
      <span class="organizatioanDetail-title-tag"></span>
      <span class="organizatioanDetail-title-tit">信息披露</span>
    </div>
    <img src="@/assets/4_07.jpg" style="width: 100%" alt="" />
    <div class="organizatioanDetail-title">
      <span class="organizatioanDetail-title-tag"></span>
      <span class="organizatioanDetail-title-tit">涉及技术</span>
    </div>
    <div class="organizatioanDetail-technology">
      <div class="aaa" v-for="(item, index) in technologylist" :key="index">
        <img :src="item.src" alt="" style="width: 60%; height: 60%" />
        <div class="organ_name">{{ item.tech_name }}</div>
      </div>
    </div>
    <!-- 证书 -->
    <div class="organizatioanDetail-title">
      <span class="organizatioanDetail-title-tag"></span>
      <span class="organizatioanDetail-title-tit">相关证书</span>
    </div>
    <div class="organizatioanDetail-zhengshu">
      <div class="img_box">
        <img
          src="@/assets/4_15.jpg"
          alt=""
          style="width: 67.5%; height: 100%"
        />
      </div>
      <div class="plat_msg">
        <div class="subhead">
          <span class="subhead-title">证书介绍</span>
          <span class="subhead-tag"></span>
        </div>
        <p>{{ plat_infor }}</p>
        <p>{{ plat_infor }}</p>
      </div>
    </div>
    <!-- 专利 -->
    <div class="organizatioanDetail-title">
      <span class="organizatioanDetail-title-tag"></span>
      <span class="organizatioanDetail-title-tit">相关专利</span>
    </div>
    <div class="organizatioanDetail-zhengshu">
      <div class="img_box">
        <img src="@/assets/4_19.jpg" alt="" style="width: 67.5%" />
      </div>
      <div class="plat_msg">
        <div class="subhead">
          <span class="subhead-title">专利介绍</span>
          <span class="subhead-tag"></span>
        </div>
        <p>{{ plat_infor }}</p>
        <p>{{ plat_infor }}</p>
      </div>
    </div>
    <!-- 权威认证说明 -->
    <div class="organizatioanDetail-title">
      <span class="organizatioanDetail-title-tag"></span>
      <span class="organizatioanDetail-title-tit">权威认证说明</span>
    </div>
    <div class="organizatioanDetail-authority">
      {{ authority }}
    </div>
    <!-- 机构评价 -->
    <div class="organizatioanDetail-title">
      <span class="organizatioanDetail-title-tag"></span>
      <span class="organizatioanDetail-title-tit">机构评价</span>
    </div>
    <div class="organizatioanDetail-evaluate">
      <div class="organizatioanDetail-evaluate-num">
        <span class="number">45</span>
        <span>条评价</span>
      </div>
      <div class="organizatioanDetail-evaluate-content">
        <div style="color: #35393f; margin-bottom: 10px; font-weight: bold">
          发表评价
        </div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="evaluate"
        >
        </el-input>
        <div class="organizatioanDetail-evaluate-footer">
          <el-checkbox v-model="isOpen">是否公开</el-checkbox>
          <el-button class="footer-btn" type="primary" @click="handlecomment()"
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
  </div>
</template>

<script>
import {organDetail,productDetail} from "@/api/api.js";
import img1 from "@/assets/rengong.png";
import img2 from "@/assets/qukuailian.png";
import img3 from "@/assets/account.png";
import img4 from "@/assets/bigdata.png";
import Dropdown from "../../../components/dropdown";
export default {
  name: "OrganizatioanDetail",
  components: {
    Dropdown,
  },

  computed: {},
  data() {
    return {
      platform: [
        {
          label: "开放平台1",
          value: "1",
        },
        {
          label: "开放平台2",
          value: "2",
        },
        {
          label: "开放平台3",
          value: "3",
        },
      ],
      selectplat: "",
      src1: "",
      technologylist: [
        {
          src: img1,
          tech_name: "人工智能",
        },
        {
          src: img2,
          tech_name: "区块链",
        },
        {
          src: img3,
          tech_name: "云计算",
        },
        {
          src: img4,
          tech_name: "大数据",
        },
      ],
      plat_infor:
        "专利证书是专利申请经审查合格，没有发现驳回理由，满足颁发授予专利权条件，由国务院专利行政部门（即国家知识产权局）作出授予专利权的决定，发给专利申请人的专利证书，是一种法律证明文件。",
      authority:
        "专利证书是专利申请经审查合格，没有发现驳回理由，满足颁发授予专利权条件，由国务院专利行政部门（即国家知识产权局）作出授予专利权的决定，发给专利申请人的专利证书，是一种法律证明文件。专利证书是专利申请经审查合格，没有发现驳回理由，满足颁发授予专利权条件，由国务院专利行政部门（即国家知识产权局）作出授予专利权的决定，发给专利申请人的专利证书，是一种法律证明文件。专利证书是专利申请经审查合格，没有发现驳回理由，满足颁发授予专利权条件，由国务院专利行政部门（即国家知识产权局）作出授予专利权的决定，发给专利申请人的专利证书，是一种法律证明文件。",
      evaluate:'',
      isOpen:true,
      organ_Infor:"",
      productcommentList:[
        {
          comment_organ_name:'jigou1',
          create_date:'1-2',
          comment_content:'专利证书是专利申请经审查合格'
        },
        {
          comment_organ_name:'jigou1',
          create_date:'1-2',
          comment_content:'专利证书是专利申请经审查合格'
        },
      ]
    };
  },

  methods: {
    async getDetail(id) {
      let that = this;
      let data = {
        organ_id: id,
      };
      await organDetail(data).then(function (res) {
        that.organ_Infor = res.data.organIntro;
        console.log(res);
      });
    },
    organValue(val) {},
    async getProductDetail(){
      await productDetail().then(function (res) {
        that.product_Infor = res.data.product;
        console.log(res);
      });
    }
  },
  created() {
    let id = this.$route.query.id;
    this.id = id;
    this.getDetail(id);
    console.log(this.$route.query);
  },
};
</script>
<style lang='scss' scoped>
.organizatioanDetail {
  width: 100%;
  padding: 0 360px;
  &-header {
    margin-top: 2rem;
  }
  &-drapdown {
    margin: 2rem 0;
    border-bottom: 1px solid #d8dcdf;
    .el-row{
       margin-bottom: 1rem;
    }
  }
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
  &-technology {
    display: flex;
    flex-wrap: wrap;
    .aaa {
      width: 25%;
      height: 17.625rem;
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6.5rem;
        margin-left: -6.875rem;
      }

      .organ_name {
        text-align: center;
        font-size: 1rem;
        font-weight: 600;
        font-family: MicrosoftYaHei-Bold;
        font-stretch: normal;
        letter-spacing: 0;
        color: #35393f;
        position: relative;
        bottom: -14rem;
        //   left: 50%;
        //   margin-left: -2.5rem;
      }
    }
  }
  &-zhengshu {
    width: 100%;
    height: 32.1875rem;
    margin-top: 1.875rem;
    display: flex;
    .img_box {
      width: 50%; //35.625rem
      height: 100%; // 32rem
      display: flex;
      align-items: center;
      justify-content: center;
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
      .subhead {
        margin-bottom: 1.5rem;

        &-title {
          font-size: 26px;
          color: #35393f;
        }
        &-tag {
          display: block;
          margin-top: 1rem;
          width: 60px;
          height: 0.25rem;
          background-color: #2882fe;
        }
      }
      p {
        margin-top: 1rem;
        font-size: 1rem;
      }
    }
  }
  &-authority {
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 2rem;
    color: #35393f;
    margin: auto 0;
    text-align: start;
    text-indent: 2em;
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
            font-size: 1rem;
            color: #3d464e;
          }
        }
      }
    }
  }
}
</style>
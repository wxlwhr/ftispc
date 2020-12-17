<template>
  <div class="organizatioanDetail">
    <div class="organizatioanDetail-header">
      <div class="ql-snow">
        <div class="ql-snow ql-editor" v-html="organ_Infor"></div>
      </div>
    </div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      class="organizatioanDetail-tabs"
    >
      <el-tab-pane
        :label="index"
        :name="index"
        v-for="(item, index) in arrlist"
        :key="index"
      >
        <span slot="label">{{ index }}<i class="el-icon-arrow-down"></i></span>
        <div class="product-list">
          <div
            class="list-i"
            :class="tabOption === index ? 'active' : ''"
            v-for="(item, index) in item"
            :key="index"
            @click="getid(item,index)"
          >
            {{ item.label }}
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="organizatioanDetail-title">
      <span class="organizatioanDetail-title-tag"></span>
      <span class="organizatioanDetail-title-tit">信息披露</span>
    </div>

    <div class="productinfor">
      <div class="second-tab">关键产品能力</div>
      <div class="ql-snow">
        <div class="ql-snow ql-editor" v-html="product_Infor.product_des"></div>
      </div>
      <div class="second-tab">应用场景</div>
      <div class="ql-snow">
        <div class="ql-editor" v-html="product_Infor.product_scene"></div>
      </div>
    </div>
    <div class="organizatioanDetail-title">
      <span class="organizatioanDetail-title-tag"></span>
      <span class="organizatioanDetail-title-tit">涉及技术</span>
    </div>
    <div class="organizatioanDetail-technology">
      <div
        class="aaa"
        v-for="(item, index) in imgList3.slice(0, 4)"
        :key="index"
      >
        <img :src="imgList3[index]" alt="" />
        <div class="organ_name">{{ techName[index] }}</div>
      </div>
    </div>
    <!-- 证书 -->
    <div class="organizatioanDetail-title">
      <span class="organizatioanDetail-title-tag"></span>
      <span class="organizatioanDetail-title-tit">相关证书</span>
    </div>
    <div class="organizatioanDetail-zhengshu">
      <div class="img_box" v-for="(item, index) in imgList1.slice(0,3)" :key="index">
        <img :src="item" alt="" style="width: 67.5%; height: 80%" />
      </div>
      <!-- <div class="plat_msg">
        <div class="subhead">
          <span class="subhead-title">证书介绍</span>
          <span class="subhead-tag"></span>
        </div>
        <p>{{ plat_infor }}</p>
        <p>{{ plat_infor }}</p>
      </div> -->
    </div>
    <!-- 专利 -->
    <div class="organizatioanDetail-title">
      <span class="organizatioanDetail-title-tag"></span>
      <span class="organizatioanDetail-title-tit">相关专利</span>
    </div>
    <div class="organizatioanDetail-zhengshu">
      <div class="img_box" v-for="(item, index) in imgList2.slice(0,3)" :key="index">
        <img :src="item" alt="" style="width: 67.5%" />
      </div>
      <!-- <div class="plat_msg">
        <div class="subhead">
          <span class="subhead-title">专利介绍</span>
          <span class="subhead-tag"></span>
        </div>
        <p>{{ plat_infor }}</p>
        <p>{{ plat_infor }}</p>
      </div> -->
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
    <!-- <div class="organizatioanDetail-title">
      <span class="organizatioanDetail-title-tag"></span>
      <span class="organizatioanDetail-title-tit">机构评价</span>
    </div>
    <div class="organizatioanDetail-evaluate">
      <div class="organizatioanDetail-evaluate-num">
        <span class="number">45</span>
        <span>条评价</span>
      </div>
      <div class="organizatioanDetail-evaluate-content">
        <div style="color: #35393f; margin-bottom: 10px; font-weight: bold">发表评价</div>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="evaluate">
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
        <li class="col" v-for="(item, index) in productcommentList" :key="index">
          <div class="img-box">
            <img src="@/assets/logo.png" alt="" />
          </div>
          <div class="content">
            <p>
              {{ item.comment_organ_name }}<span>{{ item.create_date }}</span>
            </p>
            <p>{{ item.comment_content }}</p>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import {
  organDetail,
  productDetail,
  organProduct,
  organProductDetail,
} from "@/api/api.js";
import Dropdown from "../../../components/dropdown";
export default {
  name: "OrganizatioanDetail",
  components: {
    Dropdown,
  },

  computed: {},
  data() {
    return {
      selectplat: "",
      src1: "",
      technologylist: [],
      plat_infor:
        "专利证书是专利申请经审查合格，没有发现驳回理由，满足颁发授予专利权条件，由国务院专利行政部门（即国家知识产权局）作出授予专利权的决定，发给专利申请人的专利证书，是一种法律证明文件。",
      authority:
        "专利证书是专利申请经审查合格，没有发现驳回理由，满足颁发授予专利权条件，由国务院专利行政部门（即国家知识产权局）作出授予专利权的决定，发给专利申请人的专利证书，是一种法律证明文件。专利证书是专利申请经审查合格，没有发现驳回理由，满足颁发授予专利权条件，由国务院专利行政部门（即国家知识产权局）作出授予专利权的决定，发给专利申请人的专利证书，是一种法律证明文件。专利证书是专利申请经审查合格，没有发现驳回理由，满足颁发授予专利权条件，由国务院专利行政部门（即国家知识产权局）作出授予专利权的决定，发给专利申请人的专利证书，是一种法律证明文件。",
      evaluate: "",
      isOpen: true,
      organ_Infor: "",
      list1: [],
      product_Infor: "",
      srclist: [],
      id: "",
      arrlist: "",
      imgList1: [],
      imgList2: [],
      imgList3: [],
      techName: [],
      activeName: "",
      tabOption: 0,
    };
  },

  methods: {
    handleClick(tab, event) {
      // console.log(this.activeName)
      // console.log(tab.label)
      // if(this.activeName!=tab.label){
      //   console.log('22222')
      //   this.tabOption=""
      // }
      console.log(tab, event);
    },
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
    // organValue(val) {},
    async getProductDetail(v) {
      let that = this;
      let data = {
        product_id: v,
      };
      await organProductDetail(data).then(function (res) {
        let url = that.$store.state.url;
        let techImgList = [];
        let cerImgList = [];
        let patentImgList = []; //专利图片
        let src = url + "/attach/binary?attachmentId=";
        res.data.cerList.map((item, index) => {
          // logoFile
          cerImgList.push(src + item);
        });
        that.imgList1 = cerImgList;
        res.data.patentList.map((item, index) => {
          // logoFile
          patentImgList.push(src + item);
        });
        that.imgList2 = patentImgList;
        res.data.techList.map((item, index) => {
          // logoFile
          techImgList.push(src + item.techPic);
          that.techName.push(item.techName);
        });
        that.imgList3 = techImgList;
        console.log(that.imgList3)
        that.product_Infor = res.data.product;
        console.log(res);
      });
    },
    async getdropDown() {
      let that = this;
      let data = {
        organ_id: this.id,
      };
      await organProduct(data).then(function (res) {
        let data = res;
        that.arrlist = data;
        that.activeName = Object.keys(res)[0];
        that.getid(Object.values(res)[0][0],0);
        console.log(res);
      });
    },
    getid(val,i) {
      this.tabOption=i
      this.getProductDetail(val.value);
    },
  },
  created() {
    let id = this.$route.query.id;
    this.id = id;
    this.getDetail(id);
    this.getdropDown();
  },
};
</script>
<style lang="scss" scoped>
.organizatioanDetail {
  width: 62.5%;
  margin: 0 auto;
  &-header {
    margin-top: 2rem;
  }
  &-drapdown {
    margin: 2rem 0;
    // border-bottom: 1px solid #d8dcdf;
    .el-row {
      height: 3.4375rem;
      line-height: 3.4375rem;
      margin-bottom: 1rem;
      .el-col {
        overflow: hidden;
        text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  &-tabs {
    .product-list {
      display: flex;
      flex-wrap: wrap;
      .list-i {
        font-size: 1.2rem;
        margin:0 1rem 1rem 0;
        padding: 2px 10px;
        cursor: pointer;
        border: 1px solid #000;
        color: #000;
        border-radius: 30px;
      }
      .list-i:hover {
        color: #e8393c;
        border: 1px solid #e8393c;
      }
      .active {
        border: 1px solid #2882fe;
        color: #2882fe;
        border-radius: 30px;
      }
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
  .productinfor {
    .second-tab {
      font-size: 2rem;
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
        margin-top: -30px;
        margin-left: -30px;
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
    margin-bottom: 5rem;
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

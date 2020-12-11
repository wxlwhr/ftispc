<template>
  <div class="dynamic">
    <div class="dynamic-title">
      <span class="dynamic-title-tag"></span>
      <span class="dynamic-title-tit">动态发布</span>
    </div>
    <div class="dynamic-box">
      <div class="dynamic-box-left">
        <ul v-for="(item, index) in tabList" :key="index" class="tab-ul">
          <li
            @click="
              right_title = item.catalogName;
              tabOption = index;
              handlegetList(item);
            "
            :class="tabOption === index ? 'active' : ''"
          >
            {{ item.catalogName }}
            <span><i class="el-icon-arrow-right"></i></span>
          </li>
        </ul>
      </div>
      <div class="dynamic-box-right" v-if="content_detail === ''">
        <div class="title">
          {{ right_title }}
        </div>
        <div class="content-list">
          <ul>
            <li v-for="(item, i) in policyList" :key="i">
              <div class="content-list-img">
                <!-- <img src="@/assets/money.jpg" alt="" /> -->
                <img :src="srcList[i]" alt="" />
              </div>
              <div class="content-list-right">
                <div class="title">{{ item.content_title }}</div>
                <div class="date">{{ item.publish_date }}</div>
                <div class="desc">
                  {{ item.content_text.match(/[\u4e00-\u9fa5]/g).join("") }}
                </div>
                <div
                  style="color: #2882fe; cursor: pointer; font-size: 1.3rem"
                  @click="gotoDetail(item)"
                >
                  阅读全文
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="dynamic-box-right" v-else>
        <!-- <div class="title">
          {{ content_detail.content_title }}
        </div> -->
        <!-- <div class="content-list">
          {{ content_detail.content_text }}
        </div> -->
        <div class="ql-snow">
          <div class="ql-editor" v-html="content_detail.content_text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dynamicTab, dynamicList, policyDetail } from "@/api/api.js";
export default {
  name: "Dynamic_issue",
  data() {
    return {
      tabList: [],
      policyList: [],
      tabOption: 0,
      right_title: "",
      total: 150,
      page: "1",
      lastPage: "",
      currentPage1: 1,
      firstTabId: "",
      content_detail: "",
      srcList: [],
      id: "",
      fatherId: "",
    };
  },

  components: {},

  computed: {},

  methods: {
    async getTab() {
      let that = this;
      await dynamicTab().then(function (res) {
        let data = res.data.menuList;
        let firstTabId = res.data.menuList[0].catalogId;
        that.right_title = res.data.menuList[0].catalogName;
        that.getList("1", firstTabId);
        that.tabList = data;

        data.map((item, index) => {
          if (item.catalogId === that.fatherId) {
            console.log(that.id);
            that.tabOption = index;
          }
        });
        console.log(res);
      });
    },
    async getList(page, id) {
      let that = this;
      let data = {
        page: page,
        rows: "15",
        catalog_id: id,
      };
      console.log(data);
      await dynamicList(data).then(function (res) {
        that.policyList = res.data.dynamicPageInfo.rows;
        let url = that.$store.state.url;
        let imglist = [];
        let src = url + "/attach/binary?attachmentId=";
        res.data.dynamicPageInfo.rows.map((item, index) => {
          // logoFile
          imglist.push(src + item.imageAttachId);
        });
        that.srcList = imglist;
        console.log(res);
      });
    },
    handlegetList(i) {
      this.currentPage1 = 1;
      this.content_detail = "";
      // this.nowcatalogId = i.catalogId;
      console.log(i.catalogId);
      this.getList("1", i.catalogId);
    },
    gotoDetail(i) {
      console.log(i);
      let that = this;
      let data = {
        content_id: i.content_id,
      };
      console.log(data);
      policyDetail(data).then(function (res) {
        that.content_detail = res.data.content;
        console.log(res);
      });
    },
  },
  created() {
    // console.log(this.$route.query.id);
    console.log(this.$route.query.fatherId);
    this.fatherId = this.$route.query.fatherId;
    let id = this.$route.query.id;
    this.id = id;
    if (id) {
      this.gotoDetail(id);
    }
    this.getTab();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.dynamic {
  width: 62.5%;
  min-height: 77rem;
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
      font-size: 26px;
      color: #35393f;
      margin-left: 1rem;
    }
  }
  &-box {
    width: 100%;
    display: flex;
    padding-bottom: 5rem;
    min-height: 60rem;
    justify-content: space-between;
    &-left {
      border: 1px solid #d8dcdf;
      border-radius: 2px;
      width: 20%;
      .tab-ul {
        cursor: pointer;
        li {
          font-size: 1rem;
          color: #3c3d3f;
          border-bottom: 1px solid #d8dcdf;
          padding-left: 7%;
          padding-right: 7%;
          display: flex;
          justify-content: space-between;
          height: 3.5rem;
          line-height: 3.5rem;
        }
        .active {
          color: #fff;
          background-color: #2882fe;
        }
      }
    }
    &-right {
      border: 1px solid #d8dcdf;
      border-radius: 3px;
      width: 78%;
      .title {
        height: 5rem;
        line-height: 5rem;
        font-size: 24px;
        text-align: center;
      }
      .content-list {
        padding: 0 4.813rem 0 3rem;
        word-wrap: break-word;
        word-break: normal;
        ul li {
          border-bottom: 1px dashed #d6dce7;
          padding: 1.313rem 0;
          .title {
            font-size: 1.8rem;
            text-align: start;
            line-height: 2.5rem;
            height: 2.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .date {
            font-size: 1rem;

            color: #a6abb1;
          }
          .desc {
            margin: 6px 0;
            font-size: 1rem;
            color: #84898e;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &::after {
            content: "";
            display: table;
            clear: both;
          }
        }
        &-right {
          float: right;
          width: calc(100% - 11rem);
        }
        &-img {
          width: 10rem;
          height: 10rem;
          float: left;
          margin-right: 1rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>

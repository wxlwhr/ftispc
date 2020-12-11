<template>
  <div class="policy">
    <div class="policy-title">
      <span class="policy-title-tag"></span>
      <span class="policy-title-tit">政策信息</span>
    </div>
    <div class="policy-box">
      <div class="policy-box-left">
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
      <div class="policy-box-right" v-if="content_detail === ''">
        <div class="title">
          {{ right_title }}
        </div>
        <div class="content-list">
          <ul>
            <li
              v-for="(item, i) in policyList"
              :key="i"
              @click="gotoDetail(item.content_id)"
            >
              <span> {{ item.content_title }}</span>
              <span> {{ item.publish_date }}</span>
              <div
                v-show="(i + 1) % 5 === 0 && i !== policyList.length - 1"
                class="dashed"
              ></div>
            </li>
          </ul>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="24"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="policy-box-right" v-else>
        <div class="title">
          {{ content_detail.content_title }}
        </div>
        <div class="content-list" v-html="content_detail.content_text">
          <!-- {{  }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { policyTab, policyList, policyDetail } from "@/api/api.js";
export default {
  name: "Policy",
  data() {
    return {
      tabList: [],
      policyList: [
        // { title: "中华人民共和国合同法（修正）", date: "08-10" },
      ],
      tabOption: 0,
      right_title: "",
      total: 150,
      page: "1",
      lastPage: "",
      currentPage1: 1,
      firstTabId: "",
      content_detail: "",
      tabName: "",
      nowcatalogId: "",
    };
  },

  components: {},

  computed: {},

  methods: {
    getTab() {
      console.log(this.$data);
      let that = this;
      policyTab().then(function (res) {
        let data = res.data.menuList;
        that.firstTabId = res.data.menuList[0].catalogId;
        that.right_title = res.data.menuList[0].catalogName;
        console.log(res.data.menuList[0]);
        that.getList("1", res.data.menuList[0].catalogId);
        that.tabList = data;
        data.map((item, index) => {
          if (item.catalogName === that.tabName) {
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
      await policyList(data).then(function (res) {
        that.policyList = res.data.policyPageInfo.rows;
        that.total = res.data.policyPageInfo.records;
        console.log(res);
      });
    },
    // 点击左侧菜单栏 切换数据
    handlegetList(i) {
      this.currentPage1 = 1;
      this.content_detail = "";
      this.nowcatalogId = i.catalogId;
      console.log(i.catalogId);
      this.getList("1", i.catalogId);
    },
    gotoDetail(i) {
      console.log(i);
      let id = i;
      let that = this;
      let data = {
        content_id: id,
      };
      console.log(data);
      policyDetail(data).then(function (res) {
        that.content_detail = res.data.content;
        console.log(res);
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页:${val}`, val);
      this.getList(`${val}`, this.nowcatalogId);
    },
  },
  async created() {
    let that = this;
    let id = this.$route.query.id;
    let tabName = this.$route.query.tabName;
    that.tabName = tabName;
    if (tabName) {
      this.right_title = tabName;
    }
    console.log(that.tabName);
    if (id) {
      this.gotoDetail(id);
    }
    that.getTab();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.policy {
  width: 62.5%;
  min-height: 77rem;
  margin:0 auto;
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
    min-height: 60rem;
    justify-content: space-between;
    padding-bottom: 5rem;
    // position: relative;
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
        ul {
          padding-bottom: 30px;
          &:first-child {
            list-style: inside;
          }
          li {
            width: 100%;
            margin-top: 1.375rem;
            span {
              &:first-child {
                color: #35393f;
                width: 70%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                  color: #2882fe;
                }
              }
              &:nth-child(2) {
                float: right;
                color: #6f7884;
              }
            }

            .dashed {
              width: 100%;
              height: 1px;
              border-bottom: 1px dashed #d6dce7;
              margin-top: 1.875rem;
              margin-bottom: 0.313rem;
            }
          }
        }
      }
      .pagination {
        // position: absolute;
        // bottom: 45px;
        // left: 40%;
        text-align: center;
        margin: 1.75rem 0;
      }
    }
  }
}
</style>

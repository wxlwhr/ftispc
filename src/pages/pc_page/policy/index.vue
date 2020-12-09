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
      <div class="policy-box-right" v-if="content_detail===''">
        <div class="title">
          {{ right_title }}
        </div>
        <div class="content-list">
          <ul>
            <li v-for="(item, i) in policyList" :key="i" @click="gotoDetail(item)">
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
          <div class="content-list">
            {{content_detail.content_text}}
            两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、
阅读全文
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
      right_title: "国家法律",
      total: 150,
      page: "1",
      lastPage: "",
      currentPage1: 1,
      firstTabId:'',
      content_detail:""
    };
  },

  components: {},

  computed: {},

  methods: {
    async getTab() {
      let that = this;
      await policyTab().then(function (res) {
        that.tabList = res.data.menuList;
        that.firstTabId=res.data.menuList[0].catalog_id
        let aaa=res.data.menuList[0].catalog_id
        that.getList("1",aaa);
        console.log(res);
      });
    },
    async getList(page,id) {
      let that = this;
      let data = {
        page: page,
        rows: "15",
        catalog_id: id,
      };
      console.log(data);
      await policyList(data).then(function (res) {
        that.policyList = res.data.policyPageInfo.rows;
        console.log(res.data.policyPageInfo.rows);
      });
    },
    handlegetList(i) {
      this.currentPage1=1
      this.content_detail=""
      console.log(i.catalogId);
      this.getList("1",i.catalogId);
    },
    gotoDetail(i) {
      console.log(i);
      let id = i.content_id;
      let that = this;
      let data = {
        content_id: id,
      };
      console.log(data);
      policyDetail(data).then(function (res) {
        that.content_detail=res.data.content
        console.log(res);
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页:${val}`, val);
      this.getList(`${val}`)
    },
  },
  created() {
    this.getTab();
  },
  mounted(){
    console.log(this.firstTabId)
    

  }
};
</script>
<style lang="scss" scoped>
.policy {
  width: 100%;
  min-height: 77rem;
  padding: 0 360px;
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
    min-height: 50rem;
    justify-content: space-between;
    padding-bottom: 5rem;
    position: relative;
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
        ul {
          &:first-child {
            list-style: inside;
          }
          li {
            margin-top: 1.375rem;
            span {
              &:first-child {
                color: #35393f;
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
              border: 1px dashed #d6dce7;
              margin-top: 1.875rem;
              margin-bottom: 0.313rem;
            }
          }
        }
      }
      .pagination {
        position: absolute;
        bottom: 45px;
        left: 40%;
        text-align: center;
        margin: 1.75rem 0;
      }
    }
  }
}
</style>

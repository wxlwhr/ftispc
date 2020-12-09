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
              right_title = item.label;
              tabOption = index;
            "
            :class="tabOption === index ? 'active' : ''"
          >
            {{ item.label }}
            <span><i class="el-icon-arrow-right"></i></span>
          </li>
        </ul>
      </div>
      <div class="policy-box-right">
        <div class="title">
          {{ right_title }}
        </div>
        <div class="content-list">
          <ul>
            <li v-for="(item, i) in policyList" :key="i">
              <span> {{ item.title }}</span>
              <span > {{ item.date }}</span>
              <div
                v-show="(i + 1) % 5 === 0 && i !== policyList.length - 1"
                class="dashed"
              ></div>
            </li>
          </ul>
          <div class="pagination">
            <el-pagination  background layout="prev, pager, next" :total="1000">
      </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Policy",
  data() {
    return {
      tabList: [
        { label: "国家法律", value: "0" },
        { label: "行政规范", value: "1" },
        { label: "自律规范", value: "2" },
        { label: "其他", value: "3" },
      ],
      policyList: [
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
        { title: "中华人民共和国合同法（修正）", date: "08-10" },
      ],
      tabOption: 0,
      right_title: "国家法律",
    };
  },

  components: {},

  computed: {},

  methods: {},
  created() {},
};
</script>
<style lang='scss' scoped>
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
               
                &:hover{
                   text-decoration:underline;
                   color:#2882fe;
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
      .pagination{
        text-align: center;
        margin: 1.75rem 0;
      }
    }
  }
}
</style>
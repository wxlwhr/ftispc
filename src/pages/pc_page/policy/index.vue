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
            @click="handleChangeTab(index)"
            :class="tabOption === index ? 'active' : ''"
          >
            {{ item.label }}
            <span><i class="el-icon-arrow-right"></i></span>
          </li>
        </ul>
      </div>
      <div class="policy-box-right">
         <div class="title">
            {{right_title}}
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
      tabOption: "",
      right_title:""
    };
  },

  components: {},

  computed: {},

  methods: {
    handleChangeTab(i) {
      this.tabOption = i;
      this.tabList.filter(item => {
         if(item.value==i){
            this.right_title=item.label
         }
      })
    },
  },
  created(){
     this.tabOption=0
  }
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
      .title{
         height: 5rem;
         line-height: 5rem;
         font-size: 1.6rem;
         text-align: center;
      }
    }
  }
}
</style>
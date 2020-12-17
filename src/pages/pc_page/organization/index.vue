<template>
  <div class="organization">
    <div class="organization-title">
      <span class="organization-title-tag"></span>
      <span class="organization-title-tit">机构列表</span>
    </div>
    <div class="organization-tab">
      <div
        class="tab-item"
        :class="tabOption === index ? 'active' : ''"
        v-for="(item, index) in organType"
        :key="index"
        @click="
          tabOption = index;
          handleTabChange(item);
        "
      >
        {{ item.label }}
      </div>
    </div>
    <OrganList :logolist="list" v-if="list.length != 0" />
    <div class="page-tab">
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
</template>

<script>
import OrganList from "@/components/organList";
import { organList,getSelectData } from "@/api/api.js";
export default {
  name: "Organization",
  components: {
    OrganList,
  },
  computed: {},

  data() {
    return {
      list: [],
      organType: [],
      tabOption: 0,
      total: 240,
      page: "1",
      lastPage: "",
      currentPage1: 1,
      firstTabValue:""
    };
  },
  methods: {
    // 入驻机构列表申请
    async getOrganList(page,organ) {
      let that = this;
      let data = {
        page: page,
        rows: "24",
        organ_type:organ
      };
      await organList(data).then(function (res) {
        that.list = res.data.organPageInfo.rows;
        that.$nextTick(()=>{
          that.flag="1"
        })
        console.log(that.list)
        console.log(res);
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页:${val}`, val);
      this.getOrganList(`${val}`,this.organ_type_value)
    },
    handleTabChange(i) {
      this.getOrganList("1",i.value)
      this.organ_type_value=i.value
      console.log(i)
    },
    handletab(){
      let that=this
      getSelectData(["ORGAN_TYPE"]).then(function (response) {
        that.organType = response[0].ORGAN_TYPE;
        let aaa=response[0].ORGAN_TYPE[0].value

        console.log(response);
        console.log(aaa)
        console.log(that.organType[0].value);
        that.firstTabValue=aaa
        that.getOrganList('1',aaa);
      });
    }
  },
  created() {
    this.handletab()
  },
  mounted() {
    
  },
};
</script>
<style lang='scss' scoped>
.organization {
  width: 100%;
  min-height: 77rem;
  &-title {
    width: 62.5%;
    margin: 1.75rem auto;
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
  &-tab {
    width: 62.5%;
    margin: 1.75rem auto;
    display: flex;
    align-items: center;
    justify-content: start;
    div {
      font-size: 1.1rem;
      height: 2.2rem;
      line-height: 2.2rem;
      margin-right: 10px;
      padding: 0 10px;
      cursor: pointer;
    }
    .active {
      border: 1px solid #2882fe;
      color: #2882fe;
      border-radius: 30px;
    }
  }
  .page-tab {
    width: 62.5%;
    margin: 1.75rem auto;
    .el-pagination {
      text-align: center;
      margin: 0 auto;
    }
  }
}
</style>
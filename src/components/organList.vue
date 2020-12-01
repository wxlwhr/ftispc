<template>
  <div class="organList">
    <el-row>
      <div class="aaa" v-for="(item, index) in logolist" :key="index">
        <div class="organ_logo" @click="handleOrganDetail">
          <img :src="item.src" alt="" style="width: 12.5rem; height: 12.5rem" />
        </div>
        <div class="organ_name">{{ item.organ_name }}</div>
      </div>

      <!-- <div style="width:2.18rem" v-for="(item,index) in logolist" :key="index"></div> -->
    </el-row>
    <div class="more">
      <el-button v-if="type === 'btn'" type="primary" class="more_btn"
        >查看更多<i class="el-icon-arrow-right el-icon--right"></i
      ></el-button>
      <el-pagination v-else background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrganList",
  props: {
    logolist: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "btn",
    },
  },
  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {
    handleOrganDetail(e){
      this.$router.push('/organizationDetail')
      console.log(e)
    }
  },
};
</script>
<style lang='scss' scoped>
.organList {
  width: 100%;
  .el-row {
    margin-top: 2rem;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    .aaa {
      width: 20%;
      height: 17.625rem;
      .organ_logo {
        width: 13rem;
        height: 13rem;
        border: 1px solid #cfd2d7;
        border-radius: 8px;
        position: relative;
        margin: auto;
        cursor: pointer;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -6.25rem;
          margin-left: -6.25rem;
        }
      }
      .organ_name {
        text-align: center;
        margin-top: 1rem;
        font-size: 1rem;
        font-weight: 600;
        font-family: MicrosoftYaHei-Bold;
        font-stretch: normal;
        letter-spacing: 0;
        color: #35393f;
      }
    }
  }
  .more {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 3rem;
    .more_btn {
      width: 98px;
      height: 32px;
      padding: 0;
      font-size: 1rem;
    }
  }
}
</style>
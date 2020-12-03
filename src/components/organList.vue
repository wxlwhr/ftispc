<template>
  <div class="organList">
    <el-row>
      <div class="aaa" v-for="(item, index) in logolist" :key="index">
        <div class="organ_logo" @click="handleOrganDetail" >
          <img :src="item.src" alt="" style="width: 12.5rem; height: 12.5rem" />
        </div>
        <div class="mask">
          <span>{{item.organ_name}}</span>
          <img src="@/assets/magnifier.png" alt="">
        </div>
      </div>
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
    return {
      
    };
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
  width: 1200px;
  .el-row {
    margin-top: 2rem;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    .aaa {
      width: 200px;
      height: 200px;
      position: relative;
      .organ_logo {
        width: 200px;
        height: 200px;
        border: 1px solid #cfd2d7;
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
      &:hover{
        .mask{
          opacity: .9;
        }
      }
    }
  }
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: #2882fe;
    color: #fff;
    span{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    img{
      position: absolute;
      bottom: 5px;
      right: 5px;
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
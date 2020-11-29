<template>
  <div class="index">
    <div class="plat_intro">
      <p class="title">平台简介</p>
      <div class="bottom_wire"></div>
      <!-- <div class="a">ad</div> -->
      <div class="plat_infor">
        <div class="img_box">
          <img src="@/assets/plat_img.png" alt="" style="width:40rem;height:32rem"/>
        </div>
        <div class="plat_msg">
           <p>{{ plat_infor }}</p>
           <p>{{ plat_infor }}</p>
           <p>{{ plat_infor2 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "Index",
  data() {
    return {
      plat_infor:
        "金融科技服务能力共享系统是一个以AI驱动产业数字化的新型数字平台。平台以AI、数据技术、物联网、区块链等前沿数字科技为基础，建立并发展起核心的风险管理能力、用户运营能力、产业理解能力和企业服务能力。平台以AI、数据技术、物联网、区块链等前沿数字科技为基础，建立并发展起核心。",
      plat_infor2:"金融科技服务能力共享系统是一个以AI驱动产业数字化的新型数字平台。平台以AI、数据技术、物联网、区块链等前沿数字科技为基础，建立并发展起核心的风险管理能力、用户运营能力、产业理解能力和企业服务能力。"
    };
  },

  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang='scss' scoped>
.index {
  .plat_intro {
    //  text-align: center;
    margin: auto;
    height: 2rem;
    line-height: 2rem;
    .title {
      font-family: MicrosoftYaHei;
      font-size: 2rem;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #2882fe;
    }
    .bottom_wire {
      width: 4rem;
      height: 3px;
      background-color: #2882fe;
      border-radius: 6px;
      margin: auto;
      margin-top: 6px;
    }
    .plat_infor {
      display: flex;
      justify-content: space-between;
      width: 86rem;
      margin:auto;
      .img_box {
        width: 40rem;
        height: 32rem;
        margin-top: 1.875rem;
      }
      .plat_msg {
        width: 43rem;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 2rem;
        color: #35393f;
        margin: auto 0;
        text-align: start;
      }
    }
  }
}
</style>
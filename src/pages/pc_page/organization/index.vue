<template>
  <div class="organization">
    <div class="organization-title">
      <span class="organization-title-tag"></span>
      <span class="organization-title-tit">机构列表</span>
    </div>
    <OrganList :logolist="logolist" type="pagination"/>
  </div>
</template>

<script>
import img1 from "@/assets/organlogos/logo1.jpg";
import img2 from "@/assets/organlogos/logo2.jpg";
import img3 from "@/assets/organlogos/logo3.jpg";
import img4 from "@/assets/organlogos/logo4.jpg";
import img5 from "@/assets/organlogos/logo5.jpg";
import img6 from "@/assets/organlogos/logo6.jpg";
import img7 from "@/assets/organlogos/logo7.jpg";
import img8 from "@/assets/organlogos/logo8.jpg";
import img9 from "@/assets/organlogos/logo9.jpg";
import OrganList from "@/components/organList";
export default {
  name: "Organization",
  components: {
    OrganList,
  },
  computed: {},

  data() {
    return {
      logolist: [
        {
          src: img1,
          organ_name: "易宝支付",
        },
        {
          src: img2,
          organ_name: "京东数科",
        },
        {
          src: img3,
          organ_name: "度小满金融",
        },
        {
          src: img4,
          organ_name: "恒生电子",
        },
        {
          src: img5,
          organ_name: "旷世",
        },
        {
          src: img6,
          organ_name: "长亮科技",
        },
        {
          src: img7,
          organ_name: "顶象",
        },
        {
          src: img8,
          organ_name: "神州信息",
        },
        {
          src: img9,
          organ_name: "微众银行",
        },
        {
          src: img1,
          organ_name: "易宝支付",
        },
        {
          src: img8,
          organ_name: "神州信息",
        },
        {
          src: img9,
          organ_name: "微众银行",
        },
      ],
    };
  },

  methods: {},
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
}
</style>
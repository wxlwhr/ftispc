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
import img1 from "@/assets/du.png";
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
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
        },
        {
          src: img1,
          organ_name: "度小满金融",
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
}
</style>
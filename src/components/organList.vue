<template>
  <div class="organList">
    <el-row>
      <div class="aaa" v-for="(item, index) in logolist" :key="index">
        <div class="organ_logo">
          <!-- <img :src="src+item.logoFile" alt="" /> -->
          <img :src="$store.state.url+'/attach/binary?attachmentId='+item.logoFile" alt="" />
        </div>
        <div class="mask">
          <span>{{ item.organName }}</span>
          <img
            id="imgorganlogo"
            src="@/assets/magnifier.png"
            alt=""
            @click="handleOrganDetail(item, index)"
          />
        </div>
      </div>
    </el-row>
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
  },
  data() {
    return {
      src: "",
      // srcList: [],
    };
  },

  components: {},

  computed: {

  },

  watch: {
    logolist: (newval, oldval) => {
      console.log(this)
      console.log(newval, oldval);
      // this.handledatachange()
    },
  },
  methods: {
    handleOrganDetail(i, j) {
      this.$router.push({
        path: "/organizationDetail",
        query: { id: i.organId },
      });
      console.log(i, j);
    },
    handledatachange() {
      let url = this.$store.state.url;
      let src= url + "/attach/binary?attachmentId=";
      this.src=src
    },
  },
  created() {
    console.log(this.logolist);
    this.handledatachange()

  },
  mounted() {},

  updated() {
  },
};
</script>
<style lang='scss' scoped>
.organList {
  width: 62.5%;
  margin: 0 auto;
  .el-row {
    margin-top: 2rem;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    .aaa {
      width: 16.6%;
      position: relative;
      border: 1px solid #cfd2d7;
      .organ_logo {
        width: 99.9%;
        height: 99.9%;
        position: relative;
        margin: auto;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          // object-fit: cover;
          // position: absolute;
          // top: 50%;
          // left: 50%;
          // margin-top: -6.25rem;
          // margin-left: -6.25rem;
        }
      }
      &:hover {
        .mask {
          opacity: 0.9;
        }
      }
    }
  }
  .mask {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    font-size: 1rem;
    background: #2882fe;
    color: #fff;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    img {
      position: absolute;
      bottom: 5px;
      right: 5px;
    }
  }
}
</style>
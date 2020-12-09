<template>
  <div class="organList">
    <el-row>
      <div class="aaa" v-for="(item, index) in logolist" :key="index">
        <div class="organ_logo">
          <img
            :src="srcList[index]"
            alt=""
          />
        </div>
        <div class="mask">
          <span>{{ item.organName }}</span>
          <img
            id="imgorganlogo"
            src="@/assets/magnifier.png"
            alt=""
            @click="handleOrganDetail(item,index)"
          />
        </div>
      </div>
    </el-row>
    <div class="more">
      <el-button v-if="type === 'btn'" type="primary" plain class="more_btn"
        >更多<i class="el-icon-arrow-right el-icon--right"></i
      ></el-button>
      <!-- <el-pagination v-else background layout="prev, pager, next" :total="1000">
      </el-pagination> -->
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
      src: "",
      srcList: [],
    };
  },

  components: {},

  computed: {},

  methods: {
    handleOrganDetail(i,j) {
      this.$router.push({path:"/organizationDetail",query:{id:i.organId}});
      console.log(i,j);
    },
  },
  created() {
    console.log(this.logolist)
    // 有数据之后放开
    // let url=this.$store.state.url
    // let list=[]
    // let src=url+"/attach/binary?attachmentId="
    // this.logolist.map((item,index)=>{
    //   list.push(src+item.logoFile)
    // })
    // this.srcList=list
    // 临时写的死数据
    let url = this.$store.state.url;
    let list = [];
    let src = url + "/attach/binary?attachmentId=";
    this.logolist.map((item, index) => {
      list.push(src + "b647ff882a644def9e54e614264649bd");
    });
    this.srcList = list;
    // console.log(this.srcList);
    // console.log(this.logolist);
  },
  mounted() {
  },
  updated(){
    console.log(this.logolist)
  }
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
        width: 15.5rem;
        height: 15.5rem;
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
  .more {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 3rem;
    .more_btn {
      width: 75px;
      height: 32px;
      padding: 0;
      font-size: 1rem;
    }
  }
}
</style>
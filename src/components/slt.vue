<template>
  <div class="wrapper">
    <el-select v-model="v" placeholder="--请选择--" filterable>
      <el-option
        v-for="item in listParameter"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "slt",
  props: {
    listParameter: {
      type: Array,
      default: ()=>[],
    },
    selectValue: {
      type: String,
      default:()=>{},
    },
  },
  data() {
    return {
      options:[],
      v:''
    };
  },

  components: {},
  watch: {
    //判断下拉框的值是否有改变
    v(val, oldVal) {
      // console.log('new: %s, old: %s', val, oldVal)
      if (val != oldVal) {
        this.$emit("input", this.v);
      }
    },
  },
  computed: {},

  methods: {},
  created() {
    console.log(this.listParameter);
    console.log(this.selectValue)
    // console.log(this);
    let arr=this.listParameter
    for(let i=0;i<arr.length;i++){
      if(arr[i].value===this.selectValue){
        this.v=arr[i].label
      }
    }
  },
  mounted() {
    let that = this;
    // console.log(this.listParameter);

    //   初始化下拉框的值

    // this.selectValue = this.value;
    //远程请求回来的数据
  },
};
</script>
<style lang='scss' scoped>
.wrapper {
  .el-select {
    width: 100%;
    height: 100%;
  }
}
</style>
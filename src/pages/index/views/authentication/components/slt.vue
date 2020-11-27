<template>
  <div class="wrapper">
    <el-select v-model="selectValue" placeholder="--请选择--" filterable>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { getSelectData } from "@/api/api.js";
export default {
  name:'slt',
  props: {
    listParameter: {      //导入请求地址
      type: Array,
      required:true
    }, 

  },
  data() {
    return {
      options: [],
      selectValue: "",
    };
  },

  components: {},

  computed: {},

  methods: {},
  created() {
    console.log("jiazaile")
  },
  mounted() {
    let that=this
    //   初始化下拉框的值
    this.selectValue = this.value;
    //远程请求回来的数据
    getSelectData(this.listParameter).then(function (response) {
      console.log(response);
      that.options=response[0]
    });

    // let parames = {
    //   moduleName: eval(this.urlName),
    //   functionName: this.url,
    //   methodName: this.metName,
    //   data: {
    //     // 查询条件
    //     dictTypeCode: this.dtName,
    //   },
    // };
    // this.http(JSON.stringify(parames))
    //   .then((res) => {
    //     alert(JSON.stringify(res.data.dictList));
    //     this.options = this._dataTransform(res.data.dictList);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },
};
</script>
<style lang='scss' scoped>
.wrapper{
  width: 450px;
}
</style>
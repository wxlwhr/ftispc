<template>
  <div class="wrapper">
    <!-- <el-row>
      <el-col :span="6"> -->
        <el-dropdown trigger="click"  @command="handleCommand">
          <span class="el-dropdown-link">
            {{val}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  v-for="(item,index) in selection" :key="index" :command="item.value">{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      <!-- </el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
        val:'下拉菜单',
        selection:[
            {label:'黄金糕',value:'1'},
            {label:'狮子头',value:'2'},
            {label:'螺蛳粉',value:'3'},
            {label:'双皮奶',value:'4'},
            {label:'蚵仔煎',value:'5'},
        ]
    };
  },

  components: {},

  computed: {},

  methods: {
      handleCommand(command) {
          console.log(command)
          this.selection.map((item,i)=>{
              if(item.value===command){
                  this.val=item.label
              }
          })
      }
  },
};
</script>
<style lang='scss' scoped>
.wrapper {
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
<template>
  <div class="wrapper">
    <!-- <el-row>
      <el-col :span="6"> -->
        <el-dropdown trigger="click"  @command="handleCommand">
          <span class="el-dropdown-link" id="link-tab">
            {{val}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  v-for="(item,index) in dropdata" :key="index" :command="item.value">{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      <!-- </el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  props:{
    dropdata:{
      type:Array,
      default: () => {},
    },
    name:{
      type:String
    }
  },
  data() {
    return {
        val:'',
        selection:[
        ]
    };
  },

  components: {},

  computed: {},

  methods: {
      handleCommand(command) {
          console.log(command)
          // document.getElementById("link-tab").style.color="#000";
          // document.getElementById("link-tab").style.fontWeight="600";
          console.log(this.val)
          this.dropdata.map((item,i)=>{
              if(item.value===command){
                this.val=item.label
                this.$emit('handleId',command)
              }
          })
      }
  },
  created(){
    this.val=this.name
  }
};
</script>
<style lang='scss' scoped>
.wrapper {
  .el-dropdown-link {
    cursor: pointer;
    overflow: hidden;
    // color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: .75rem;
  }
}
</style>
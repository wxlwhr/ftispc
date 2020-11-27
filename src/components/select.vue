<!-- 下拉菜单组件 -->
<template>
  <div class="wrapper">
    <!-- <div class="selectBtn">{{name}}<i class="el-icon-arrow-down" style="margin-left:8px"></i></div> -->
    <el-dropdown trigger="click">
      <span class="el-dropdown-link" style="font-size:14px;">
        {{selectList.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for='(item, index) in selectList.list' :key="index" style="font-size:12px">
          <img src=""/>
          {{item.option}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    selectList: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectList: this.$props.selectList,
    };
  },

  components: {},

  computed: {},
  created(){

  },

  methods: {

  }
};
</script>
<style lang='scss' scoped>
.wrapper {
  height: 100%;
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
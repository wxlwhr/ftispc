<!-- 面包屑组件 -->
<template>
  <span class="breadcrumb">
    <span style="line-height:53px">
      <i class="el-icon-location"></i>
      <span>位置:</span>
    </span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="index"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </span>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbList: [],
    };
  },

  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    },
  },
  mounted(){
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // 去空name
      this.breadcrumbList = this.$route.matched.filter((item) => {
        return item.name;
      });
      return this.breadcrumbList;
    },
  },
};
</script>
<style lang='scss' scoped>
.breadcrumb {
  display: flex;
  font-size:12px;
  color:#6e7e8f;
  justify-content: flex-start;
  .el-breadcrumb {
    line-height: 53px;
    font-size:12px;

  }
  /deep/ .el-breadcrumb__separator[class*=icon]{
    margin: 0;
  }
}
</style>
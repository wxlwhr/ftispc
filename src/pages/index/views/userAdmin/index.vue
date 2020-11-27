<!-- 用户管理  页面-->
<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
  
  
</template>

<script>
export default {
  name: 'userAdmin',
}
</script>
<style lang="scss" scoped>
.wrapper{
  min-height: 600px;
  background: #fff;
}
</style>
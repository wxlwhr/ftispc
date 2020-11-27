<!-- 左侧菜单栏组件 -->
<template>
  <div class="sidebar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      background-color="#222b3a"
      text-color="#fff"
      active-text-color="#236dd4"
      v-for="(item, index) in list"
      :key="index"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <template v-if="item.secondMenu && item.secondMenu.length > 0">
        <el-submenu font-size="14px" :index="item.selct">
          <template slot="title" margin-left="14px">
            <i :class="item.icon"></i>
            <span style="color: #8690a2">{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="(item, index) in item.secondMenu"
            :key="index"
            :index="item.index"
            @click="toPage(item)"
            >{{ item.title }}</el-menu-item
          >
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item
          :index="item.index"
          class="menu-item"
          @click="toPage(item)"
        >
          <template slot="title" margin-left="14px">
            <i :class="item.icon"></i>
            <span style="color: #8690a2; font-size: 14px">{{
              item.title
            }}</span>
          </template></el-menu-item
        >
      </template>
    </el-menu>
  </div>
</template>
<script>
import { list } from "@/pages/index/config/sidebar";
export default {
  name: "sidebar",
  data() {
    return {
      list,
      activeIndex: "1-1",
    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        const path = this.getSlashValue(val.path);
        this.activeIndex = path;
      },
      // 深度观察监听
      deep: true,
    },
  },
  mounted() {
    // 页面刷新获取当前路由，选中菜单
    const route = this.$route;
    const path = this.getSlashValue(route.path);
    this.activeIndex = path;
  },
  // watch: {
  //       /**
  //        * 激活菜单导航
  //        */
  //       '$store.state.menu': {
  //           handler(val) {
  //               this.activeIndex = val
  //           },
  //           immediate: true
  //       }
  //   },
  methods: {
    getSlashValue(val) {
      const regex = new RegExp("/", "g");
      var result = val.match(regex).length;
      if(result <=2){//二级
        return val
        .substr(val.lastIndexOf("/", val.lastIndexOf("/")) + 1)
      }
      // 三级
      return val
        .substr(val.lastIndexOf("/", val.lastIndexOf("/") - 1) + 1)
        .substring(
          0,
          val
            .substr(val.lastIndexOf("/", val.lastIndexOf("/") - 1) + 1)
            .lastIndexOf("/")
        );
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(index, indexPath) {
      let path = "";
      indexPath.forEach((item) => {
        path += "/" + item;
      });
      console.log(indexPath);
      this.$router.push({
        path,
      });
    },
    toPage(data) {
      this.activeIndex = data.index;
      console.log(this.activeIndex, "this.activeIndex");
    },
  },
  beforeCreate() {
    // console.log(list);
  },
  created() {
    // console.log(list);
  },
  beforeMount() {
    // console.log(list);
  },
};
</script>
<style lang="scss" scoped>
.el-menu-vertical {
  border: 0;
}
.el-menu-item {
  color: #fff;
  font-size: 12px;
}
.el-submenu {
  background-color: #222b3a;
  // .el-submenu__title{color: #fff;}
}

body > .el-container {
  margin-bottom: 40px;
}
</style>

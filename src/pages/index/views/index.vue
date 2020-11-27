<template>
  <div>
    <el-container style="height:100%;overflow: hidden;">
      <el-header height="80px">
        <!-- 头部 start -->
        <Header></Header>
      </el-header>
      <el-container style="overflow: hidden;">
        <el-aside width="200px">
          <SideBar></SideBar>
        </el-aside>
        <el-container>
          <el-header
            style="
              text-align: left;
              font-size: 12px;
              display: fixed;
              background-color: #ebeff3;
              height: 53px;
              line-height: 53px;
            "
          >
            <Breadcrumb></Breadcrumb>
          </el-header>

          <el-main style="padding: 0 20px;">
            <router-view></router-view>
          </el-main>
          <!-- 底部 start-->
          <el-footer
            style="
              text-align: center;
              font-size: 12px;
              background-color: #ebeff3;
            "
          >
            ©2019
            中国互联网金融协会中国互联网金融服务平台金融科技服务能力共享系统版权所有
          </el-footer>
          <!-- 底部 end-->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
export default {
  components: { Breadcrumb, Header },
  name: "App",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(10).fill(item),
    };
  },
  methods: {},
};
</script>

<style>
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #222b3a;
  color: #8690a2;
  border: 0;

}
.el-main {
  background-color: #e9eef3;
  color: #333;
  border: 0;
  padding: 0;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-aside::-webkit-scrollbar{
  width: 0;
}
</style>
<template>
  <div class="wrapper">
    <el-dialog title="关联用户" :visible.sync="visibleRole">
      <main>
        <div>
          <el-form :inline="true" :model="formInline" label-width="auto">
            <el-form-item label="姓名:">
              <el-input placeholder="姓名" v-model="formInline.user_name"></el-input>
            </el-form-item>
            <el-form-item label="部门名称:">
              <el-input placeholder="部门名称" v-model="formInline.department"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="find()" class="searchBtn">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="display: flex">
            <!-- 搜索框 -->
          <div style="width: 45%;">
            <el-table :data="checkUserList" style="width: 100%; margin-top: 20px;font-size:12px;" :row-style="{height:'40px'}" :cell-style="{padding:'0'}" @selection-change="changeFun">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column v-if="false" prop="user_id" label="角色id"></el-table-column>
              <el-table-column prop="user_name" label="姓名"> </el-table-column>
              <el-table-column prop="department" label="部门"> </el-table-column>
              <el-table-column prop="position" label="职务"> </el-table-column>
            </el-table>
          </div>
          <div style="width: 10%;margin-left: 10px;margin-top: 100px">
            <div>
              <el-button type="primary" @click="lefts()"><<</el-button>
            </div>
            <div style="margin-top: 30px">
              <el-button type="primary" @click="rigths()">>></el-button>
            </div>
          </div>
          <div style="width: 45%;">
            <el-table :data="userList" style="width: 100%; margin-top: 20px;font-size:12px;" :row-style="{height:'40px'}" :cell-style="{padding:'0'}" @selection-change="changeFun">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column v-if="false" prop="user_id" label="角色id"></el-table-column>
              <el-table-column prop="user_name" label="姓名"> </el-table-column>
              <el-table-column prop="department" label="部门"> </el-table-column>
              <el-table-column prop="position" label="职务"> </el-table-column>
            </el-table>
          </div>
        </div>
      </main>
    </el-dialog>
  </div>
</template>

<script>
import {getAdminUser,subRoleAndUser} from "@/api/api.js";
import utils from "@/util/util";
export default {
  name: "relaUser",
  data() {
    return {
      visibleRole:false,
      formInline: {
        role_id:"",
        user_name:"",
        department:"",
        is_check:false
      },
      userList:utils.userList,
      checkUserList:[],
      checkList:[],
      role_id:"",
      subIds:{
        checkedUserId:[],
        roleId:"",
        unCheckUserId:[]
      }
    };
  },
  mounted: function () {
  },
  methods: {
    getCheckUserList(){
      let that = this;
      let form = that.formInline
      form.is_check = true
      getAdminUser(form).then(function (response) {
        that.checkUserList = response.data.userList
      })
    },
    getUserList(){
      let that = this;
      let form = that.formInline
      form.is_check = false
      getAdminUser(form).then(function (response) {
        that.userList = response.data.userList
      })
    },
    find(){
      this.getUserList();
    },
    changeFun(val){
      this.checkList = val
    },
    lefts(){
      let that = this
      for (let i = 0;i <this.checkList.length;i++){
        if(this.checkUserList.indexOf(this.checkList[i]) === -1) {
          this.subIds.checkedUserId.push(this.checkList[i].user_id)
        }
      }
      subRoleAndUser(that.subIds).then(function (response){
        that.subIds.checkedUserId = []
      }).then(function (){
        that.getCheckUserList();
        that.getUserList();
      })
    },
    rigths(){
      let that = this
      for (let i = 0;i <this.checkList.length;i++){
        let index = this.checkUserList.indexOf(this.checkList[i])
        if(index!=-1){
          this.subIds.unCheckUserId.push(this.checkList[i].user_id);
        }
      }
      subRoleAndUser(that.subIds).then(function (response){
        that.subIds.unCheckUserId = []
      }).then(function (){
        that.getCheckUserList();
        that.getUserList();
      })
    },
    handlexsyc(value){
      this.role_id=value
      this.formInline.role_id = value
      this.subIds.roleId = value
      this.visibleRole=true
      this.getCheckUserList();
      this.getUserList();
    }
  },
};
</script>
<style lang='scss' scoped>
.el-header {
  background-color: #fff;
  border-bottom: 1px solid #ebeff3;
  text-align: start;
  line-height: 57px;
  font-weight: 600;
  font-size: 15px;
}
.el-main {
  min-height: 600px;
  background-color: #fff;
  .addMenuBtn {
    margin-top: 19px;
    margin-left: 10px;
    width: 100px;
    height: 32px;
    padding: 0;
    font-size: 12px;
  }
}
#menu__refresh {
   color: #b3bbc6;
   position: absolute;
   right: 15px;
   top: 17px;
   font-size: 18px;
 }
.el-aside {
  min-height: 600px;
  background-color: #fff;
  border-right: 1px solid #ebeff3;
  .menu__structure {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    font-weight: 500;
    color: #000;
    border-bottom: 1px solid #ebeff3;
    position: relative;
    #menu__icon {
      margin-left: 20px;
      margin-right: 5px;
      font-size: 10px;
    }
    #menu__refresh {
      color: #b3bbc6;
      position: absolute;
      right: 15px;
      top: 17px;
      font-size: 18px;
    }
  }
  .treemenu {
    margin-top: 10px;
    margin-left: 10px;
  }

  /deep/.el-table .cell {
    line-height: 40px;
  }
}
</style>

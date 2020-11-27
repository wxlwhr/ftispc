<template>
  <div class="wrapper">
    <el-dialog title="关联菜单" :visible.sync="visibleRole" width="40%">
      <div class="menu__structure">
        <i class="iconfont iconcaidan" id="menu__icon"></i>目录
      </div>
      <el-main class="structure_box" style="min-height: 400px">
        <treeCheck ref="treeX" :keys="keys" :dataList="treeData" @handle="handlechange" style="margin-left:20px"></treeCheck>
      </el-main>
     <div slot="footer" class="dialog-footer">
        <el-button @click="visibleRole = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getTree,getMenuList,addRoleModule,getRoleByRoleId} from "@/api/api.js";
export default {
  name: "rela",
  data() {
    return {
      visibleRole:false,
      treeData:[],
      role_id:"",
      keys:[],
      checkId:""
    };
  },
  created() {
    this.getTreeData();
    this.getMenu('-1');
  },
  methods: {
    // 刷新树
    menuRefresh() {
      this.getTreeData();
      addRoleModule({role_id:this.role_id,module_ids:this.checkId}).then(function (response) {});
    },
    getTreeData() {
      let _this = this;
      getTree().then(function (response) {
        _this.treeData = response.data.module;
      });
    },
    getMenu(val) {
      let that = this;
      getMenuList({ parent_id: val }).then(function (response) {
        that.tableData = response;
      });
    },
    getModuleById(){
      let that = this;
      getRoleByRoleId({role_id:this.role_id}).then(function (response){
        let checkKey = []
        for(let i = 0;i<response.rows.length;i++){
          checkKey.push(response.rows[i].module_id)
        }
        that.keys=checkKey
      })
      this.getTreeData();
      this.getMenu('-1');
    },
    handlexsyc(value){
      this.role_id=value
      this.visibleRole=true
      this.getModuleById();
    },
    handlechange(val){
      this.checkId = val.toString()
      addRoleModule({role_id:this.role_id,module_ids:this.checkId}).then(function (response) {});
      this.visibleRole=false
    },
    addRole(){
      this.$refs.treeX.getCheckedNodes()
    }
  },
};
</script>
<style lang='scss' scoped>
/deep/ .el-dialog__body{
    padding: 10px 20px !important;
  }
.el-main {
  min-height: 0;
  max-height: 200px;
  background-color: #fff;
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
  }
  .treemenu {
    margin-top: 10px;
    margin-left: 10px;
  }
}
</style>

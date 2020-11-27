<template>
  <div class="wrapper">
    <el-form :model="ruleForm" label-width="auto" status-icon :rules="rules">
      <el-form-item label="登录名:">
        <el-input v-model="ruleForm.login_name"></el-input>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input v-model="ruleForm.user_name"></el-input>
      </el-form-item>
      <el-form-item label="部门:">
        <el-input v-model="ruleForm.department"></el-input>
      </el-form-item>
      <el-form-item label="职务:">
        <el-input v-model="ruleForm.position"></el-input>
      </el-form-item>
      <el-form-item label="联系方式:" prop="phone">
        <el-input v-model="ruleForm.telephone"></el-input>
      </el-form-item>
       <el-form-item>
        <el-button @click="noBtn">取 消</el-button>
        <el-button type="primary" @click="okBtn">确 定</el-button>
      </el-form-item>
    </el-form>
   
  </div>
</template>

<script>
import { validatemobile } from "@/util/verify";
import {
  createPlatformmanager,
  modifyPlatformmanager,
} from "@/api/api";
export default {
  name: "Admin",
  components: {},
  props: {
    type:{
      type:String,
      default: () => {},
    },
    ruleForm: {
      type: Object,
      default: () => {},
    },
  },
  computed:{

  },
  data() {
    return {
      rules: {
        phone: [{ validator: validatemobile, trigger: "blur" }],
      },
      formdata:{}
    };
  },
  methods: {
    okBtn() {      
      console.log(this.ruleForm)
      let that = this;
      if (this.type === "add") {
        let data = this.ruleForm
        createPlatformmanager(data).then(function (res) {
          console.log(res);
           that.$emit('close')
        });
      } else {
        let data=this.ruleForm
        let a = {
          user_id:this.ruleForm.user_id,
        };
        Object.assign(data,a)
        console.log(data)
        modifyPlatformmanager(data).then(function (res) {
          console.log(res);
          that.$emit('close')
        });
      }
    },
    noBtn(){
      this.$emit('close')
    }
  },
  created(){
    console.log(this.ruleForm)
    
  }
};
</script>
<style lang="scss" scoped>
// .wrapper{}
</style>
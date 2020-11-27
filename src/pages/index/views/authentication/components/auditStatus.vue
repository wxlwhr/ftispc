<template>
  <div class="wrapper">
    <!-- 待审核状态 -->
    <div class="to_audit" v-if="authStatus == '4'">
      <div class="audit_status">
        <img src="@/assets/examine.png" alt="审核" class="register_img" />
        请您耐心等待审核结果...
      </div>
      <div class="hint">预计在1-3个工作日完成审核，请及时留意</div>
    </div>
    <!-- 审核通过 -->
    <div class="audit_ok" v-else-if="authStatus == '6'">
      <div class="audit_status">
        <img src="@/assets/passthough.png" alt="审核" class="register_img" />
        恭喜贵机构通过审核。
      </div>
      <div class="btn_box">
        <el-button class="btn" @click="toSystem">前往系统</el-button>
      </div>
    </div>
    <!-- 审核未通过 -->
    <div class="audit_no" v-else-if="authStatus=='5'">
      <div class="audit_status">
        <img src="@/assets/failed.png" alt="审核" class="register_img" />
        资料审核未通过。
      </div>
      <div class="hint" style="margin-bottom: 20px">
        <p>{{ commentsContent }}</p>
      </div>
      <div class="btn_box">
        <el-button class="btn" @click="immediatelyChange">立即修改</el-button>
      </div>
    </div>
     <!-- 职员待审核 -->
    <div class="staff_to_audit" v-else>
      <div class="audit_status">
        <img src="@/assets/examine.png" alt="审核" class="register_img" />
        请您耐心等待审核结果...
      </div>
      <div class="hint">
        申请已通过消息发送至您单位管理员，请联系管理员审核或耐心等待审核结果
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRealnameAuthtype,
  getRealnameOrganExist,
  getRealnameAuthstatus
} from "@/api/api.js";
export default {
    props:{
        status:String
    },
  data() {
    return {
      realname_status: "",
      authStatus:'',
      commentsContent: "营业执行不清晰营业执行不清晰营业执行不清晰", //审核不通过原因
    };
  },

  components: {},

  computed: {},

  methods: {
    toSystem() {
      this.$router.push("menuAdmin");
    },
    // 点击立即修改，判断
    immediatelyChange() {
        let that=this
        getRealnameAuthtype().then(function(res){
            if(res.data.authType=='1'){              
              that.$emit('changeActive',{tocomponent:2,type:'change'})
            }else{
                that.$emit('changeActive',{tocomponent:2,type:'change',formList:'2'})
            }
            console.log(res)
        })
    },
  },
  created(){
      console.log(this.status)
      let that=this
      getRealnameAuthstatus().then(function (response) {
      console.log(response);
      that.authStatus=response.data.authStatus
    });
  }
};
</script>
<style lang='scss' scoped>
.wrapper {
  .audit_status {
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    margin: 20px auto;
    text-align: center;
    line-height: 34px;
    img {
      position: relative;
      top: 8px;
    }
  }
  .hint {
    color: #8392a4;
    text-align: center;
    font-size: 12px;
    margin-bottom: 40px;
  }
  .btn_box {
    width: 100%;
    text-align: center;
    .btn {
      width: 100px;
      height: 30px;
      padding: 0;
      font-size: 14px;
      background-color: #2882fe;
      border: 0;
      border-radius: 3px;
      color: #fff;
      margin-bottom: 40px;
      cursor: pointer;
    }
  }
}
</style>
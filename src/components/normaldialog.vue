<template>
  <div class="wrapper">
    <el-dialog
      v-model="dataList"
      :title="dataList.title"
      :visible.sync="dialogFormVisible"
      class="dialog_box"
      width="37%"
    >
      <el-form v-for="(item, index) in dataList.listInput" :key="index">
        <el-form-item :label="item.label + ':'" :label-width="formLabelWidth" >
          <el-input
            autocomplete="off"
            :placeholder="item.placeholder"
            class="mobile_input"
            :disabled='item.disabled'
            clearable
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="验证码:" :label-width="formLabelWidth">
            <el-input
              v-model="changeform.code"
              autocomplete="off"
              placeholder="短信验证码"
            >
              <template slot="append"
                ><span class="sendCode" @click="sendcode"
                  >发送验证码</span
                ></template
              >
            </el-input>
          </el-form-item> -->

        <!-- 单选框 -->
        <!-- <el-form-item label="item.label">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogForm: "",
      formLabelWidth: "80px",
    };
  },
  created(){
    console.log(this.dataList)
  },
  components: {},

  computed: {

  },

  methods: {
    submitData() {},
    parentHandleclick() {
      this.dialogFormVisible = true;
    },
  },
};
</script>
<style lang='scss' scoped>
.dialog_box {
  .el-input {
    width: 420px;
  }
}
</style>
<template>
  <div class="g-tabs">
    <el-tabs v-model="activeName" :type="type" @tab-click="handleTabChange">
      <template v-for="item in tabpane">
        <el-tab-pane :name="item.name" :key="item.name">
          <span slot="label">
            <span class="label">{{ item.label }} </span>
            <span class="count" v-if="item.count < 99"> {{ item.count }}</span>
            <span class="count" v-else> 99+ </span>
          </span>
          <slot :name="item.name"></slot>
        </el-tab-pane>
      </template>
    </el-tabs>
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "GTabs",
  props: {
    type: {
      type: String,
      default: "card",
    },
    model: {
      type: String,
      default: "",
    },
    tabpane: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      activeName: this.model,
    };
  },
  computed: {},
  methods: {
    handleTabChange(tab, event) {
      this.$emit("tab-click", tab, event);
    },
  },

};
</script>
<style lang="scss" scoped>
.g-tabs {
  .label {
    display: inline-block;
    margin-right: 7px;
  }
  .count {
    display: inline-block;
    background: #2882fe;
    font-family: ArialMT;
    height: 16px;
    line-height: 16px;
    color: #fff;
    border-radius: 8px;
    padding: 3px 5px;
  }
  /deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none;
  }
  /deep/ .el-tabs__item{
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    background-color: #e8ecf0;
    margin-right: 8px;
  }
  /deep/ .is-active {
    background: #2882fe;
    .label {
      color: #fff;
    }
    .count{
      background: #fff;
      color: #2882fe;
    }
  }
}
</style>
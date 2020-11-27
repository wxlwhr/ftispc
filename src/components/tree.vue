<!-- 树控组件 -->
<template lang="html">
    <div class="wrapper">
        <el-tree :data="factoryOptions"
                 :props="defaultProps"
                 :highlight-current="true"
                 node-key="id"
                :expand-on-click-node='true'
                 @node-click="handleNodeClick"
                 :default-expanded-keys="['-1']"
                 :default-checked-keys="['-1']"
                 current-node-key:3
                 ref="tree"
                 >
                 
                 <!-- :default-expanded-keys="['-1']" -->
                 <!-- :default-expand-all="true" -->
                 <!-- :default-expanded-keys:'[3,13,14,15]' -->
            <span class="span-ellipsis" slot-scope="{node,data}">
                
                <span :title="node.label" class='span_label'>{{node.label}}</span>
            </span>
        </el-tree>
    </div>
</template>
<script>
export default {
  props:{

  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      },
      defaultCheckKey:['-1']
    };
  },
  computed: {
    factoryOptions() {
      return this.$attrs.dataList || [];
    },
  },
  methods: {
    handleNodeClick(data, node) {
      this.$emit("changeNode", { data: data, node: node });
    },
    handleIconChange(){

    },
    // setCurrent(e){
    //   this.$nextTick(function(){
    //     this.$refs.tree.setCurrentKey(e)
    //   })
    // },

  },
  created(){
     
      // let transObj=this.$refs.tree.getCurrentNode();
      // let transNode=this.$refs.tree.getNode(transObj.selct)
      // this.onclick(transObj,transNode,null)
    console.log(this.data)
    
  },

};
</script>

<style lang="scss" scoped>
    .span-ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    /*display: block;*/
    }
    // /deep/.el-tree-node:focus>.el-tree-node__content{
    //     background-color: #ccc !important;
    //     color:#2882fe!important;
    // }

    /deep/ .el-tree-node__content:hover {
    background: rgba(255, 255, 255, 0.05);
    }

    /deep/.el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: rgba(163, 167, 172, 0.2);
    }

    /deep/ .el-tree-node:focus > .el-tree-node__content {
    color: #2882fe;
    }
</style>
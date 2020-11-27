<template>
  <div class="message_page">
    <header>消息中心</header>
    <main class="tab">
      <!-- Tab1 -->
      <el-tabs type="card" class="tab_header" @tab-click="handleTabChange">
        <div class="operation_box">
          <div class="flag_read" v-if="state ==='0'" @click="markReadMsg">
            标记已读
          </div>
          <div class="delete" @click="deleteMsg">删除</div>
        </div>
        <el-tab-pane label="未读消息" class="unreadMsg">
          <span slot="label">
            <span class="label">未读消息</span>
          </span>
          <!-- 未读消息 -->
          <el-table
            ref="evtTable"
            :data="tableData1"
            :expand-row-keys="expands"
            :row-key="getRowKeys"
            @row-click="clickRowHandle"
            style="width: 98%; margin-left: 1%"
            @select="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="expand" width="1">
              <template slot-scope="props">
                <el-form label-position="left" inline class="row-table-expand">
                  <el-form-item class="expandable_row">
                    <span>{{ props.row.msg_content }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="消息标题" prop="msg_title">
            </el-table-column>

            <el-table-column label="消息时间" prop="send_date">
            </el-table-column>
          </el-table>
          
        </el-tab-pane>
        <!-- Tab2 -->
        <el-tab-pane label="已读消息" class="readMsg">
          <span slot="label">
            <span class="label">已读消息</span>
          </span>

          <!-- 已读消息 -->
          <el-table
            ref="evtTable"
            :data="tableData2"
            @row-click="clickRowHandle"
            :expand-row-keys="expands"
            :row-key="getRowKeys"
            style="width: 98%; margin-left: 1%; height: 100%"
            @select="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="expand" width="1">
              <template slot-scope="props">
                <el-form label-position="left" inline class="row-table-expand">
                  <el-form-item>
                    <span>{{ props.row.msg_content }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="消息标题" prop="msg_title">
            </el-table-column>

            <el-table-column label="消息时间" prop="send_date">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </main>
    <!-- 未读列表分页器 -->
          <div class="block" v-if="state==='0'">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="5"
              layout="prev, pager, next, jumper"
              :total="total"
              background
            >
            </el-pagination>
          </div>
    <!-- 分页器2 -->
    <div class="block" v-else>
      <el-pagination
        @current-change="currentChange"
        :current-page.sync="read_currentPage"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :total="read_total"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { msgUnreadList, msgReadList, deleteMsg, markMsg } from "@/api/api";
export default {
  data() {
    return {
      tableData1: [],
      tableData2: [],
      state: "0",
      // 获取row的key值
      getRowKeys(row) {
        return row.msg_id;
      },
      // 要展开的行，数值的元素是row的key值
      expands: [],
      page1: "1",
      currentPage1: 1,
      lastPage: "",
      total: 1000,
      markList: [],
      read_page: "1",
      read_currentPage: 1,
      read_lastPage: "",
      read_total: 1000,
    };
  },
  computed: {},
  methods: {
    clickRowHandle(row, column, event) {
      console.log(row);
      if (this.expands.includes(row.msg_id)) {
        this.expands = this.expands.filter((val) => val !== row.msg_id);
      } else {
        this.expands.push(row.msg_id);
      }
    },
    handleTabChange(tab, event){
      console.log(tab)
      this.state=tab.paneName
      if(this.state==='0'){
        this.ajaxUnreadList(this.page1);
      }else{
        this.ajaxReadList(this.read_page);
      }
    },
    markReadMsg() {
      let that = this;
      if (this.markList.length != 0) {
        markMsg({ msg_ids: this.markList }).then(function (response) {
          console.log(response);
          that.ajaxUnreadList(this.page1);
        });
      }
    },
    deleteMsg() {
      let that = this;
      if (this.markList.length != 0) {
        deleteMsg({ msg_ids: this.markList }).then(function (response) {
          console.log(response);
          if (that.state == "1") {
            that.ajaxReadList(this.read_page);
          } else {
            that.ajaxUnreadList(this.page1);
          }
        });
      } else {
        return;
      }
    },
    ajaxUnreadList(page) {
      console.log(page);
      let that = this;
      // let data = new FormData();
      // data.append("pageNum", "1");
      // data.append("rows", "10");
      let data = {
        page: page,
        rows: "5",
      };
      msgUnreadList(data).then(function (response) {
        console.log(response);
        that.tableData1 = response.rows;
        that.total = response.records;
        that.lastPage = response.lastPage;
      });
    },
    ajaxReadList(page) {
      let that = this;
      let data = {
        page: page,
        rows: "5",
      };
      msgReadList(data).then(function (response) {
        console.log(response);
        that.tableData2 = response.rows;
        that.read_total = response.records;
        that.read_lastPage = response.lastPage;
      });
    },
    // 未读列表分页
    handleCurrentChange(val) {
      console.log(`${val}`, val);
      let that = this;
      that.page1 = `${val}`;
      that.ajaxUnreadList(`${val}`);
    },
    // 已读列表分页
    currentChange(val) {
      console.log(`${val}`);
      let that = this;
      that.read_page = `${val}`;
      that.ajaxReadList(`${val}`);
    },
    handleSelectionChange(selection, row) {
      console.log(selection, row);
      let markRow = [];
      for (let i = 0; i < selection.length; i++) {
        markRow.push(selection[i].msg_id);
      }
      this.markList = markRow;
      console.log(this.markList);
    },
  },
  created() {
    // msgUnreadList({}).then(function (response) {
    //   console.log(response);
    //   this.tableData1=response.rows
    // });
    // msgReadList({}).then(function (response) {
    //   console.log(response);
    //   this.tableData2=response.rows
    // });
  },
  mounted() {
    let that = this;
    this.ajaxUnreadList("1");
    // this.ajaxReadList();
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-table__expand-column {
  overflow: hidden;
}
.message_page {
  background: #fff;
  height: 100%;
  header {
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
  }
  //   .el-input {
  //     height: 42px;
  //   }
  main {
    /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none;
    }
    /deep/ .el-tabs__item {
      height: 36px;
      line-height: 36px;
      background-color: #e8ecf0;
      margin-top: 24px;
      margin-left: 15px;
    }
    /deep/ .is-active {
      background: #2882fe;
      .label {
        width: 86px;
        color: #fff;
      }
    }
    .operation_box {
      display: flex;
      height: 45px;
      .flag_read,
      .delete {
        font-size: 12px;
        color: #5d6570;
        width: 82px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background: #e8ecf0;
        margin-left: 15px;
        cursor: pointer;
      }
      .delete {
        width: 54px;
      }
    }
    /deep/ .el-table__expanded-cell[class*="cell"] {
      padding: 0;
    }
    /deep/ .el-table__row.expanded + tr {
      background-color: #f3f8ff;
    }
    .block {
      position: relative;
      bottom: 0;
    }
    .row-table-expand {
      font-size: 0;
      padding: 20px 50px;
      background-color: #f3f8ff;
      label {
        width: 90px;
        color: #99a9bf;
      }
      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
    .expandable_row {
      font-size: 12px;
    }
  }
}
</style>
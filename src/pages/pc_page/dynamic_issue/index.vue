<template>
  <div class="dynamic">
    <div class="dynamic-title">
      <span class="dynamic-title-tag"></span>
      <span class="dynamic-title-tit">政策信息</span>
    </div>
    <div class="dynamic-box">
      <div class="dynamic-box-left">
        <ul v-for="(item, index) in tabList" :key="index" class="tab-ul">
          <li
            @click="
              right_title = item.label;
              tabOption = index;
            "
            :class="tabOption === index ? 'active' : ''"
          >
            {{ item.label }}
            <span><i class="el-icon-arrow-right"></i></span>
          </li>
        </ul>
      </div>
      <div class="dynamic-box-right">
        <div class="title">
          {{ right_title }}
        </div>
        <div class="content-list">
          <ul>
            <li v-for="(item, i) in policyList" :key="i">
              <div class="content-list-img">
                <img src="@/assets/money.jpg" alt="" />
              </div>
              <div class="content-list-right">
                <div class="title">{{ item.title }}</div>
                <div class="date">{{ item.date }}</div>
                <div class="desc">{{ item.desc }}</div>
                <div style="color: #2882fe; cursor: pointer">阅读全文</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  name: "Dynamic_issue",
  data() {
    return {
      tabList: [
        { label: "平台信息", value: "0" },
        { label: "金科新闻", value: "1" },
        { label: "路演发布", value: "2" },
        { label: "其他", value: "3" },
      ],
      policyList: [
        {
          src: "",
          title: "线上平台存款：数字金融和金融监管的一个产品案例",
          date: "08-10",
          desc:
            "近两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、",
        },
        {
          src: "",
          title: "数字金融领域监管科技探索与应用研讨会观点汇编",
          date: "08-10",
          desc:
            "作为数字金融领域的重要实践，监管科技在提高监管效能、降低监管成本等方面发挥了重要作用。然而，从应用覆盖面及应用效率来看，监管科技在数字金融领域内的探索仍处于初期阶段，发展空间有待进一步拓展...",
        },
        {
          src: "",
          title: "线上平台存款：数字金融和金融监管的一个产品案例",
          date: "08-10",
          desc:
            "近两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、",
        },
        {
          src: "",
          title: "数字金融领域监管科技探索与应用研讨会观点汇编",
          date: "08-10",
          desc:
            "作为数字金融领域的重要实践，监管科技在提高监管效能、降低监管成本等方面发挥了重要作用。然而，从应用覆盖面及应用效率来看，监管科技在数字金融领域内的探索仍处于初期阶段，发展空间有待进一步拓展...",
        },
        {
          src: "",
          title: "线上平台存款：数字金融和金融监管的一个产品案例",
          date: "08-10",
          desc:
            "近两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、",
        },
        {
          src: "",
          title: "数字金融领域监管科技探索与应用研讨会观点汇编",
          date: "08-10",
          desc:
            "作为数字金融领域的重要实践，监管科技在提高监管效能、降低监管成本等方面发挥了重要作用。然而，从应用覆盖面及应用效率来看，监管科技在数字金融领域内的探索仍处于初期阶段，发展空间有待进一步拓展...",
        },
        {
          src: "",
          title: "线上平台存款：数字金融和金融监管的一个产品案例",
          date: "08-10",
          desc:
            "近两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、",
        },
        {
          src: "",
          title: "数字金融领域监管科技探索与应用研讨会观点汇编",
          date: "08-10",
          desc:
            "作为数字金融领域的重要实践，监管科技在提高监管效能、降低监管成本等方面发挥了重要作用。然而，从应用覆盖面及应用效率来看，监管科技在数字金融领域内的探索仍处于初期阶段，发展空间有待进一步拓展...",
        },
        {
          src: "",
          title: "线上平台存款：数字金融和金融监管的一个产品案例",
          date: "08-10",
          desc:
            "近两年来，多家银行在互联网金融平台推出了存款产品，加大揽存力度，拓宽获客渠道，很多消费者也非常便利地享受到了存款服务。此类产品收益高、门槛低，已成为部分中小银行吸收存款、",
        },
        {
          src: "",
          title: "数字金融领域监管科技探索与应用研讨会观点汇编",
          date: "08-10",
          desc:
            "作为数字金融领域的重要实践，监管科技在提高监管效能、降低监管成本等方面发挥了重要作用。然而，从应用覆盖面及应用效率来看，监管科技在数字金融领域内的探索仍处于初期阶段，发展空间有待进一步拓展...",
        },
      ],
      tabOption: 0,
      right_title: "平台信息",
    };
  },

  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang='scss' scoped>
.dynamic {
  width: 100%;
  min-height: 77rem;
  padding: 0 360px;
  &-title {
    margin-top: 1.79rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: start;

    &-tag {
      width: 0.29rem;
      height: 24px;
      background-color: #2882fe;
    }

    &-tit {
      font-size: 26px;
      color: #35393f;
      margin-left: 1rem;
    }
  }
  &-box {
    width: 100%;

    display: flex;
    justify-content: space-between;
    &-left {
      border: 1px solid #d8dcdf;
      border-radius: 2px;
      width: 20%;
      .tab-ul {
        cursor: pointer;
        li {
          font-size: 1rem;
          color: #3c3d3f;
          border-bottom: 1px solid #d8dcdf;
          padding-left: 7%;
          padding-right: 7%;
          display: flex;
          justify-content: space-between;
          height: 3.5rem;
          line-height: 3.5rem;
        }
        .active {
          color: #fff;
          background-color: #2882fe;
        }
      }
    }
    &-right {
      border: 1px solid #d8dcdf;
      border-radius: 3px;
      width: 78%;
      .title {
        height: 5rem;
        line-height: 5rem;
        font-size: 24px;
        text-align: center;
      }
      .content-list {
        padding: 0 4.813rem 0 3rem;
        overflow: auto;
        height: 70.8rem;
        ul li {
          border-bottom: 1px dashed #d6dce7;
          padding: 1.313rem 0;
          .title {
            font-size: 20px;
            text-align: start;
            line-height: 2.5rem;
            height: 2.5rem;
          }
          .date {
            color: #a6abb1;
          }
          .desc {
            color: #84898e;
            height: 4.063rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &::after {
            content: "";
            display: table;
            clear: both;
          }
        }
        &-right {
          float: right;
          width: calc(100% - 11rem);
        }
        &-img {
          width: 10rem;
          height: 10rem;
          float: left;
          margin-right: 1rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
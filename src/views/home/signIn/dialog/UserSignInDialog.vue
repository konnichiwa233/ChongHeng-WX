<template>
  <van-dialog
    v-model="$store.state.userSignInDialogVisible"
    @confirm="$store.state.userSignInDialogVisible = false"
    confirmButtonText="确认"
    @open="getSignInDetails()"
  >
    <van-grid>
      <van-grid-item v-for="(value, i) in signInDetailList.length" :key="i">
        <p>第{{ i + 1 }}天</p>
        <svg class="icon" aria-hidden="true">
          <use
            :xlink:href="
              signInDetailList[i].signStatus
                ? '#icon-qiandaochenggong'
                : '#icon-qiandaochenggong1'
            "
          ></use>
        </svg>
        <span v-if="signInDetailList[i].signStatus" class="active"
          >积分+{{ signInDetailList[i].rewardMoney }}</span
        >
        <span v-else>未签到</span>
      </van-grid-item>
    </van-grid>
  </van-dialog>
</template>

<script>
import { request3 } from "@/network/request";

export default {
  data() {
    return {
      // 用户签到详情记录数组
      signInDetailList: [],
      // 积分
      nowIntegral: 0,
      signInStatus: 0,
    };
  },
  created() {},

  methods: {
    // 用户签到详情请求
    getSignInDetailsRequest() {
      return request3({
        url: "./list/sign/in/detail",
        method: "post",
        data: {
          customerId: this.$cookies.get("openid"),
        },
      });
    },

    // 用户签到详情
    getSignInDetails() {
      this.getSignInDetailsRequest().then((res) => {
        const data = res.result;
        this.signInDetailList = data.signInDetailList;
        // console.log(this.signInDetailList[0].signStatus);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.van-grid-item {
  p {
    font-size: 2.5vw;
    color: #000;
    font-weight: 700;
  }
  svg {
    font-size: 7vw;
    margin: 1.7vw;
  }
  span {
    font-size: 3.5vw;
  }
  .active {
    display: inline-block;
    opacity: 1;
    transform: translate(-150px, 0) scale(0.5);
    animation: activeAction 0.5s forwards;
  }

  @keyframes activeAction {
    0% {
      color: #000;
    }

    20% {
      transform: translate(30px, 0) scale(0.7);
      color: #000;
    }

    40% {
      color: #fff;
    }

    60% {
      transform: translate(0, 30px) scale(2);
      opacity: 0;
    }

    80% {
      transform: translate(0) scale(1);
    }

    100% {
      transform: translate(0) scale(1.2);
      opacity: 1;
      color: #006650;
      font-weight: 600;
    }
  }
}
</style>
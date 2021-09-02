<template>
  <div>
    <!-- 每日签到 -->
    <div class="sign-in">
      <!-- 标题 -->
      <van-row>
        <van-col span="3">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qiandao"></use>
          </svg>
        </van-col>
        <van-col span="8">
          <h4>每日签到</h4>
        </van-col>
        <van-col span="10" offset="3">
          <span class="totalIntergral">总积分：{{ totalIntergral }} 🤩</span>
        </van-col>
      </van-row>
      <!-- 主体 -->
      <div class="sign-in-bg">
        <van-calendar
          :poppable="false"
          readonly
          type="multiple"
          :show-confirm="false"
          :style="{ height: '34vh' }"
          row-height="5vh"
          :show-title="false"
          :min-date="minDate"
          :max-date="maxDate"
          :default-date="signInDate"
        />
        <div @click="signInPlus">
          <van-circle
            v-model="currentRate"
            layer-color="#eee"
            :rate="nextRate"
            :speed="500"
            size="20vw"
            :text="circleText"
            :color="circleColor"
          />
        </div>
      </div>
    </div>
    <!-- 签到对话框 -->
    <user-sign-in-dialog />
  </div>
</template>

<script>
import UserSignInDialog from "@/views/home/signIn/dialog/UserSignInDialog.vue";

import { request3, request6 } from "@/network/request";
export default {
  components: {
    UserSignInDialog,
  },
  data() {
    return {
      // 签到判定
      isSignIn: "",

      // 定义变化日期
      myDate: new Date(),
      // 传给默认选中日期的中间变量
      signInBeforeDate: [],
      // 默认选中日期
      signInDate: [],
      // 日历显示范围
      minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      maxDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        // 当前月份最大天数
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).getDate()
      ),

      // 当前进度
      currentRate: 0,
      // 目标进度
      nextRate: 0,
      // 签到文字
      circleText: "点击签到",
      // 进度条颜色
      circleColor: "",

      // 今日积分
      integral: 0,
      // 总积分
      totalIntergral: 0,
      // 传过来的总积分
      mediTotalIntergral: 0,

      // 0点到打卡的时间秒速
      dateTime: parseInt(
        (new Date() -
          new Date(
            new Date(new Date().toLocaleDateString()).getTime()
          ).getTime()) /
          1000
      ),
    };
  },

  watch: {
    // 监听传过来的分值变化
    mediTotalIntergral() {
      this.totalIntergral = this.mediTotalIntergral;
    },
  },
  created() {
    // cookies签到
    this.setIsSignIn();
    // 查看总积分
    this.getTotalIntergral();

    // 查看cookies值
    console.log("isSign:" + this.$cookies.get("isSignIn"));

    // 接收welfare传来的总积分
    this.$bus.$on("sendTotalIntegral", (res) => {
      this.mediTotalIntergral = res;
    });
  },

  methods: {
    // 刷新操作
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },

    /* 
     cookiess数据持久化
     */
    //  结束时间：当天24点
    markIsSignIn() {
      this.isSignIn = true;
      this.$cookies.set(
        "isSignIn",
        this.isSignIn,
        60 * 60 * 24 - this.dateTime
      );
    },
    setIsSignIn() {
      this.isSignIn = this.$cookies.get("isSignIn");
      if (this.isSignIn) {
        this.nextRate = 100;
        this.circleText = "已签到";
        this.circleColor = "red";
        this.signInBeforeDate.push(
          new Date(
            this.myDate.getFullYear(),
            this.myDate.getMonth(),
            this.myDate.getDate()
          )
        );
        // 选中日期
        this.signInDate = [...this.signInBeforeDate];
      }
    },

    /* 
    签到相关
    */
    // 签到状态请求
    getSignInStatus() {
      return request3({
        url: "./post/sign/in",
        method: "post",
        data: {
          customerId: this.$cookies.get("openid"),
        },
      });
    },

    // 点击签到
    signInPlus() {
      if (this.isSignIn === null) {
        // 开始进行签到
        this.getSignInStatus().then((res) => {
          if (res.code === "1") {
            // 更新积分
            this.getPersonalIntegral();

            // 签到进度
            this.nextRate = 100;
            // 签到的日期
            this.signInBeforeDate.push(
              new Date(
                this.myDate.getFullYear(),
                this.myDate.getMonth(),
                this.myDate.getDate()
              )
            );
            // 日历选中的日期
            this.signInDate = [...this.signInBeforeDate];
            setTimeout(() => {
              this.$store.state.userSignInDialogVisible = true;
              this.circleText = "已签到";
            }, 250);

            // cookies签到
            this.markIsSignIn();
          } else {
            this.$toast.fail("无法签到，请检查网络！");
          }
        });
      } else {
        this.$toast.fail("今日已签到");
        this.circleColor = "red";
      }
    },

    /* 
    积分相关
     */
    // 个人今天积分查看
    getPersonalIntegralRequest() {
      return request6({
        url: "./getPointsByOpenIdFromSign",
        method: "get",
        headers: { openid: this.$cookies.get("openid") },
      });
    },
    getPersonalIntegral() {
      this.getPersonalIntegralRequest().then((res) => {
        this.integral = res.result;
        if (res.errorCode === "0006") {
          this.updateIntegral();
          console.log("个人今日积分：" + this.integral);
        }
      });
    },
    // 更新积分
    updateIntegralRequest() {
      return request6({
        url: "./updatePoints",
        methods: "get",
        headers: { openid: this.$cookies.get("openid") },
        params: {
          points: this.integral,
        },
      });
    },
    updateIntegral() {
      console.log("将传入更新积分：" + this.integral);
      this.updateIntegralRequest().then((res) => {
        if (res.errorCode === "0007") {
          // 再请求总积分
          this.getTotalIntergral();
          console.log("已更新积分：" + this.integral);
        }
      });
    },
    // 总积分查看
    getTotalIntergralRequest() {
      return request6({
        url: "./getPointsByOpenId",
        method: "get",
        headers: { openid: this.$cookies.get("openid") },
      });
    },
    getTotalIntergral() {
      this.getTotalIntergralRequest().then((res) => {
        if (res.errorCode === "0006") {
          this.totalIntergral = res.result;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.sign-in {
  svg {
    font-size: 7vw;
    margin: 0 3vw;
  }
  .sign-in-bg {
    background: #ffffff;
    padding: 0.3vw 0;
    margin: 2vw 4vw;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #ebedf0;
    .van-circle {
      left: 50%;
      transform: translate(-50%);
    }
  }
}

span {
  font-size: 4.5vw;
}
.totalIntergral {
  display: inline-block;
  color: #fda11f;
  animation: activeAction 3s infinite;
  animation-direction: alternate;
}

@keyframes activeAction {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  25% {
    transform: scale(1.1); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
}
</style>
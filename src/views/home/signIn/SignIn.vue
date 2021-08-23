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

import { getSignInStatus } from "@/network/homepage";
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
    };
  },
  created() {
    // cookies签到
    this.setIsSignIn();
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
        new Date(
          new Date(new Date().toLocaleDateString()).getTime() +
            24 * 60 * 60 * 1000 -
            1
        ).getTime()
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

    // 点击签到
    signInPlus() {
      if (this.isSignIn === null) {
        // 开始进行签到
        getSignInStatus();
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
        //
        this.markIsSignIn();
      } else {
        this.$toast.fail("今日已签到");
        this.circleColor = "red";
      }
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
</style>
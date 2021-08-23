<template>
  <van-pull-refresh
    v-model="isLoading"
    @refresh="onRefresh"
    success-text="刷新成功"
    class="home"
  >
    <!-- 底色图片 -->
    <home-pic />

    <!-- 头部个人信息 -->
    <head-information />

    <!-- 每日签到 -->
    <sign-in />

    <!-- 活动福利 -->
    <Welfare />
  </van-pull-refresh>
</template>

<script>
import HomePic from "@/components/homePic/HomePic.vue";

import HeadInformation from "@/components/headInformation/HeadInformation.vue";
import SignIn from "@/views/home/signIn/SignIn.vue";
import Welfare from "@/views/home/welfare/Welfare.vue";

export default {
  components: {
    HomePic,

    HeadInformation,
    Welfare,
    SignIn,
  },

  data() {
    return {
      // 刷新判定
      isLoading: false,

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
    // 请求用户个人信息
    // this.$store.commit("getUserInfofromWeb");
  },
  methods: {
    // 刷新操作
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
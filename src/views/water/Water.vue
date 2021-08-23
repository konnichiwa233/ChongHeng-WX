<template>
  <div class="bg">
    <!-- 上半部 -->
    <body>
      <!-- 标题- -->
      <div class="title">
        <span>饮用设备卫生情况</span>
      </div>
      <!-- 轮播 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
      <!-- 客服 -->
      <div class="customer" @click="$store.state.customerDialogVisible = true">
        <img src="@/assets/img/customer.png" />
      </div>
    </body>

    <!-- 下半部 -->
    <section>
      <div class="correct">
        <img src="@/assets/img/correct.png" />
      </div>
      <div class="changeCore">
        <div>
          最后一次换芯时间：{{
            new Date().getFullYear() +
            "年" +
            (new Date().getMonth() - 1) +
            "月1号"
          }}
        </div>
      </div>
      <!-- 水质情况 -->
      <div class="monitor">
        <img src="@/assets/img/monitor.png" />
      </div>
      <!-- 水质监视 -->
      <div class="last-monitor">
        <div>
          最近一次水质监视：{{
            new Date().getFullYear() +
            "年" +
            (new Date().getMonth() + 1) +
            "月1号"
          }}
        </div>
      </div>
    </section>

    <!-- 客服对话框 -->
    <customer-dialog />
  </div>
</template>

<script>
import CustomerDialog from "@/views/water/dialog/CustomerDialog.vue";
export default {
  components: { CustomerDialog },
};
</script>

<style lang="less" scoped>
.bg {
  background: url(../../assets/img/bg.png) no-repeat center/100% 100%;
  width: 100vw;
  height: 100vh;
}

.bg {
  .title,
  .customer,
  .correct,
  .monitor,
  .changeCore,
  .last-monitor {
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
  }
  // 上半部分
  .title {
    text-align: left;
    margin-left: 5vw;
    top: 0.5vh;
    span {
      color: #ffff;
      font-size: 3.5vw;
      font-weight: 600;
    }
  }

  .my-swipe {
    margin: 0 auto;
    top: 5vh;
    width: 92vw;
    height: 24.5vh;
    border-radius: 2vh;
    .van-swipe-item {
      color: #000;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #ecf2fe;
    }
  }

  .customer {
    top: 28.5vh;
    img {
      height: 23vh;
    }
  }

  //  下半部分

  .correct {
    bottom: 39.5vh;
    img {
      height: 4vh;
    }
  }

  .changeCore {
    bottom: 34.5vh;
    div {
      margin: 0 auto;
      background: #04bbff;
      width: 68vw;
      height: 4.2vh;
      line-height: 4.2vh;
      border-radius: 5vw;
      font-size: 3.5vw;
      color: #fff;
    }
  }

  .monitor {
    bottom: 5.5vh;
    img {
      height: 24vh;
    }
  }

  .last-monitor {
    bottom: 0.5vh;
    div {
      margin: 0 auto;
      font-size: 4.5vw;
      font-weight: bold;
    }
  }
}
</style>


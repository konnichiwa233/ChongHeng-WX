<template>
  <van-dialog
    v-model="$store.state.integralVisible"
    @confirm="$store.state.integralVisible = false"
  >
    <body>
      <span> 您现有 {{ this.nowIntegral }} 积分</span>
    </body>
  </van-dialog>
</template>

<script>
export default {
  data() {
    return {
      nowIntegral: 0,
    };
  },
  created() {
    // 接收积分
    this.$bus.$on("sendIntegral", (res) => {
      this.nowIntegral = res;
    });
  },
};
</script>

<style lang="less" scoped>
body {
  margin: 5vh 0;
  span {
    display: block;
    text-align: center;
  }
}
</style>



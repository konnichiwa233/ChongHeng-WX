<template>
  <van-dialog
    v-model="$store.state.QRcodeVisible"
    @confirm="$store.state.QRcodeVisible = false"
  >
    <body>
      <img src="@/assets/img/code.png" />
    </body>
  </van-dialog>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
body {
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <van-dialog
    v-model="$store.state.informationDialogVisible"
    message="功能待开发..."
    @confirm="$store.state.informationDialogVisible = false"
  >
  </van-dialog>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>
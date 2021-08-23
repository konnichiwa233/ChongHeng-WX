<template>
  <van-dialog
    v-model="$store.state.memberDialogVisible"
    message="功能待开发..."
    @confirm="$store.state.memberDialogVisible = false"
  >
  </van-dialog>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>
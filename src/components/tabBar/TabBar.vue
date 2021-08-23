<template>
  <!-- 底部标签栏 -->
  <van-tabbar v-model="active" :fixed="true" route>
    <van-tabbar-item icon="wap-home" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="manager" to="/user">会员中心</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>
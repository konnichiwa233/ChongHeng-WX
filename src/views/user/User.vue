<template>
  <van-pull-refresh
    v-model="isLoading"
    @refresh="onRefresh"
    success-text="刷新成功"
  >
    <!-- 底色图片 -->
    <home-pic />

    <!-- 头部个人信息 -->
    <head-information />

    <!-- 消费相关 -->
    <van-cell-group inset>
      <van-cell title="优惠券查询" is-link to="/user/couponStore" />
      <van-cell title="消费记录" is-link to="/user/consumeHistory" />
    </van-cell-group>

    <!-- 会员相关 -->
    <van-cell-group inset>
      <van-cell title="注册会员" is-link to="/user/memberRegister" />
      <van-cell
        title="积分详情"
        is-link
        @click="$store.state.integralVisible = true"
      />
      <van-cell
        title="会员特权"
        is-link
        @click="$store.state.memberDialogVisible = true"
      />
    </van-cell-group>

    <!-- 其他相关 -->
    <van-cell-group inset class="log-off">
      <van-cell
        title="个人信息"
        is-link
        @click="$store.state.informationDialogVisible = true"
      />

      <van-cell title="在线客服" is-link />
    </van-cell-group>

    <!-- 会员积分弹出框 -->
    <integral-dialog />
    <!-- 会员模块弹出框 -->
    <member-dialog />

    <!-- 个人信息弹出框 -->
    <information-dialog />
  </van-pull-refresh>
</template>

<script>
import HomePic from "@/components/homePic/HomePic.vue";

import HeadInformation from "@/components/headInformation/HeadInformation.vue";

import IntegralDialog from "@/views/user/dialog/IntegralDialog.vue";
import MemberDialog from "@/views/user/dialog/MemberDialog.vue";

import InformationDialog from "@/views/user/dialog/InformationDialog.vue";

export default {
  components: {
    HomePic,

    HeadInformation,

    IntegralDialog,
    MemberDialog,

    InformationDialog,
  },
  data() {
    return {
      activeNames: [],
      isLoading: false,

      // 消费相关信息
      consumeMsg: [],
    };
  },

  created() {
    this.$store.commit("getConsumeMsg");
  },
  methods: {
    // 刷新相关
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.van-cell-group {
  margin-top: 2vh;
}

.log-off {
  margin-bottom: 12vh;
}
</style>
<template>
  <div>
    <!-- 标题 -->
    <van-row>
      <van-col span="16">
        <div class="title"><span>优惠券查询</span></div></van-col
      >
      <van-col span="4" offset="3">
        <van-button round block type="default" to="/user"
          >返回</van-button
        ></van-col
      >
    </van-row>

    <!-- tab标签 -->
    <van-tabs v-model="active">
      <van-tab title="未使用">
        <!-- 未使用优惠券主体 -->
        <div v-if="notUsedCouponInfo">
          <coupon-preview
            v-for="(value, i) in notUsedCouponInfo"
            :key="i"
            :activeColor="notUsedCouponInfo[i].passTemplate.background"
            :activeicon="notUsedCouponInfo[i].passTemplate.icon"
            @click.native="useCouponDialog(i)"
          >
            <template v-slot:couName>{{
              notUsedCouponInfo[i].passTemplate.title
            }}</template>
            <template v-slot:couDesc>{{
              notUsedCouponInfo[i].passTemplate.desc
            }}</template>
            <template v-slot:endTime
              >截至时间至：{{
                notUsedCouponInfo[i].passTemplate.end | formatDate
              }}</template
            >
            <template v-slot:button>
              {{ "使用" }}
            </template>
          </coupon-preview>
        </div>
      </van-tab>
      <van-tab title="已使用">
        <!-- 已使用优惠券主体 -->
        <div v-if="usedCouponInfo">
          <coupon-preview
            v-for="(value, i) in usedCouponInfo"
            :key="i"
            :activeColor="usedCouponInfo[i].passTemplate.background"
            :activeicon="usedCouponInfo[i].passTemplate.icon"
          >
            <template v-slot:couName>{{
              usedCouponInfo[i].passTemplate.title
            }}</template>
            <template v-slot:couDesc>{{
              usedCouponInfo[i].passTemplate.desc
            }}</template>
            <template v-slot:endTime
              >截至时间至：{{
                usedCouponInfo[i].passTemplate.end | formatDate
              }}</template
            >
            <template v-slot:button>
              {{ "已使用" }}
            </template>
          </coupon-preview>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 使用优惠券对话框 -->
    <van-dialog
      v-model="useCouponDialogVisible"
      message="是否使用优惠券"
      show-cancel-button
      @cancel="useCouponDialogVisible = false"
      @confirm="useCouponConfirm()"
    >
    </van-dialog>

    <!-- 二维码对话框 -->
    <q-rcode />
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/formatDate";
import { request5 } from "@/network/request";

import CouponPreview from "@/components/coupon/CouponPreview";
import QRcode from "./QRcode.vue";

export default {
  name: "CouponStore",
  components: { CouponPreview, QRcode },
  data() {
    return {
      // 默认活跃索引
      active: 0,
      // 未使用优惠券列表信息
      notUsedCouponInfo: [],
      useCouponDialogVisible: false,
      index: 0,
      // 已使用优惠券列表信息
      usedCouponInfo: [],
    };
  },

  created() {
    // 请求未使用优惠券
    this.getNotUsedCoupon();
    // 请求已使用优惠券
    this.getUsedCoupon();

    // 接收未使用优惠券列表
    this.$bus.$on("sendNotUsedCouponInfo", (res) => {
      this.NotUsedCouponInfo = res;
    });
  },

  methods: {
    // 请求未使用优惠券列表
    getNotUsedCouponRequest() {
      return request5({
        url: "./userpassinfo",
        method: "get",
        params: {
          userId: this.$cookies.get("openid"),
        },
      });
    },
    getNotUsedCoupon() {
      this.getNotUsedCouponRequest().then((res) => {
        this.notUsedCouponInfo = res.data;
        console.log("未使用：");
        console.log(this.notUsedCouponInfo);
      });
    },
    // 唤起使用优惠券对话框
    useCouponDialog(i) {
      this.index = i;
      console.log("索引值：" + this.index);
      console.log(
        this.notUsedCouponInfo[this.index].passTemplate.id + "数据类型："
      );
      console.log(typeof this.notUsedCouponInfo[this.index].passTemplate.id);
      console.log(
        this.notUsedCouponInfo[this.index].passTemplate.title + "数据类型："
      );
      console.log(typeof this.notUsedCouponInfo[this.index].passTemplate.title);
      console.log(
        this.notUsedCouponInfo[this.index].passTemplate.hasToken + "数据类型："
      );
      console.log(
        typeof this.notUsedCouponInfo[this.index].passTemplate.hasToken
      );
      this.useCouponDialogVisible = true;
    },
    // 使用优惠券请求
    useCouponRequest() {
      return request5({
        url: "./userusepass",
        method: "post",
        headers: {
          openid: this.$cookies.get("openid"),
        },
        data: {
          userId: this.$cookies.get("openid"),
          templateId: this.notUsedCouponInfo[this.index].pass.templateId,
        },
      });
    },
    // 确认使用优惠券
    useCouponConfirm() {
      this.useCouponRequest().then((res) => {
        console.log(res);
        if (res.errorCode === 0) {
          this.$toast.success("已使用优惠券");
          // 重新请求
          this.getNotUsedCoupon();
          this.getUsedCoupon();
          this.$store.state.QRcodeVisible = true;
        } else if (res.code === -1) {
          this.$toast.fail("未检测到账户存在,请先注册!");
          this.$router.push("/user/memberRegister");
        } else {
          this.$toast.fail("使用优惠券失败");
        }
      });
      this.useCouponDialogVisible = false;
    },

    // 请求已使用优惠券列表
    getUsedCouponRequest() {
      return request5({
        url: "./userusedpassinfo",
        method: "get",
        params: {
          userId: this.$cookies.get("openid"),
        },
      });
    },
    getUsedCoupon() {
      this.getUsedCouponRequest().then((res) => {
        this.usedCouponInfo = res.data;
        console.log("已使用：");
        console.log(this.usedCouponInfo);
      });
    },
  },

  filters: {
    //时间格式化
    formatDate(time) {
      var data = new Date(time);
      return formatDate(data, "yyyy-MM-dd");
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  padding: 5vw;
}

.van-button {
  margin: 2vh 0;
}
</style>
<template>
  <div>
    <!-- 活动福利 -->
    <div class="welfare">
      <!-- 标题 -->
      <van-row>
        <van-col span="3">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liwu"></use>
          </svg>
        </van-col>
        <van-col span="8">
          <h4>活动福利</h4>
        </van-col>
      </van-row>
      <!-- 主体 -->
      <div class="couponBox" v-if="couponInfo">
        <coupon-preview
          v-for="(value, i) in couponInfo"
          :key="i"
          :activeColor="couponInfo[i].passTemplate.background"
          :activeicon="couponInfo[i].passTemplate.icon"
          @click.native="receiveCouponDialog(i)"
        >
          <template v-slot:couName>{{
            couponInfo[i].passTemplate.title
          }}</template>
          <template v-slot:couDesc>{{
            couponInfo[i].passTemplate.desc
          }}</template>
          <template v-slot:endTime
            >截至时间至：{{
              couponInfo[i].passTemplate.end | formatDate
            }}</template
          >
          <template v-slot:button>
            {{ "领取" }}
          </template>
        </coupon-preview>
      </div>
    </div>
    <!-- 领取优惠券对话框 -->
    <van-dialog
      v-model="receiveCouponDialogVisible"
      message="是否领取优惠券"
      show-cancel-button
      @cancel="receiveCouponDialogVisible = false"
      @confirm="receiveCouponConfirm()"
    >
    </van-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/formatDate";
import { request5 } from "@/network/request";

import CouponPreview from "@/components/coupon/CouponPreview.vue";
export default {
  components: {
    CouponPreview,
  },
  data() {
    return {
      // 消费券信息
      couponInfo: [],
      index: 0,
      receiveCouponDialogVisible: false,
    };
  },

  created() {
    // 请求优惠券
    this.getCoupon();
  },
  methods: {
    // 请求优惠券
    getCouponRequest() {
      return request5({
        url: "./inventoryinfo",
        method: "get",
        params: {
          userId: 1,
        },
      });
    },
    getCoupon() {
      this.getCouponRequest().then((res) => {
        this.couponInfo = res.data.passTemplateInfos;
        console.log(this.couponInfo);
      });
    },
    // 唤起领取优惠券对话框
    receiveCouponDialog(i) {
      this.index = i;
      console.log("索引值：" + this.index);
      console.log(this.couponInfo[this.index].passTemplate.id + "数据类型：");
      console.log(typeof this.couponInfo[this.index].passTemplate.id);
      console.log(
        this.couponInfo[this.index].passTemplate.title + "数据类型："
      );
      console.log(typeof this.couponInfo[this.index].passTemplate.title);
      console.log(
        this.couponInfo[this.index].passTemplate.hasToken + "数据类型："
      );
      console.log(typeof this.couponInfo[this.index].passTemplate.hasToken);
      this.receiveCouponDialogVisible = true;
    },
    // 领取优惠券请求
    receiveCouponRequest() {
      return request5({
        url: "./gainpasstemplate",
        method: "post",
        data: {
          userId: "1",
          passTemplate: {
            id: parseInt(this.couponInfo[this.index].passTemplate.id),
            title: this.couponInfo[this.index].passTemplate.title,
            hasToken: this.couponInfo[this.index].passTemplate.hasToken,
          },
        },
      });
    },
    // 确认领取优惠券
    receiveCouponConfirm() {
      this.receiveCouponRequest().then((res) => {
        console.log(res);
        if (res.errorCode === 0) {
          this.$toast.success("已领取优惠券");
          // 重新请求
          this.getCoupon();
        } else {
          this.$toast.fail("领取优惠券失败");
        }
      });
      this.receiveCouponDialogVisible = false;
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
.welfare {
  padding-bottom: 12vh;

  svg {
    font-size: 7vw;
    margin: 0 3vw;
  }
}
</style>
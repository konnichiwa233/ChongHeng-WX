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
            {{ couponInfo[i].passTemplate.points + "积分兑换" }}
          </template>
        </coupon-preview>
      </div>
    </div>
    <!-- 领取优惠券对话框 -->
    <van-dialog
      v-model="receiveCouponDialogVisible"
      show-cancel-button
      message="是否使用积分进行兑换？"
      @cancel="receiveCouponDialogVisible = false"
      @confirm="receiveCouponConfirm()"
    >
    </van-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/formatDate";
import { request5, request6 } from "@/network/request";

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
      // 积分信息
      totalIntergral: 0,
    };
  },

  created() {
    // 请求优惠券
    this.getCoupon();
    // 请求积分
    this.getTotalIntergral();
  },
  methods: {
    // 请求优惠券
    getCouponRequest() {
      return request5({
        url: "./inventoryinfo",
        method: "get",
        params: {
          userId: this.$cookies.get("openid"),
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
      // console.log(this.couponInfo[this.index].passTemplate.id + "数据类型：");
      // console.log(typeof this.couponInfo[this.index].passTemplate.id);
      // console.log(
      //   this.couponInfo[this.index].passTemplate.title + "数据类型："
      // );
      // console.log(typeof this.couponInfo[this.index].passTemplate.title);
      // console.log(
      //   this.couponInfo[this.index].passTemplate.hasToken + "数据类型："
      // );
      // console.log(typeof this.couponInfo[this.index].passTemplate.hasToken);
      this.receiveCouponDialogVisible = true;
    },
    // 领取优惠券请求
    receiveCouponRequest() {
      return request5({
        url: "./gainpasstemplate",
        method: "post",
        headers: {
          openid: this.$cookies.get("openid"),
        },
        data: {
          userId: this.$cookies.get("openid"),
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
      if (
        this.totalIntergral >= this.couponInfo[this.index].passTemplate.points
      ) {
        // 优惠券领取请求
        this.receiveCouponRequest().then((res) => {
          console.log(res);
          if (res.errorCode === 0) {
            this.$toast.success("已领取优惠券");
            // 更新积分
            this.updateIntegral();
            // 重新请求优惠券
            this.getCoupon();
            // 请求未使用优惠券列表
            this.getNotUsedCouponRequest();
          } else if (res.code === -1) {
            this.$toast.fail("未检测到账户存在,请先注册!");
            this.$router.push("/user/memberRegister");
          } else {
            this.$toast.fail("领取优惠券失败");
          }
        });
      } else {
        this.$toast.fail("积分不足，无法兑换！");
      }

      this.receiveCouponDialogVisible = false;
    },

    // 更新积分
    updateIntegralRequest() {
      return request6({
        url: "./updatePoints",
        methods: "get",
        headers: {
          openid: this.$cookies.get("openid"),
        },
        params: {
          points: -this.couponInfo[this.index].passTemplate.points,
        },
      });
    },
    updateIntegral() {
      console.log(
        "将传入更新积分：" + -this.couponInfo[this.index].passTemplate.points
      );
      this.updateIntegralRequest().then((res) => {
        console.log(
          "已更新积分：" + -this.couponInfo[this.index].passTemplate.points
        );
        if (res.errorCode === "0007") {
          // 再请求总积分
          this.getTotalIntergral();
        }
      });
    },
    // 总积分查看
    getTotalIntergralRequest() {
      return request6({
        url: "./getPointsByOpenId",
        method: "get",
        headers: { openid: this.$cookies.get("openid") },
      });
    },
    getTotalIntergral() {
      this.getTotalIntergralRequest().then((res) => {
        this.totalIntergral = res.result;
        // 发送总积分
        this.$bus.$emit("sendTotalIntegral", this.totalIntergral);
        console.log("总积分：" + this.totalIntergral);
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
.welfare {
  padding-bottom: 12vh;

  svg {
    font-size: 7vw;
    margin: 0 3vw;
  }
}
</style>
<template>
  <div>
    <!-- 标题 -->
    <van-row>
      <van-col span="16">
        <div class="title">
          <span>后台优惠券管理</span>
        </div>
      </van-col>
    </van-row>

    <!-- 填写信息主体 -->
    <van-form @submit="onSubmit">
      <!-- 优惠券背景颜色 -->
      <van-field
        name="background"
        label="背景颜色"
        :rules="[{ required: true, message: '请选择优惠券背景颜色' }]"
      >
        <template #input>
          <van-radio-group v-model="background" direction="horizontal">
            <van-radio name="#ffbb5a">黄金</van-radio>
            <van-radio name="#9b90e4">紫罗兰</van-radio>
            <van-radio name="#65c0a7">绿宝石</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!-- 优惠券图标 -->
      <van-field
        name="icon"
        label="图标"
        :rules="[{ required: true, message: '请选择优惠券图标' }]"
      >
        <template #input>
          <van-radio-group
            v-model="icon"
            direction="horizontal"
            class="couicon"
          >
            <van-radio name="#icon-logo">样式1</van-radio>
            <van-radio name="#icon-bofang">样式2</van-radio>
            <van-radio name="#icon-logo5">样式3</van-radio>
            <van-radio name="#icon-logo3">样式4</van-radio>
            <van-radio name="#icon-logo4">样式5</van-radio>
            <van-radio name="#icon-Ggooglelogo">样式6</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!-- 优惠券名称 -->
      <van-field
        v-model="couName"
        name="couName"
        label="命名"
        placeholder="优惠券的名称"
        :rules="[{ required: true, message: '填写优惠券名称' }]"
      />

      <!-- 优惠券描述 -->
      <van-field
        v-model="couDesc"
        name="couDesc"
        label="描述"
        placeholder="描述优惠券相关信息"
        :rules="[{ required: true, message: '描述优惠券' }]"
      />

      <!-- 优惠券简介 -->
      <van-field
        v-model="couSummary"
        name="couSummary"
        label="简介"
        placeholder="优惠券简介(非必须)"
      />

      <!-- 开始日期 -->
      <van-field
        readonly
        clickable
        name="startTime"
        :value="startTime"
        label="开始时间"
        placeholder="点击选择开始日期"
        @click="startPicker = true"
        :rules="[{ required: true, message: '请选择开始日期' }]"
      />
      <!-- 时间弹出层 -->
      <van-popup v-model="startPicker" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @confirm="startConfirm"
          @cancel="startPicker = false"
          :min-date="startMinDate"
          :max-date="maxDate"
        />
      </van-popup>

      <!-- 截止日期 -->
      <van-field
        v-model="endTime"
        readonly
        clickable
        name="endTime"
        :value="endTime"
        label="截止时间"
        placeholder="截止日期当天24点过期"
        @click="endPicker = true"
        :rules="[{ required: true, message: '请选择截至日期' }]"
      />
      <!-- 时间弹出层 -->
      <van-popup v-model="endPicker" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @confirm="endConfirm"
          @cancel="endPicker = false"
          :min-date="endMinDate"
          :max-date="maxDate"
        />
      </van-popup>

      <!-- 积分兑换 -->
      <van-field
        v-model="points"
        name="points"
        label="积分兑换"
        placeholder="填写数字"
        :rules="[{ pattern: checkNum, message: '请填写正整数' }]"
      />

      <!-- hasToken -->
      <van-field
        name="hasToken"
        label="hasToken"
        :rules="[{ required: true, message: '请选择是否存在Token' }]"
      >
        <template #input>
          <van-radio-group v-model="hasToken" direction="horizontal">
            <van-radio name="true">YES</van-radio>
            <van-radio name="false">NO</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!-- 店铺ID -->
      <van-field
        readonly
        clickable
        name="shopID"
        :value="shopID"
        label="店铺ID"
        placeholder="点击选择店铺ID(非必须)"
        @click="shopIDPicker = true"
      />
      <van-popup v-model="shopIDPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="shopIDcolumns"
          @confirm="shopIDConfirm"
          @cancel="shopIDPicker = false"
        />
      </van-popup>

      <!-- 发放数量 -->
      <van-field
        v-model="limit"
        name="limit"
        label="发放数量"
        placeholder="填写数字"
        :rules="[{ pattern: checkNum, message: '请填写正整数' }]"
      />

      <!-- 提交按钮 -->
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >确认</van-button
        >
      </div>
    </van-form>

    <!-- 样式预览标题 -->
    <van-row>
      <van-col span="16">
        <div class="title">
          <span>样式预览</span>
        </div>
      </van-col>
    </van-row>

    <!-- 样式预览 -->
    <coupon-preview
      v-if="background"
      :activeColor="background"
      :activeicon="icon"
    >
      <template v-slot:couName>{{ couName }}</template>
      <template v-slot:couDesc>{{ couDesc }}</template>
      <template v-slot:endTime>{{ "截止时间至：" + endTime }}</template>
      <template v-slot:button>{{ points + "积分兑换" }}</template>
    </coupon-preview>
  </div>
</template>

<script>
import CouponPreview from "@/components/coupon/CouponPreview.vue";

import { request4 } from "@/network/request";
export default {
  components: { CouponPreview },
  data() {
    return {
      // 优惠券背景颜色
      background: "",
      // 优惠券图标
      icon: "",
      // 优惠券名称
      couName: "",
      // 优惠券描述
      couDesc: "",
      // 优惠券简介
      couSummary: "",

      // 开始日期
      startTime: "",
      startPicker: false,
      // 截止日期
      endTime: "",
      endPicker: false,
      // 开始最小选中日期
      startMinDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      // 截至最小选中日期
      endMinDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      ),
      // 最大选中日期
      maxDate: new Date(
        new Date().getFullYear() + 1,
        11,
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).getDate()
      ),
      // 默认选中日期
      currentDate: new Date(),

      // 积分兑换
      points: "",
      // hasToKen
      hasToken: "",
      // 店铺ID
      shopID: "",
      shopIDcolumns: ["1", "2", "3", "4", "5"],
      shopIDPicker: false,
      // 发放数量
      limit: "",
      checkNum: /^\+?[1-9][0-9]*$/,
    };
  },

  created() {},
  methods: {
    // 提交表单
    onSubmit(values) {
      console.log(values);
      // console.log("submit", values);
      this.sendCoupon();
    },
    // 开始时间确认
    startConfirm(date) {
      const confirmValue =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.startTime = confirmValue.toString();
      this.startPicker = false;
    },
    // 截止时间确认
    endConfirm(date) {
      const confirmValue =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.endTime = confirmValue.toString();
      this.endPicker = false;
    },
    // 店铺ID确认
    shopIDConfirm(shopID) {
      this.shopID = shopID;
      this.shopIDPicker = false;
    },

    // 提交优惠券信息
    sendCouponRequest() {
      return request4({
        url: "./drop",
        method: "post",
        headers: { token: "southeast-passbook-merchants" },
        data: {
          background: this.background,
          desc: this.couDesc,
          end: this.endTime,
          hasToken: true,
          id: parseInt(this.shopID),
          limit: parseInt(this.limit),
          start: this.startTime,
          summary: this.couSummary,
          title: this.couName,
          icon: this.icon,
          points: this.points,
        },
      });
    },
    sendCoupon() {
      this.sendCouponRequest().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  padding: 5vw;
}

.couicon {
  .van-radio {
    margin: 1vw;
  }
}

.van-button {
  margin: 2vh 0;
}
</style>
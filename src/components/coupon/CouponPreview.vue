<template>
  <div>
    <div class="container" ref="container">
      <!-- logo -->
      <svg class="icon-a" aria-hidden="true">
        <use xlink:href="" ref="icon"></use>
      </svg>

      <!-- 名称 -->
      <div class="couName">
        <span><slot name="couName" /> </span>
      </div>

      <!-- 描述 -->
      <div class="couDesc">
        <span><slot name="couDesc" /> </span>
      </div>

      <!-- 有效期 -->
      <div class="validTime">
        <svg class="icon-b" aria-hidden="true">
          <use xlink:href="#icon-icon-test"></use>
        </svg>
        <span>
          <slot name="endTime"> </slot>
        </span>
      </div>

      <!-- 按钮 -->
      <div class="button">
        <van-button type="default"><slot name="button" /> </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 接收颜色代码
    activeColor: {
      type: String,
      default: "",
    },
    // 接收图标
    activeicon: {
      type: String,
      default: "",
    },
  },

  watch: {
    // 监听颜色变化
    activeColor() {
      // console.log(this.activeColor);
      this.$refs.container.style.background = this.activeColor;
    },
    // 监听图标变化
    activeicon() {
      // console.log(this.activeicon);
      this.$refs.icon.setAttribute("xlink:href", this.activeicon);
    },
  },
  mounted() {
    // 数据传输完毕后重新设置样式
    this.$refs.container.style.background = this.activeColor;
    this.$refs.icon.setAttribute("xlink:href", this.activeicon);
  },

  created() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  // position: absolute;
  overflow: hidden;
  margin: 3vw 5vw;
  width: 90vw;
  height: 28vw;
  background-color: #65c0a7;
  border-radius: 18px;
  span {
    white-space: nowrap; /*强制span不换行*/
    color: #fff;
  }
}
.icon-a {
  position: relative;
  top: 16%;
  left: 5%;
  width: 18vw;
  height: 18vw;
}

.couName {
  position: relative;
  top: -16vw;
  left: 26vw;
  font-weight: 500;
  height: 7vw;
}
.couDesc {
  position: relative;
  top: -14.5vw;
  left: 26vw;
  font-size: 4vw;
  height: 5vw;
}
.validTime {
  position: relative;
  top: -12.2vw;
  left: 25.5vw;
  font-size: 3vw;
  height: 5vw;
  span {
    position: relative;
    top: -1.2vw;
    margin-left: 1vw;
  }
  .icon-b {
    margin: 0.5vw;
    width: 3.5vw;
    height: 3.5vw;
  }
}
.button {
  position: relative;
  top: -28vw;
  left: 71.5vw;
  .van-button {
    width: 13vw;
    height: 9vw;
    border-radius: 1vw;
    border-color: #eee;
    span {
      color: #000;
    }
  }
}
</style>
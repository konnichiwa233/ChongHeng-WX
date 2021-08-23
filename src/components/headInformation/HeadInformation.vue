<template>
  <div class="head">
    <van-row type="flex" class="headInformation">
      <van-col span="6"
        ><van-icon
          :name="$store.state.headImg"
          size="3rem"
          class="head-portrait"
      /></van-col>
      <van-col span="6" class="name">
        <h3>{{ $store.state.userName }}</h3>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.head {
  position: relative;
  width: 100vw;
  height: 23vh;
  background-color: rgb(120, 208, 243);
  border-bottom-left-radius: 100%;
  .headInformation {
    position: absolute;
    top: 7vh;
    width: 100%;
    .head-portrait {
      left: 4vw;
      line-height: 4rem;
      img {
        border-radius: 50%;
      }
    }
    .name {
      line-height: 4rem;
    }
  }
}
</style>
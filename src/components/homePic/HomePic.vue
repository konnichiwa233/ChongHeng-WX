<template>
  <div class="pic">
    <div class="home-o1"></div>
    <div class="home-o2"></div>
    <div class="home-o3"></div>
    <div class="home-o4"></div>
    <div class="home-o5"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.pic {
  .home-o1,
  .home-o2,
  .home-o3,
  .home-o4,
  .home-o5 {
    position: fixed;
    height: 30vw;
    width: 30vw;
    border-radius: 50%;
    z-index: -999;
  }
  .home-o1 {
    top: 55vh;
    left: -9vw;
    background-color: #fa19191f;
  }
  .home-o2 {
    top: 22vh;
    left: 80vw;
    background-color: rgba(31, 238, 124, 0.178);
  }
  .home-o3 {
    top: 37vh;
    left: 59vw;
    background-color: #1989fa2c;
  }
  .home-o4 {
    top: 61vh;
    left: 78vw;
    background-color: #f0a26228;
  }
  .home-o5 {
    top: 15vh;
    left: 16vw;
    background-color: #f023c42a;
  }
}
</style>
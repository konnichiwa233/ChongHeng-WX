<template>
  <div>
    <!-- 标题 -->
    <van-row>
      <van-col span="16">
        <div class="title"><span>消费记录</span></div></van-col
      >
      <van-col span="4" offset="3">
        <van-button round block type="default" to="/user"
          >返回</van-button
        ></van-col
      >
    </van-row>

    <!-- 信息主体 -->
    <van-cell
      v-for="(item, index) in this.$store.state.consumeMsg"
      :key="index"
    >
      {{ item.settleTime | formatDate }} 使用
      {{ item.consumptionAmount }} 纯水表消费
    </van-cell>

    <!-- 分页区域 -->
    <van-pagination
      v-model="$store.state.queryInfo.pagenum"
      :items-per-page="$store.state.queryInfo.pagesize"
      @change="handleCurrentChange"
      :page-count="10"
      force-ellipses
    />
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/formatDate";

export default {
  data() {
    return {};
  },

  methods: {
    //监听页码值改变
    handleCurrentChange(newSize) {
      // console.log(newSize);
      this.$store.state.queryInfo.pagenum = newSize;
      // 再次调用请求，更新数据
      this.$store.commit("getConsumeMsg");
    },
  },

  filters: {
    //时间格式化
    formatDate(time) {
      var data = new Date(time);
      return formatDate(data, "yyyy-MM-dd hh:mm:ss");
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
<template>
  <div id="app">
    <!-- 防止重复渲染dom -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 通过meta管理tabbar是否渲染 -->
    <tab-bar v-show="$route.meta.showTabbar" />
  </div>
</template>


<script>
import TabBar from "@/components/tabBar/TabBar.vue";

export default {
  components: { TabBar },

  mounted() {
    window.getCookies = this.getCookies;
  },

  methods: {
    // 获取code参数
    getUrlKey(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    // 获取cookies函数
    getCookies() {
      // 设置cookies
      this.$cookies.set("openid", this.getUrlKey("openid"), -1);
      // 获取cookies值
      let openid = this.$cookies.get("openid");
      return openid;
    },
  },
};
</script>

<style>
</style>

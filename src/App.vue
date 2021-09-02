<template>
  <div id="app">
    <!-- 防止重复渲染dom -->
    <keep-alive exclude="CouponStore">
      <router-view />
    </keep-alive>
    <!-- 通过meta管理tabbar是否渲染 -->
    <tab-bar v-show="$route.meta.showTabbar" />
  </div>
</template>


<script>
import TabBar from "@/components/tabBar/TabBar.vue";

import { request2 } from "@/network/request";

export default {
  components: { TabBar },

  data() {
    return {
      code: 0,
    };
  },

  mounted() {
    window.getCookiesByLogo = this.getCookiesByLogo;
  },
  created() {
    this.getCookies();
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

    getCookiesByLogo() {
      // 获取cookies值
      let openid = this.$cookies.get("openid");
      return openid;

      // this.$cookies.set("openid", this.getUrlKey("openid"), -1);
      // let openid = this.$cookies.get("openid");
      // return openid;
    },

    // 获取cookies函数
    getCookies() {
      // 设置cookies
      // this.$cookies.set("openid", this.getUrlKey("openid"), -1);
      // let openid = this.$cookies.get("openid");
      // return openid;

      // this.code = this.getUrlKey("code");
      // alert(this.code);

      // 获取cookies值
      // if (this.getUrlKey("openid")) {
      // }

      let openid = this.$cookies.get("openid");
      // alert(typeof openid);
      if (openid === "undefined" || openid === null) {
        // alert("1");
        if (!this.getUrlKey("openid")) {
          // alert("2");
          window.location.href =
            "http://testakin02.gz2vip.idcfengye.com/redirectFromOpenid";
        } else {
          // alert("3");
          this.$cookies.set("openid", this.getUrlKey("openid"), -1);
        }
        // return openid;
        // this.getOpenIdRequest().then((res) => {
        //   this.$cookies.set("openid", res, -1);
        // });
      }

      // 暂时设置openid为指定值,正式发布时由cookies设置
      // let openid = getCookies();
      // alert(typeof openid);
    },
  },
};
</script>

<style>
</style>

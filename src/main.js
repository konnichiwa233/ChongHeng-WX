import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Vant ui
import '@/plugins/vant.js'
// 引入桌面端适配
import '@vant/touch-emulator';
// 引入字体图标
import '@/assets/js/iconfont.js'
// 引入全局样式
import '@/assets/css/basic.css'
// 引入vue-cookies
import VueCookie from 'vue-cookies'
Vue.prototype.$cookies = VueCookie
// 兄弟组件传值
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载，提升运行效率
const Home = () => import('@/views/home/Home');

const User = () => import('@/views/user/User');
const CouponStore = () => import('@/views/user/couponStore/CouponStore');
const MemberRegister = () => import('@/views/user/memberRegister/MemberRegister');
const ConsumeHistory = () => import('@/views/user/consumeHistory/ConsumeHistory');

const Water = () => import('@/views/water/Water');

const CouponService = () => import('@/views/service/CouponService');


Vue.use(VueRouter)

const routes = [
  // 首页重定向
  {
    path: '/',
    redirect: '/home',
  },
  /* 
  首页路由
  */
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { showTabbar: true }
  },
  /* 
  用户中心路由
   */
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { showTabbar: true }

  },

  // bug：在/user/xxxx下刷新会Uncaught SyntaxError: Unexpected token '<'，怀疑是路由嵌套，试着拆分看看
  {
    path: '/user/couponStore',
    name: 'CouponStore',
    component: CouponStore,
    meta: { showTabbar: false }
  },
  {
    path: '/user/memberRegister',
    name: 'MemberRegister',
    component: MemberRegister,
    meta: { showTabbar: false }
  },
  {
    path: '/user/consumeHistory',
    name: 'ConsumeHistory',
    component: ConsumeHistory,
    meta: { showTabbar: false }
  },
  /* 
  水质管理路由
   */
  {
    path: '/water',
    name: 'Water',
    component: Water,
    meta: { showTabbar: false }

  },
  /* 
  优惠券服务路由
   */
  {
    path: '/couponService',
    name: 'CouponService',
    component: CouponService,
    meta: { showTabbar: false }
  },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

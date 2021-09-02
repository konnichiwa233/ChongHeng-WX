import Vue from 'vue'
import Vuex from 'vuex'

import mutations from '@/store/mutations'
import getters from '@/store/getters'
import actions from '@/store/actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 保存共享数据
  state: {
    /* 
    Home页面相关
     */
    // 用户信息
    headImg: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
    userName: '加载中...',
    // 签到框显示隐藏
    userSignInDialogVisible: false,


    /* 
    User页面相关
     */
    // 二维码显示隐藏变量
    QRcodeVisible: false,

    // 会员模块显示隐藏变量
    memberDialogVisible: false,

    // 个人信息显示隐藏变量
    informationDialogVisible: false,

    // 消费相关信息
    consumeMsg: [],
    //消费列表信息
    queryInfo: {
      // 当前页数
      pagenum: 1,
      // 当前页面总条数
      pagesize: 10,
    },


    /* 
    Water页面相关
     */
    // 客服对话框显示隐藏
    customerDialogVisible: false,
  },

  mutations,
  getters,
  actions,
})

export default store

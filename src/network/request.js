import axios from 'axios'
/* 
消费请求
 */
export function request1(config) {
    //1.创建axios实例
    const instance = axios.create({
        // baseURL: 'http://c_web.lxt6.cn:8099/informationService/order',/* 已跨域处理 */
        baseURL: '/informationService',
        timeout: 10000
    })

    //2.axios拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    //3.发送真正的网络请求
    return instance(config)
}
/* 
用户信息请求
*/
export function request2(config) {
    // 1、创建axios实例
    const instance = axios.create({
        // baseURL: 'http://cain.gz2vip.idcfengye.com',
        baseURL: 'http://testakin02.gz2vip.idcfengye.com',
        timeout: 10000
    })

    // 2、axios拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    //3、发送真正的网络请求
    return instance(config)
}
/*
签到相关请求
 */
export function request3(config) {
    // 1、创建axios实例
    const instance = axios.create({
        baseURL: '',
        timeout: 10000
    })

    // 2、axios拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    //3、发送真正的网络请求
    return instance(config)
}
/*
优惠券相关请求
 */
// 投放优惠券
export function request4(config) {
    // 1、创建axios实例
    const instance = axios.create({
        baseURL: '/merchants',
        timeout: 10000
    })

    // 2、axios拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    //3、发送真正的网络请求
    return instance(config)
}

// 其他操作
export function request5(config) {
    // 1、创建axios实例
    const instance = axios.create({
        baseURL: '/passbook',
        timeout: 10000
    })

    // 2、axios拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    //3、发送真正的网络请求
    return instance(config)
}

// 积分相关
export function request6(config) {
    // 1、创建axios实例
    const instance = axios.create({
        baseURL: '/',
        timeout: 10000
    })

    // 2、axios拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    //3、发送真正的网络请求
    return instance(config)
}






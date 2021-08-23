import { request1, request2, request3 } from "./request";

import store from '@/store'
/* 
消费请求
 */
export function getConsumeMsg() {
    let nowaDate = (new Date()).getTime();
    let preDate = nowaDate - 3 * 24 * 60 * 60 * 1000
    return request1({
        url: './order/consumption/baseQuery?schoolId=25042',

        //传参,指定参数
        params: {
            'order.startTime': preDate,
            'order.endTime': nowaDate,
            'page': store.state.queryInfo.pagenum,
            'limit': store.state.queryInfo.pagesize,
        }
    })
}

/* 
用户信息请求
*/
export function getUserInfofromWeb() {
    return request2({
        url: './GetUserInfofromWeb',
        params: {
            'openid': getCookies()
        }
    })

}

/*
签到相关请求
 */
// 签到状态
export function getSignInStatus() {
    return request3({
        url: './post/sign/in',
        method: 'post',
        data: {
            customerId: 255
        }
    })
}
// 签到详情
export function getSignInDetails() {
    return request3({
        url: './list/sign/in/detail',
        method: 'post',
        data: {
            customerId: 255
        }
    })
}





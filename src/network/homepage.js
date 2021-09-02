import { request1, request2 } from "./request";

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
            'openid': getCookiesByLogo()
        }
    })

}






import { getConsumeMsg, getUserInfofromWeb } from "@/network/homepage";

// 保存修改共享数据的方法
export default {
    // 请求用户个人信息
    getUserInfofromWeb(state) {
        getUserInfofromWeb().then(res => {
            // alert(res.errorCode)
            if (res.errorCode === '0006') {

                // 转义字符替换
                const json = res.result.replace(/\\\//g, '/')
                // console.log(json);
                // 字符串转为json对象
                const obj = JSON.parse(json)
                // console.log(obj);
                // console.log(typeof (obj));
                state.headImg = obj.headimgurl
                state.userName = obj.nickname
                // console.log(state.headImg);

            } else {

                window.location.href =
                    "http://testakin02.gz2vip.idcfengye.com/redirectFromOpenid";
            }

        })
    },
    // 请求消费相关信息
    getConsumeMsg(state) {
        getConsumeMsg().then((res) => {
            state.consumeMsg = res.Data.data;
            // 对保存的数据遍历排序
            state.consumeMsg.sort((a, b) => {
                return b.settleTime - a.settleTime;
            });
            // 赋值给全局状态管理
            state.consumeMsg = [...state.consumeMsg];
        });
    },

}
const path = require('path');//引入path模块
function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}


module.exports = {

    chainWebpack: (config) => {
        config.resolve.alias
            //set第一个参数：设置的别名，第二个参数：设置的路径
            .set('@', resolve('./src'))
            .set('components', resolve('./src/components'))
            .set('assets', resolve('./src/assets'))
            .set('views', resolve('./src/views'))
            .set('network', resolve('./src/network'))
        //注意 store 和 router 没必要配置

    },

    publicPath: './',
    outputDir: 'dist',

    devServer: {
        disableHostCheck: true,

        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            // 消费请求
            '/informationService':
            {
                target: 'http://c_web.lxt6.cn:8099/',
                changeOrigin: true
            },
            /* 
            签到相关请求
            */
            '/post':
            {
                target: 'http://39.103.170.217:8100/',
                changeOrigin: true
            },
            '/list':
            {
                target: 'http://39.103.170.217:8100/',
                changeOrigin: true
            },
            /* 
            优惠券相关请求
             */
            // 优惠券发放
            '/merchants':
            {
                target: 'http://39.101.130.49:9527/',
                changeOrigin: true
            },
            // 其他请求
            '/passbook':
            {
                target: 'http://39.101.130.49:9528/',
                changeOrigin: true
            },
        }, // string | Object
        before: app => { }
    }

}


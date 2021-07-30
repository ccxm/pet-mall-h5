module.exports = {
    plugins: {
        'autoprefixer': {
            'overrideBrowserslist': [
                'ie >= 8', // 兼容IE7以上浏览器
                'Firefox >= 3.5', // 兼容火狐版本号大于3.5浏览器
                'chrome  >= 35', // 兼容谷歌版本号大于35浏览器,
                'opera >= 11.5' // 兼容欧朋版本号大于11.5浏览器
            ]
        },
        'postcss-pxtorem': {
            rootValue: 37.5, // vant-UI的官方根字体大小是37.5
            propList: ['*']
        }
    }
}

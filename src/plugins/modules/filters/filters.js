import CONFIG from '@/config'

/**
 * 过滤器
 */

// 格式化钱
export const formatMoney = function(money) {
    money = String(money)
    money = money.split('')
    money = money.reverse()
    let pointIndex = money.indexOf('.')
    if (pointIndex === -1) {
        money.unshift('0', '0', '.')
    }
    if (pointIndex === 1) {
        money.unshift('0')
    }
    pointIndex = money.indexOf('.')
    const length = money.length - pointIndex
    let current = pointIndex
    for (let i = 1; i < length / 3; i++) {
        current = i * 3 + i + pointIndex
        money.splice(current, 0, ',')
    }
    if (money[money.length - 1] === ',') {
        --money.length
    }
    return money.reverse().join('')
}

// 格式化点赞数量
export const formatLikeNum = function(likeNum) {
    if (likeNum < 1000) {
        return likeNum
    }
    return (likeNum / 1000) + 'k'
}

// 格式化超过长度的字符串
export const formatString = function(str, maxLength = 20) {
    if (str.length <= maxLength) {
        return str
    }
    // 从中间截取
    const midLength = Math.floor(maxLength / 2)
    // maxLength + 2 为 '**' 的长度
    return str.substring(0, midLength) + '**' + str.substring(str.length - (midLength - 2))
}

// 格式化日期
export const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).addZero()}-${String(date.getDate()).addZero()}  ${String(date.getHours()).addZero()}:${String(date.getMinutes()).addZero()}:${String(date.getSeconds()).addZero()}`
}

// 格式化昵称，保护用户的隐私
export const formatNickName = (nickName) => {
    return `${nickName.charAt(0)}***${nickName.length > 1 ? nickName.charAt(nickName.length - 1) : '*'}`
}

// 照片路径加上前缀
export const addImagePrefix = (imgUrl = '') => {
    if (imgUrl.includes('http')) {
        return imgUrl
    }
    return CONFIG.IMAGE_BASE_URL + imgUrl
}

/**
 * 人性化时间处理 传入时间戳
 */
export const beautifyTime = (date) => {
    const timestamp = new Date(date).valueOf() / 1000
    const mistiming = Math.round(new Date() / 1000) - timestamp
    const timeLabel = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
    const timeStep = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
    for (let i = 0; i <= 6; i++) {
        const inm = Math.floor(mistiming / timeStep[i])
        if (inm !== 0) {
            return inm + timeLabel[i] + '前'
        }
    }
}

// module.exports = {
//     formatMoney,
//     formatLikeNum,
//     formatString,
//     formatDate,
//     formatNickName,
//     addImagePrefix
// }

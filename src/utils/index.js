export function formatMoney(num) {
    let [left, right] = String(num).split('.')
    left = left.split('')
    for (let i = left.length - 3; i >= 1; i -= 3) {
        left.splice(i, 0, ',')
    }
    right ? right = `.${right}` : null
    return left.concat(right).join('')
}

export function mergeListByKey(target = [], source = [], key) {
    const arr = []
    target.forEach(t => {
        const findTarget = source.find(s => s[key] === t[key])
        findTarget ? arr.push({ ...t, ...findTarget }) : undefined
    })
    return arr
}

export function copyProperties(target, source = {}) {
    Object.keys(target).forEach(key => {
        // eslint-disable-next-line
        if (source.hasOwnProperty(key)) {
            target[key] = source[key]
        }
    })
}

export function rem2px(rem) {
    const rootFontSize = parseFloat(document.documentElement.style.fontSize.replace('px', ''))
    return rem * rootFontSize
}

export function px2rem(px) {
    const rootFontSize = parseFloat(document.documentElement.style.fontSize.replace('px', ''))
    return px / rootFontSize
}

export function throttle(fun, wait = 300) {
    let timer
    return function(...args) {
        if (timer) {
            clearInterval(timer)
        }
        const that = this
        timer = setTimeout(() => {
            fun.call(that, ...args)
            timer = null
        }, wait)
    }
}

export function sleep(wait = 300) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, wait)
    })
}

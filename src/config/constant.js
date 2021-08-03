/**
 * 基础常量，存放一行的常量
 */

export const MAX_PRICE = 1000000000
export const PAGE_SIZE = 6

/**
 * 对象常量，存放多行的常量
 */

export const TIP_TYPE = Object.freeze({
    SUCCESS: 'success',
    ERROR: 'fail',
    LOADING: 'loading',
    INFO: 'text'
})

export const PRICE_RANGE = Object.freeze({
    ALL: {
        start: 0,
        limit: MAX_PRICE,
        label: 'ALL',
        value: 'ALL'
    },
    CHEEPER: {
        start: 0,
        limit: 100,
        label: '0.00 - 100.00',
        value: 'CHEEPER'
    },
    CHEEP: {
        start: 100,
        limit: 500,
        label: '100.00 - 500.00',
        value: 'CHEEP'
    },
    EXPENSIVE: {
        start: 500,
        limit: 1000,
        label: '500.00 - 1000.00',
        value: 'EXPENSIVE'
    },
    EXPENSIVER: {
        start: 1000,
        limit: MAX_PRICE,
        label: '1000+',
        value: 'EXPENSIVER'
    }
})

export const SORT_TYPE = Object.freeze({
    ASC: 'ASC',
    DESC: 'DESC'
})

export const TAB_BAR_ROUTER_LIST = {
    index: '/',
    sort: '/sort',
    cart: '/cart',
    user: '/user'
}

export const PAYMENT_STATE = {
    UNPAID: {
        value: 'UNPAID',
        label: '待支付',
        color: '#ee0a24'
    },
    SUCCESSED: {
        value: 'SUCCESSED',
        label: '交易成功',
        color: '#fed400'
    },
    FAILED: {
        value: 'FAILED',
        label: '交易失败',
        color: ''
    },
    UNCOMMENT: {
        value: 'UNCOMMENT',
        label: '待评价',
        color: '#7232dd'
    },
    ALL: {
        value: 'ALL',
        label: '全部',
        color: ''
    }
}

export const CLASSIFY_ENUM = {
    CAT: {
        key: 'CAT',
        label: '猫咪'
    },
    DOG: {
        key: 'DOG',
        label: '狗狗'
    },
    TOOL: {
        key: 'TOOL',
        label: '工具'
    }
}

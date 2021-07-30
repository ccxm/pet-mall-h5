import { get, post, del } from '@/plugins/modules/request'

export const createOrder = params => post('/order/create-order', params)

export const payForOrder = params => post('/order/pay-for-order', params, {
    isShowLoading: true,
    loadingText: '支付中',
    loadingSuccessText: '支付成功',
    isAutoThrow: false
})

export const getOrderList = params => get('order/order-list', params)

export const deleteOrder = params => del('/order/order', params, {
    showTip: true,
    tipMsg: '删除订单成功'
})

export const getOrder = params => get('/order/order', params)

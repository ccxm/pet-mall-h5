import { get, post, put, del } from '@/plugins/modules/request'

export const getCartList = params => get('/cart/cart', params)

export const addToCart = params => post('/cart/cart', params, {
    showTip: true,
    tipMsg: '添加成功'
})

export const updateCart = params => put('/cart/cart', params, {
    isAutoThrow: false
})

export const deleteFromCart = params => del('/cart/cart', params, {
    showTip: true,
    tipMsg: '移除成功'
})

export const getCartLength = () => get('/cart/cart-length')

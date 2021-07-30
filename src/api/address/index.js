import { del, get, post, put } from '@/plugins/modules/request'

export const addAddress = params => post('/user/address', params, {
    showTip: true,
    tipMsg: '新增成功'
})

export const getAddressList = () => get('/user/address')

export const updateAddress = params => put('/user/address', params, {
    showTip: true,
    tipMsg: '修改成功'
})

export const deleteAddress = addressId => del('/user/address', { addressId }, {
    showTip: true,
    tipMsg: '删除成功'
})

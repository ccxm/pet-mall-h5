export const CreateOrderItemDto = () => {
    return {
        goodsId: '',
        purchaseNum: 0
    }
}

export const CreateOrderDto = () => {
    return {
        addressId: '',
        orderList: []
    }
}

export const PayOrderDto = () => {
    return {
        orderId: '',
        paykey: ''
    }
}

export const GetOrderListDto = () => {
    return {
        currentPage: 0,
        pageSize: 6,
        state: ''
    }
}

export const GetOrderDto = () => {
    return {
        orderId: ''
    }
}

export const DeleteOrderDto = () => {
    return {
        orderId: ''
    }
}

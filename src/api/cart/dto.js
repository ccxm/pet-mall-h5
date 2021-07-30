export const AddToCartDto = () => {
    return {
        goodsId: '',
        goodsNum: null
    }
}

export const GetCartListDto = () => {
    return {
        pageSize: 6,
        curPage: 0
    }
}

export const DeleteCartDto = () => {
    return {
        goodsId: ''
    }
}

export const UpdateCartDto = () => {
    return {
        goodsId: '',
        goodsNum: null
    }
}

export const getGoodsDto = () => {
    return {
        currentPage: 0,
        pagingSize: 6,
        priceSort: null,
        saleVolumeSort: null
    }
}

export const getGoodsDetailDto = () => {
    return {
        goodsId: ''
    }
}

export const BatchGetGoodsDto = () => {
    return {
        goodsIdList: []
    }
}

export const GetGoodsMoreDto = () => {
    return {
        maxLength: 6
    }
}

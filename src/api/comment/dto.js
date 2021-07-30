export const CommentDto = () => {
    return {
        orderId: '',
        commentList: []
    }
}

export const CommentItemDto = () => {
    return {
        goodsId: '',
        comment: '',
        rate: null,
        imgList: [],
        isAnonymous: false
    }
}

export const GetCommentDto = () => {
    return {
        goodsId: '',
        pageSize: null,
        curPage: null
    }
}

export const LikeForCommentDto = () => {
    return {
        goodsId: '',
        commentId: '',
        likeState: null
    }
}

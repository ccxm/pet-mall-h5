export const loginDto = () => {
    return {
        email: '',
        password: ''
    }
}

export const registerDto = () => {
    return {
        email: '',
        password: '',
        verifyCode: ''
    }
}

export const GetVerifyCodeDto = () => {
    return {
        email: ''
    }
}

export const UpdateUserInfoDto = () => {
    return {
        nickName: '',
        gender: 0, // 0：男，1：女
        avatarUrl: []
    }
}

export const LikeForGoodsDto = () => {
    return {
        goodsId: ''
    }
}

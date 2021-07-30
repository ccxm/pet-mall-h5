import { Toast } from 'vant'
import { TIP_TYPE } from '@/config/constant'

export const common = (message, type = TIP_TYPE.SUCCESS, duration = 2000) => {
    Toast({
        message,
        type,
        duration
    })
}

export const success = message => common(message)

export const error = message => common(message, TIP_TYPE.ERROR)

export const info = message => common(message, TIP_TYPE.INFO)

export const loading = (message) => {
    return Toast.loading({
        message,
        forbidClick: true
    })
}

export const emptyParam = message => {
    return Toast({
        message,
        type: TIP_TYPE.ERROR,
        duration: 5000
    })
}

export const invalidParam = message => {
    return Toast({
        message,
        type: TIP_TYPE.ERROR,
        duration: 5000
    })
}

export const sendVerifyCode = () => {
    return Toast({
        message: '验证码已发送至您的邮箱，请注意查收',
        type: TIP_TYPE.LOADING,
        duration: 3000
    })
}

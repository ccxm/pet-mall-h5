// 验证邮箱
export const isEmail = (email) => {
    const reg = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/
    return reg.test(email)
}

// 验证密码
export const isPassword = (password) => {
    const reg = /^(\w){6,20}$/
    return reg.test(password)
}

// 验证验证码
export const isVerifyCode = (verifyCode) => {
    const reg = /^[0-9]{6}$/
    return reg.test(verifyCode)
}

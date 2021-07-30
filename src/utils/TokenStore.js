class TokenStore {
    static getInstance() {
        if (!TokenStore.instance) {
            TokenStore.instance = new TokenStore()
        }
        return TokenStore.instance
    }

    constructor() {
        this.token = this._getTokenFromLocal()
        this.userInfo = this._getUserInfoFromLocal()
    }

    // 保存token
    saveToken(token) {
        localStorage.setItem('token', token)
        this.token = token
    }

    saveUserInfo(userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.userInfo = userInfo
    }

    // 删除token
    deleteToken() {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        this.token = ''
        this.userInfo = {}
    }

    // 保存token
    getToken() {
        return this.token
    }

    getUserInfo() {
        return this.userInfo
    }

    // 从缓存中取token
    _getTokenFromLocal() {
        return localStorage.getItem('token')
    }

    // 缓存中取用户信息
    _getUserInfoFromLocal() {
        const temp = localStorage.getItem('userInfo')
        try {
            return JSON.parse(temp)
        } catch (e) {
            return {}
        }
    }
}

export default TokenStore.getInstance()

import TokenStore from '@/utils/TokenStore'

const state = {
    userInfo: {},
    commentLikeList: [],
    goodsLikeList: []
}

const mutations = {
    SAVE_USERINFO(state, data) {
        if (!data) {
            state.userInfo = {}
        } else {
            state.userInfo = {
                ...state.userInfo,
                ...data
            }
        }
        TokenStore.saveUserInfo(state.userInfo)
    },
    SAVE_LIKE_COMMENT_LIST(state, list) {
        state.commentLikeList = list
    },
    SAVE_GOODS_LIKE_LIST(state, list) {
        state.goodsLikeList = list
    },
    RESET(state) {
        state.userInfo = {}
        state.commentLikeList = []
        state.goodsLikeList = []
    }
}

const actions = {
    saveUserInfo({ commit }, data) {
        commit('SAVE_USERINFO', data)
    },
    async getBalance({ commit }) {
        // console.log(this)
        this._vm.$api.account.getBalance().then(res => {
            commit('SAVE_USERINFO', res)
        })
    },
    async updateCartLength({ commit }) {
        this._vm.$api.cart.getCartLength().then(res => {
            commit('SAVE_USERINFO', { ...res })
        })
    },
    async getCommentLikeList({ commit }) {
        this._vm.$api.user.getCommentLikeList().then(res => {
            commit('SAVE_LIKE_COMMENT_LIST', res.commentLikeList)
        })
    },
    async getGoodsLikeList({ commit }) {
        this._vm.$api.user.getGoodsLikeList().then(res => {
            commit('SAVE_GOODS_LIKE_LIST', res.goodsLikeList)
        }).catch(() => {})
    },
    reset({ commit }) {
        commit('RESET')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

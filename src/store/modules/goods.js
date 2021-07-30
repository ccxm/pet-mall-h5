const state = {
    purchaseList: []
}

const mutations = {
    SAVE_PURCHASE_LIST(state, list) {
        state.purchaseList = list
    },
    RESET(state) {
        state.purchaseList = []
    }
}

const actions = {
    savePurchaseList({ commit }, list) {
        commit('SAVE_PURCHASE_LIST', list)
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

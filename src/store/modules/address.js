import app from '@/main'

const state = {
    addressList: [],
    selectedAddressIndex: -1
}

const mutations = {
    SAVE_ADDRESS_LIST(state, list) {
        state.addressList = list
    },
    SELECT_INDEX(state, index) {
        state.selectedAddressIndex = index
    },
    RESET(state) {
        state.addressList = []
        state.selectedAddressIndex = -1
    }
}

const actions = {
    saveAddressList({ commit }, list) {
        commit('SAVE_ADDRESS_LIST', list)
    },
    selectIndex({ commit }, index) {
        commit('SELECT_INDEX', index)
    },
    getAddressList({ commit }, forceUpdate = false) {
        if (!this.getters.addressList.length || forceUpdate) {
            app.$api.user.getAddress().then(res => {
                commit('SAVE_ADDRESS_LIST', res.addressList)
                commit('SELECT_INDEX', 0)
            })
        }
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

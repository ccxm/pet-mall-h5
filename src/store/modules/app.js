import { TAB_BAR_ROUTER_LIST } from '@/config/constant'

const state = {
    showNavLeft: false,
    showTabBar: true,
    showNavHeader: true,
    navBarTitle: '首页',
    curRouter: TAB_BAR_ROUTER_LIST.index, // 当前路由
    selectedTabIndex: 0
}

const mutations = {
    CHANGE_NAV_LEFT: (state, isShow) => {
        state.showNavLeft = isShow
    },
    CHANGE_TAB_BAR: (state, isShow) => {
        state.showTabBar = isShow
    },
    CHANGE_ROUTER: (state, path) => {
        state.curRouter = path
    },
    CHANGE_NAV_HEADER: (state, isShow) => {
        state.showNavHeader = isShow
    },
    SET_NAV_BAR_TITLE: (state, title) => {
        state.navBarTitle = title
    },
    SET_TAB_INDEX: (state, index) => {
        state.selectedTabIndex = index
    }
}

const actions = {
    showNavLeft({ commit }) {
        commit('CHANGE_NAV_LEFT', true)
    },
    hideNavLeft({ commit }) {
        commit('CHANGE_NAV_LEFT', false)
    },
    showTabBar({ commit }) {
        commit('CHANGE_TAB_BAR', true)
    },
    hideTabBar({ commit }) {
        commit('CHANGE_TAB_BAR', false)
    },
    showNavHeader({ commit }) {
        commit('CHANGE_NAV_HEADER', true)
    },
    hideNavHeader({ commit }) {
        commit('CHANGE_NAV_HEADER', false)
    },
    changeRouter({ commit }, path) {
        commit('CHANGE_ROUTER', path)
    },
    setNavBarTitle({ commit }, title) {
        commit('SET_NAV_BAR_TITLE', title)
    },
    setSelectedTabIndex({ commit }, index) {
        console.log(index)
        commit('SET_TAB_INDEX', index)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

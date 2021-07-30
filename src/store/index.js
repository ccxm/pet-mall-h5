import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import app from '@/store/modules/app'
import getters from '@/store/getters'
import user from '@/store/modules/user'
import address from '@/store/modules/address'
import goods from '@/store/modules/goods'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        app,
        user,
        address,
        goods
    },
    getters,
    plugins: [createLogger(), createPersistedState({
        storage: window.sessionStorage
    })]
})

export function resetState() {
    this.$store.dispatch('user/reset')
    this.$store.dispatch('goods/reset')
    this.$store.dispatch('address/reset')
}

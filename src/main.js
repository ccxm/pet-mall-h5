import Vue from 'vue'
import App from './App'
import InstallPlugins from '@/plugins'
import './style/global.scss'
import 'lib-flexible/flexible'
import '@/utils/extendPrototype'
import store from '@/store'
import router from '@/router'
import '@/directives'

Vue.use(InstallPlugins)
const app = new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')

export default app

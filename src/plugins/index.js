/**
 * 注册Vue插件
 */
import Filters from '@/plugins/modules/filters'
import Element from '@/plugins/modules/element'
import Tips from '@/plugins/modules/tips'
import Api from '@/plugins/modules/api'
import Bus from '@/plugins/modules/bus'
import ErrorHandler from '@/plugins/modules/errorHandler'
import Vant from '@/plugins/modules/vant'
import InfiniteScroll from '@/plugins/modules/infiniteScroll'
import ModalComponent from '@/plugins/modules/modal'

// 插件注册
const InstallPlugins = {
    install(Vue) {
        Vue.use(Filters)
        Vue.use(Element)
        Vue.use(Tips)
        Vue.use(Api)
        Vue.use(Bus)
        Vue.use(ErrorHandler)
        Vue.use(Vant)
        Vue.use(InfiniteScroll)
        Vue.use(ModalComponent)
    }
}

export default InstallPlugins

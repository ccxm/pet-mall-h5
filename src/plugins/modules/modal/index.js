import $modal from '@/components/common/Modal/modal.js'

const ModalComponent = {
    install(Vue) {
        Vue.prototype.$modal = $modal
    }
}

export default ModalComponent

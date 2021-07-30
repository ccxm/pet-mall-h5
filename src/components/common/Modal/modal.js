import Vue from 'vue'
import Modal from './index.vue'

Vue.component(Modal.name, Modal)

function mergeOptions(target, source) {
    for (const key in source) {
        // eslint-disable-next-line no-prototype-builtins
        if (source.hasOwnProperty(key)) {
            target[key] = source[key]
        }
    }
}

function Mount() {
    // eslint-disable-next-line new-cap
    const InstanceConstructor = Vue.extend(Modal)
    const instance = new InstanceConstructor({
        el: document.createElement('div')
    })
    return instance
}

function $modal({
    title = '标题',
    cancelText = '取消',
    confirmText = '确定',
    content = '您确定删除吗',
    showCancel = true,
    showConfirm = true,
    showTitle = true,
    showFooter = true,
    showClose = false,
    cancelColor = '#969799',
    confirmColor = '#1989fa',
    throwCancel = false
}) {
    return new Promise((resolve, reject) => {
        const instance = Mount()
        const options = {
            title,
            cancelText,
            confirmText,
            content,
            showCancel,
            showConfirm,
            showTitle,
            showFooter,
            showClose,
            cancelColor,
            confirmColor,
            throwCancel
        }
        mergeOptions(instance, options)
        instance.value = true
        const confirm = instance.confirm
        const cancel = instance.cancel
        instance.confirm = () => {
            confirm.call(instance)
            instance.value = false
            resolve()
        }
        instance.cancel = () => {
            cancel.call(instance)
            instance.value = false
            if (instance.throwCancel) {
                reject()
            }
        }
        document.body.appendChild(instance.$el)
    })
}

export default $modal


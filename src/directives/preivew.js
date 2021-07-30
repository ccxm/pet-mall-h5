import Vue from 'vue'
import { ImagePreview } from 'vant'

Vue.directive('preview', {
    bind: (el, binding) => {
        console.log(this)
        el['previewHandler'] = function(e) {
            ImagePreview([el.src])
        }
        el.addEventListener('click', el['previewHandler'])
    },
    unbind: (el) => {
        el.removeEventListener('click', el['previewHandler'])
    }
})

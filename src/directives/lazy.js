import Vue from 'vue'
const loadingPath = require('../assets/svgs/loading.svg')

class LazyLoad {
    constructor(el, src) {
        this.sourceSrc = src
        this.el = el
        this.loadingPath = loadingPath
        this.checkIsInView(false)
        this.addListener()
    }

    showLoading() {
        this.el.src = this.loadingPath
    }

    showImage() {
        this.el.src = this.sourceSrc
    }

    // 检查是否在视线范围内
    checkIsInView() {
        setTimeout(() => {
            // console.log(this.el.offsetTop)
            const imageBottom = this.el.getBoundingClientRect().bottom
            // 可视区域+滚动条距离顶部位置 = 浏览器窗口底部的位置
            const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
            const windowBottom = scrollHeight + window.innerHeight
            // console.log(windowBottom, imageBottom)
            // console.log(this.el.offsetTop)
            if (windowBottom >= imageBottom) {
                this.showImage()
            } else {
                this.showLoading()
            }
        }, 10)
    }

    addListener() {
        const intersectionObserver = new IntersectionObserver((entries) => {
            console.log(entries[0].intersectionRatio)
            if (entries[0].intersectionRatio <= 0) {
                this.showLoading()
            } else {
                // setTimeout(() => {
                //     this.showImage()
                //     intersectionObserver.unobserve(this.el)
                // }, 100)
                const image = new Image()
                image.src = this.sourceSrc
                image.onload = () => {
                    this.showImage()
                    intersectionObserver.unobserve(this.el)
                }
                image.onerror = () => {
                    this.showLoading()
                    intersectionObserver.unobserve(this.el)
                }
            }
        })
        intersectionObserver.observe(this.el)
    }

    debounce(fun, wait) {
        let timer = null
        return function(...args) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fun.apply(this, args)
            }, wait)
        }
    }
}

Vue.directive('lazy', {
    bind(el, binding) {
        el.$lazy = new LazyLoad(el, binding.value)
    },
    componentUpdated(el) {
        if (el.$lazy && el.src && el.src !== el.$lazy.sourceSrc) {
            el.$lazy.sourceSrc = el.src
        }
    },
    unbind(el) {
        el.$lazy && (delete el.$lazy)
    }
})

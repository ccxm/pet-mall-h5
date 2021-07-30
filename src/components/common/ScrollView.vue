<template>
    <van-pull-refresh
        :value="isPulling"
        class="scroll-view"
        :class="{'scroll-view--hidden': isBodyScroll}"
        :style="{ height }"
        @refresh="onPullDownHandler"
        @scroll.native="onScrollHandler"
    >
        <slot />
        <template v-if="!isLoadAll">
            <div v-show="isLoading" class="xy-center scroll-view__loading">
                <van-loading>加载中...</van-loading>
            </div>
        </template>
        <van-divider v-else-if="!isPulling && !isLoading">已经到底啦！</van-divider>
    </van-pull-refresh>
</template>

<script>
import { throttle } from '@/utils'

export default {
    name: 'ScrollView',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        height: {
            type: [String, Number],
            default: 600
        },
        isPulling: {
            type: Boolean,
            default: false
        },
        isLoadAll: {
            type: Boolean,
            default: false
        },
        distance: {
            type: Number,
            default: 30
        },
        isBodyScroll: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            onScrollHandler: () => {},
            onBodyScrollHandler: () => {},
            onPullDownHandler: () => {}
        }
    },
    computed: {
        isLoading: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    },
    mounted() {
        this.onScrollHandler = !this.isBodyScroll ? throttle(this.onScroll, 100) : this.onScrollHandler
        this.onBodyScrollHandler = throttle(this.onScroll, 100)
        this.onPullDownHandler = throttle(this.onRefresh, 100)
        if (this.isBodyScroll) {
            document.getElementById('app-body').addEventListener('scroll', this.onBodyScrollHandler)
        }
    },
    beforeDestroy() {
        if (this.isBodyScroll) {
            document.getElementById('app-body').removeEventListener('scroll', this.onBodyScrollHandler)
        }
    },
    methods: {
        onRefresh() {
            if (this.isPulling) {
                return
            }
            this.$emit('pull-down')
        },
        onScroll(e) {
            if (this.isLoading || this.isLoadAll) {
                return
            }
            const target = e.target
            if ((target.scrollTop + target.clientHeight) >= (target.scrollHeight - this.distance)) {
                this.$emit('input', true)
                this.$emit('reach-bottom')
            }
        }
    }
}
</script>

<style lang="scss">
.scroll-view {
    overflow-y: auto;

    .scroll-view__loading {
        padding: 10px 0;
    }

    .van-loading {
        color: $--main-color;

        .van-loading__spinner {
            width: 18px;
            height: 18px;
        }
    }

    .van-divider {
        padding: 0 15px;
    }
}

.scroll-view--hidden {
    overflow-y: hidden !important;
}
</style>

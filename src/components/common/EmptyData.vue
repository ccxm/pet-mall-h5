<template>
    <div class="no-data yx-center" :style="wrapperStyle">
        <i v-if="isIcon" class="iconfont" :class="[name]" :style="style" />
        <img v-else :src="src">
        <span>{{ label }}</span>
    </div>
</template>

<script>
import { px2rem } from '@/utils'

export default {
    name: 'EmptyData',
    props: {
        isIcon: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            default: ''
        },
        src: {
            type: String,
            default: ''
        },
        size: {
            type: [String, Number],
            default: 90
        },
        top: {
            type: [String, Number],
            default: 50
        },
        color: {
            type: String,
            default: '#969799'
        },
        label: {
            type: String,
            default: '暂无数据'
        }
    },
    computed: {
        style() {
            return {
                color: this.color,
                fontSize: px2rem(parseInt(this.size)) + 'rem'
            }
        },
        wrapperStyle() {
            return {
                paddingTop: px2rem(parseInt(this.top)) + 'rem'
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .no-data {
        font-size: $--font-size-lg;
        color: $--text-light-color;

        img {
            width: 90px;
            height: 90px;
        }

        span {
            display: inline-block;
            margin-top: 15px;
        }
    }
</style>

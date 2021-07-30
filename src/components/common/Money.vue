<template>
    <div class="money">
        <span>¥</span>
        <span>{{ getMoney }}</span>
        <span v-if="needPoint">{{ getPoint }}</span>
    </div>
</template>

<script>
import { formatMoney } from '@/utils'

export default {
    name: 'Money',
    props: {
        money: {
            type: [String, Number],
            default: 100
        },
        // 是否需要小数点
        needPoint: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        getMoney() {
            const [int, point] = formatMoney(this.money).split('.') // eslint-disable-line
            return int
        },
        getPoint() {
            const [int, point] = Number(this.money).toFixed(2).split('.') // eslint-disable-line
            return `.${point}`
        }
    }
}
</script>

<style scoped lang="scss">
    .money {
        font-size: 12px;
        font-weight: 500;
        color: $--main-color;

        span {
            &:nth-child(2) {
                font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
                font-size: 20px;
            }
        }
    }
</style>

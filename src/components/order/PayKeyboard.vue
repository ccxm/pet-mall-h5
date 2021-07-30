<template>
    <transition v-if="show" name="fade">
        <div class="pay-keyboard">
            <modal
                v-model="showModal"
                :custom-content="true"
                title="请输入支付密码"
                :show-footer="false"
                :show-close="true"
                :show-before-close="true"
                @close="close"
                @before-close="beforeClose"
            >
                <div class="pay-wrapper yx-center">
                    <money :need-point="true" :money="money" />
                    <van-password-input
                        :value="value"
                        :focused="showKeyboard"
                        :error-info="errorInfo"
                        @focus="showKeyboard = true"
                    />
                </div>
            </modal>
            <van-number-keyboard
                v-model="value"
                :show="showKeyboard"
                @blur="showKeyboard = false"
            />
        </div>
    </transition>
</template>

<script>
import Modal from '@/components/common/Modal'
import Money from '@/components/common/Money'
import { PayOrderDto } from '@/api/order/dto'
import { sleep } from '@/utils'

export default {
    name: 'PayKeyboard',
    components: { Money, Modal },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        money: {
            type: Number,
            default: 0
        },
        orderId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            value: '',
            showKeyboard: true,
            showModal: true,
            errorInfo: ''
        }
    },
    watch: {
        value(val) {
            if (val.length === 6) {
                this.pay()
            }
        }
    },
    methods: {
        pay() {
            const dto = new PayOrderDto()
            dto.orderId = this.orderId
            dto.paykey = this.value
            this.$api.order.payForOrder(dto).then(async res => {
                this.close()
                await sleep(500)
                this.$router.push('/order-list')
            }).catch(err => {
                this.errorInfo = err.msg
                this.value = ''
            })
        },
        beforeClose() {
            this.showModal = false
            this.$modal({
                showTitle: false,
                content: '您有订单还未支付，确定离开吗',
                confirmText: '继续支付',
                cancelText: '残忍离开',
                throwCancel: true
            }).then(() => {
                this.showModal = true
                this.showKeyboard = true
            }).catch(async() => {
                this.$tips.info('您已取消支付')
                this.$emit('close')
                await sleep(500)
                this.$router.push('/order-list')
                this.$store.dispatch('/savePurchaseList', [])
            })
        },
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss">
    .pay-keyboard {
        color: $--text-color;

        .pay-wrapper {
            box-sizing: border-box;
            width: 100%;
            padding: 0 15px;
        }

        .van-password-input {
            width: 100%;
            margin-top: 10px;
        }

        .van-number-keyboard {
            z-index: 1001;
        }
    }
</style>

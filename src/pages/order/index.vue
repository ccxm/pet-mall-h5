<template>
    <div id="Order">
        <address-item
            :is-edit="false"
            :disabled="isFromPay"
            :info="addressInfo || addressList[selectedAddressIndex]"
        />
        <order-item
            v-for="item in goodsList"
            :key="item.goodsId"
            v-model="item.purchaseNum"
            :info="item"
            :disabled="isFromPay"
        />
        <van-submit-bar
            :price="total"
            :button-text="isFromPay ? '立即支付' : '提交订单'"
            @submit="checkForSubmit"
        >
            <div slot="default" class="submit-order-tip">
                <span>共<span class="highlight">{{ isFromPay ? goodsList.length : createOrderDto.orderList.length }}</span>件</span>
            </div>
        </van-submit-bar>
        <pay-keyboard
            v-if="showPayKeyboard"
            :show="showPayKeyboard"
            :order-id="orderId"
            :money="willPayAmount"
            @close="showPayKeyboard = false"
        />
    </div>
</template>

<script>
import AddressItem from '@/components/common/AddressItem'
import OrderItem from '@/components/common/OrderItem'
import { BatchGetGoodsDto } from '@/api/goods/dto'
import { CreateOrderDto, GetOrderDto } from '@/api/order/dto'
import { mapGetters } from 'vuex'
import PayKeyboard from '@/components/order/PayKeyboard'

export default {
    name: 'Order',
    components: { PayKeyboard, OrderItem, AddressItem },
    data() {
        return {
            goodsList: [],
            createOrderDto: new CreateOrderDto(),
            willPayAmount: 0,
            orderId: '',
            showPayKeyboard: false,
            isFromPay: false,
            addressInfo: null
        }
    },
    computed: {
        ...mapGetters(['addressList', 'selectedAddressIndex']),
        total() {
            const sum = this.goodsList.reduce((sum, item) => {
                sum += item.discountPrice * item.purchaseNum
                return sum
            }, 0)
            return parseInt(sum.toFixed(2)) * 100
        }
    },
    created() {
        const { orderId } = this.$route.query
        // 说明是从待支付跳转过来的
        if (orderId) {
            this.orderId = orderId
            this.isFromPay = true
            this.fetchOrder()
        } else {
            this.createOrderDto.orderList = this.$store.getters.purchaseList
            this.batchFetchGoods()
            this.fetchAddress()
        }
    },
    methods: {
        fetchOrder() {
            const dto = new GetOrderDto()
            dto.orderId = this.orderId
            this.$api.order.getOrder(dto).then(res => {
                this.goodsList = res.order.goodsList
                this.addressInfo = res.order.address
                this.willPayAmount = res.order.totalAmount
            })
        },
        batchFetchGoods() {
            const dto = new BatchGetGoodsDto()
            dto.goodsIdList = this.createOrderDto.orderList.map(item => {
                return item.goodsId
            })
            this.$api.goods.getGoodsInfoList(dto).then(res => {
                this.goodsList = this.mergeGoodsInfo(res.goodsInfoList, this.createOrderDto.orderList)
            })
        },
        fetchAddress() {
            this.$store.dispatch('address/getAddressList')
        },
        mergeGoodsInfo(goodsInfoList, orderList) {
            goodsInfoList.forEach(item => {
                const orderItem = orderList.find(order => order.goodsId === item.goodsId)
                item.purchaseNum = parseInt(orderItem.purchaseNum)
                item.intro = item.goodsInfo.intro
            })
            return goodsInfoList
        },
        async checkForSubmit() {
            if (this.isFromPay) {
                this.payNow()
                return
            }
            if (this.selectedAddressIndex < 0) {
                this.$tips.error('请先选择收货地址')
                return
            }
            const hasKey = await this.checkHasPayKey()
            hasKey ? this.submitOrder() : this.remainToSetPayKey()
        },
        async submitOrder() {
            this.createOrderDto.addressId = this.addressList[this.selectedAddressIndex].addressId
            this.$api.order.createOrder(this.createOrderDto).then(res => {
                this.orderId = res.orderId
                this.willPayAmount = res.totalAmount
                this.showPayKeyboard = true
            })
        },
        payNow() {
            this.showPayKeyboard = true
        },
        checkHasPayKey() {
            return new Promise(resolve => {
                this.$api.account.checkHasPaykey().then(res => {
                    resolve(res.hasPaykey)
                }).catch(() => {
                    resolve(false)
                })
            })
        },
        remainToSetPayKey() {
            this.$modal({
                title: '温馨提示',
                content: '您还未设置支付密码，请先设置',
                confirmText: '去设置'
            }).then(() => {
                this.$router.push('/password?mode=change')
            }).catch(() => {})
        }
    }
}
</script>

<style scoped lang="scss">
    #Order {
        .submit-order-tip {
            font-size: $--font-size-md;
            color: $--text-color;
            letter-spacing: 2px;

            .highlight {
                font-size: $--font-size-lg;
                font-weight: bold;
                color: $--main-color;
            }
        }
    }
</style>

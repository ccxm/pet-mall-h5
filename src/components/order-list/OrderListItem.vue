<script>
import OrderItem from '@/components/common/OrderItem'
import { DeleteOrderDto } from '@/api/order/dto'

export default {
    name: 'OrderListItem',
    extends: OrderItem,
    props: {
        addressInfo: {
            type: Object,
            default: () => {}
        },
        orderInfo: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        completeAddress() {
            return this.addressInfo.province + this.addressInfo.city + this.addressInfo.county + this.addressInfo.addressDetail
        }
    },
    methods: {
        beforeDelete() {
            this.$modal({
                title: '删除确认',
                content: '您确定删除该订单吗',
                confirmText: '删除',
                confirmColor: ' #ee0a24'
            }).then(() => {
                this.deleteOrder()
            })
        },
        deleteOrder() {
            const dto = new DeleteOrderDto()
            dto.orderId = this.orderInfo.orderId
            this.$api.order.deleteOrder(dto).then(() => {
                this.$emit('delete-order')
            })
        },
        toPay() {
            const purchaseList = this.orderInfo.goodsList.reduce((arr, item) => {
                arr.push({
                    goodsId: item.goodsId,
                    purchaseNum: item.goodsNum
                })
                return arr
            }, [])
            this.$store.dispatch('goods/savePurchaseList', purchaseList)
            this.$router.push(`/order?orderId=${this.orderInfo.orderId}`)
            console.log('去支付')
        },
        toComment() {
            // console.log('去评论')
            this.$router.push(`/write-comment?id=${this.orderInfo.orderId}`)
        }
    }
}
</script>


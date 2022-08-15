<template>
    <scroll-view
        v-model="isLoading"
        :is-pulling="isPulling"
        :is-body-scroll="false"
        :is-load-all="listLength === list.length"
        height="100%"
        @pull-down="fetchOrderList(true)"
        @reach-bottom="fetchOrderList"
    >
        <template v-if="list.length">
            <order-list-item
                v-for="(item, index) in list"
                :key="index"
                v-model="item.goodsNum"
                :list="item.goodsList"
                :selected="item.isSelected"
                :can-modify="false"
                :address-info="item.address"
                :order-info="item"
                :state="item.paymentState"
                @delete-order="onDelete"
            />
        </template>
        <empty-data
            v-else-if="isLoaded"
            :is-icon="false"
            label="暂无订单数据"
            top="200"
            :src="require('@/assets/images/empty-data/empty-order.png')"
        />
    </scroll-view>
</template>

<script>
import ScrollView from '@/components/common/ScrollView'
import { GetOrderListDto } from '@/api/order/dto'
import OrderListItem from '@/components/order-list/OrderListItem'
import EmptyData from '@/components/common/EmptyData'

export default {
    name: 'BaseList',
    components: {
        EmptyData,
        OrderListItem,
        ScrollView
    },
    data() {
        return {
            page: -1,
            list: [],
            isLoading: false,
            isPulling: false,
            listLength: 0,
            state: '',
            isLoaded: false
        }
    },
    created() {
        this.fetchOrderList(true)
    },
    methods: {
        fetchOrderList(isRefresh = false) {
            const dto = GetOrderListDto()
            isRefresh ? this.isPulling = true : this.isLoading = true
            isRefresh ? this.page = 0 : this.page++
            dto.currentPage = this.page
            dto.state = this.state
            this.$api.order.getOrderList(dto).then(async res => {
                this.list = isRefresh ? res.orderList : this.list.concat(res.orderList)
                this.listLength = res.listLength
            }).finally(() => {
                this.isLoading = false
                this.isPulling = false
                this.isLoaded = true
            })
        },
        onDelete() {
            this.fetchOrderList(true)
        }
    }
}
</script>

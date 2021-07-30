<template>
    <div id="Cart">
        <scroll-view
            v-if="cartLength && isLogin"
            v-model="isLoading"
            :is-pulling="isPulling"
            :is-load-all="cartLength === cartList.length"
            height="calc(100vh - 110px)"
            @pull-down="fetchCartList(true)"
            @reach-bottom="fetchCartList"
        >
            <order-item
                v-for="(item, index) in cartList"
                :key="index"
                v-model="item.goodsNum"
                :is-cart="true"
                :info="item"
                :selected="item.isSelected"
                @select="onSelect(item)"
                @delete="onDelete"
            />
        </scroll-view>
        <div v-else class="cart-empty">
            <empty-data name="empty-cart" label="购物车空空如也" size="50" top="100" />
            <van-button v-if="isLogin" plain round @click="toHome">去逛逛</van-button>
            <van-button v-else plain round @click="toLogin">去登录</van-button>
        </div>
        <van-submit-bar v-if="isLogin" :price="total" :disabled="!canOrder" button-text="去结算" @submit="toOder">
            <van-checkbox v-model="isSelectedAll">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>

<script>
import OrderItem from '@/components/common/OrderItem'
import ScrollView from '@/components/common/ScrollView'
import { GetCartListDto } from '@/api/cart/dto'
import { BatchGetGoodsDto } from '@/api/goods/dto'
import { mergeListByKey } from '@/utils'
import { mapGetters } from 'vuex'
import EmptyData from '@/components/common/EmptyData'

export default {
    name: 'Cart',
    components: { EmptyData, ScrollView, OrderItem },
    data() {
        return {
            page: -1,
            cartList: [],
            checked: false,
            selectedList: [],
            isLoading: false,
            isSelectedAll: false,
            isPulling: false
        }
    },
    computed: {
        ...mapGetters(['cartLength', 'isLogin']),
        total() {
            const sum = this.cartList.reduce((sum, item) => {
                sum += item.isSelected ? item.discountPrice * item.goodsNum : 0
                return sum
            }, 0)
            return parseInt(sum.toFixed(2)) * 100
        },
        canOrder() {
            return this.cartList.some(item => {
                return item.isSelected
            })
        }
    },
    watch: {
        isSelectedAll() {
            this.selectAll()
        }
    },
    created() {
        this.isLogin && this.fetchCartList(true)
    },
    methods: {
        toOder() {
            const purchaseList = this.cartList.reduce((arr, item) => {
                if (item.isSelected) {
                    arr.push({
                        goodsId: item.goodsId,
                        purchaseNum: item.goodsNum
                    })
                }
                return arr
            }, [])
            this.$store.dispatch('goods/savePurchaseList', purchaseList)
            this.$router.push('/order')
        },
        fetchCartList(isRefresh = false) {
            const dto = GetCartListDto()
            isRefresh ? this.isPulling = true : this.isLoading = true
            isRefresh ? this.page = 0 : this.page++
            dto.curPage = this.page
            this.$api.cart.getCartList(dto).then(res => {
                this.fetchGoodsList(res.cartList, isRefresh)
            })
        },
        fetchGoodsList(cartList, isRefresh = false) {
            const dto = new BatchGetGoodsDto()
            dto.goodsIdList = cartList.map(item => {
                return item.goodsId
            })
            if (!dto.goodsIdList.length) {
                this.isLoading = false
                this.isPulling = false
                return
            }
            this.$api.goods.getGoodsInfoList(dto).then(async res => {
                const tempCartList = mergeListByKey(cartList, res.goodsInfoList, 'goodsId')
                this.addPropertyList(tempCartList)
                this.cartList = isRefresh ? tempCartList : this.cartList.concat(tempCartList)
            }).finally(() => {
                this.isLoading = false
                this.isPulling = false
            })
        },
        addPropertyList(list = []) {
            list.forEach(item => {
                item.isSelected = false
                item.intro = item.goodsInfo.intro
            })
            return list
        },
        onSelect(target) {
            target.isSelected = !target.isSelected
        },
        onDelete(goodsId) {
            const index = this.cartList.findIndex(item => item.goodsId === goodsId)
            this.cartList.splice(index, 1)
            this.$store.dispatch('user/updateCartLength')
        },
        selectAll() {
            this.cartList.forEach(item => {
                item.isSelected = this.isSelectedAll
            })
        },
        toHome() {
            this.$router.push('/')
        },
        toLogin() {
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped lang="scss">
    #Cart {
        //padding-bottom: 110px;

        .cart-empty {
            width: 100%;

            button {
                display: block;
                width: 100px;
                margin: 30px auto 0;
                font-size: $--font-size-md;
                color: $--main-color;
                border: 1px solid $--main-color;
            }
        }
    }
</style>

<style lang="scss">
    #Cart {
        .van-submit-bar {
            bottom: 51px;
        }
    }
</style>

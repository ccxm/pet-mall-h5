<template>
    <div class="goods-action y-center__between">
        <div class="goods-action__left x-flex">
            <div class="goods-action-item yx-center" @click="toCart">
                <span v-if="cartLength" class="goods-action-item__bage xy-center">{{ cartLength }}</span>
                <van-icon name="cart-o" size="20" />
                <span class="goods-action-item__label">购物车</span>
            </div>
            <div class="goods-action-item yx-center">
                <!--                <van-icon name="like-o" size="20" />-->
                <like :show-like-num="false" :is-like="goodsLikeList.includes(info.goodsId)" @like="likeForGoods(info.goodsId)" />
                <span class="goods-action-item__label">收藏</span>
            </div>
        </div>
        <div class="goods-action__right xy-center">
            <button @click="addToCart">加入购物车</button>
            <button :class="{'g-disabled': disableToBuy }" @click="toOrder">立即购买</button>
        </div>
    </div>
</template>

<script>
// import Like from '@/components/common/Like'
import { AddToCartDto } from '@/api/cart/dto'
import { mapGetters } from 'vuex'
import Like from '@/components/common/Like'
import LikeMixins from '@/mixins/LikeMixins'

export default {
    name: 'GoodsAction',
    components: { Like },
    mixins: [LikeMixins],
    props: {
        disableToBuy: {
            type: Boolean,
            default: false
        },
        goodsId: {
            type: String,
            default: ''
        },
        info: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        ...mapGetters(['cartLength', 'goodsLikeList', 'isLogin'])
    },
    methods: {
        addToCart() {
            const dto = new AddToCartDto()
            dto.goodsId = this.goodsId
            dto.goodsNum = 1
            this.$api.cart.addToCart(dto).then(() => {
                this.$store.dispatch('user/updateCartLength')
            })
        },
        toOrder() {
            if (!this.isLogin) {
                this.$modal({
                    showTitle: false,
                    content: '您还未登录或登录已过期，请重新登录'
                }).then(() => {
                    this.$router.push('/login')
                })
                return
            }
            const purchaseList = [{
                goodsId: this.goodsId,
                purchaseNum: 1
            }]
            this.$store.dispatch('goods/savePurchaseList', purchaseList)
            this.$router.push('/order')
        },
        toCart() {
            this.$store.dispatch('app/setSelectedTabIndex', 2)
            this.$router.push('/cart')
        }
    }
    // components: { Like }
}
</script>

<style scoped lang="scss">
    .goods-action {
        position: fixed;
        bottom: 0;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        padding: 0 10px;
        background: #fff;
        box-shadow: 0 3px 43px 0 rgba(114, 114, 114, 0.28);

        .goods-action__left {
            .goods-action-item {
                position: relative;
                width: 50px;
                font-size: $--font-size-xs;
                color: $--text-light-color;

                .goods-action-item__label {
                    display: inline-block;
                    margin-top: 2px;
                }
            }

            .goods-action-item__bage {
                position: absolute;
                top: -3px;
                right: 10px;
                z-index: 10;
                box-sizing: border-box;
                min-width: 16px;
                padding: 0 3px;
                font-size: $--font-size-sm;
                line-height: 16px;
                color: #fff;
                background: $--main-color;
                border-radius: 50px;
            }
        }

        .goods-action__right {
            $radius: 20px;

            button {
                width: 100px;
                height: 35px;
                font-size: $--font-size-sm;
                line-height: 35px;
                color: #fff;
                border: none;
                outline: none;

                &:nth-child(1) {
                    background: linear-gradient(to right, #ffd01e, #ff8917);
                    border-top-left-radius: $radius;
                    border-bottom-left-radius: $radius;
                }

                &:nth-child(2) {
                    background: linear-gradient(to right, #ff6034, #ee0a24);
                    border-top-right-radius: $radius;
                    border-bottom-right-radius: $radius;
                }
            }
        }
    }
</style>

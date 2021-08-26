<template>
    <div class="order-item-wrapper g-card">
        <van-icon v-if="isCart" class="order-item-delete" name="close" size="15" @click.native="showDelModal" />
        <div v-if="list.length" class="order-item-header y-center__between">
            <span>{{ orderInfo.createdAt | formatDate }}</span>
            <span :style="{ color: PAYMENT_STATE[state].color }">{{ PAYMENT_STATE[state].label }}</span>
        </div>
        <template v-for="(item, index) in goodsList">
            <div :key="item.goodsId" class="order-item y-center" :class="{'order-item--un-first': index !== 0}">
                <div class="order-item__img">
                    <img v-lazy="item.masterImg">
                    <van-icon
                        v-if="isCart"
                        class="order-item-checked"
                        name="checked"
                        size="20"
                        :color="selected ? '#fa436a' : '#c0c4cc'"
                        @click.native="$emit('select')"
                    />
                </div>
                <div class="order-item__right y-center__between">
                    <span class="order-item-goods">{{ (item.goodsInfo && item.goodsInfo.intro) || item.intro }}</span>
                    <div class="order-item__price y-center__between" :class="{'order-item--not-modify': !canModify}">
                        <div class="price-wrapper x-flex">
                            <money :money="item.discountPrice" :need-point="true" />
                            <span v-if="!isClassify" class="price-wrapper__amount">x {{ value }}</span>
                        </div>
                        <i v-if="isClassify" class="iconfont cart order-item__right-cart" @click.self="addToCart"/>
                        <van-stepper
                            v-else-if="canModify"
                            :value="value"
                            :disabled="disabled"
                            async-change
                            button-size="20"
                            @change="updateCartNum"
                        />
                    </div>
                </div>
            </div>
        </template>
        <div v-if="isCart" class="order-item-subtotal x-flex">
            <span>小计：</span>
            <money :need-point="true" :money="info.discountPrice * value" />
        </div>
        <div v-if="list.length" class="order-item-footer y-center__between">
            <van-popover v-model="showAddress" placement="top-start" trigger="click">
                <div class="address-preview y-flex">
                    <span>{{ addressInfo.name }}</span>
                    <span>{{ completeAddress }}</span>
                    <span>{{ addressInfo.tel }}</span>
                </div>
                <template #reference>
                    <a type="primary">物流信息</a>
                </template>
            </van-popover>
            <div>
                <van-button round size="small" @click="beforeDelete">删除订单</van-button>
                <van-button v-if="state === PAYMENT_STATE.SUCCESSED.value && !orderInfo.isCommented " round size="small" color="#7232dd" plain @click="toComment">去评价</van-button>
                <van-button v-if="state === PAYMENT_STATE.UNPAID.value " round type="danger" size="small" @click="toPay">去支付</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import Money from '@/components/common/Money'
import { DeleteCartDto, UpdateCartDto } from '@/api/cart/dto'
import { PAYMENT_STATE } from '@/config/constant'
import { AddToCartDto } from '@/api/cart/dto'

export default {
    name: 'OrderItem',
    components: {
        Money
    },
    props: {
        isCart: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: false
        },
        info: {
            type: Object,
            default: () => {
            }
        },
        value: {
            type: Number,
            default: 100
        },
        // 也可以是一个列表，如果是列表，则列表优先级比info的优先级高
        list: {
            type: Array,
            default: () => []
        },
        canModify: {
            type: Boolean,
            default: true
        },
        state: {
            type: String,
            default: PAYMENT_STATE.SUCCESSED.value
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isClassify: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            PAYMENT_STATE,
            showAddress: false
        }
    },
    computed: {
        goodsList() {
            return this.list.length > 0 ? this.list : [this.info]
        }
    },
    methods: {
        showDelModal() {
            this.$modal({
                title: '温馨提示',
                content: '您确定从购物车中移除该商品吗'
            }).then(() => {
                this.deleteFromCart()
            })
        },
        deleteFromCart() {
            const dto = new DeleteCartDto()
            dto.goodsId = this.info.goodsId
            this.$api.cart.deleteFromCart(dto).then(() => {
                this.$emit('delete', dto.goodsId)
            })
        },
        updateCartNum(num) {
            if (!this.isCart) {
                this.$emit('input', num)
                return
            }
            const dto = new UpdateCartDto()
            dto.goodsId = this.info.goodsId
            dto.goodsNum = num
            this.$api.cart.updateCart(dto).then(() => {
                this.$emit('input', num)
            }).catch(() => {
                this.$emit('input', num)
            })
        },
        addToCart() {
            const dto = new AddToCartDto()
            dto.goodsId = this.info.goodsId
            dto.goodsNum = 1
            this.$api.cart.addToCart(dto).then(() => {
                this.$store.dispatch('user/updateCartLength')
            })
        }
    }
}
</script>

<style scoped lang="scss">
.order-item-wrapper {
    position: relative;
    padding-top: 22px;

    .order-item-delete {
        position: absolute;
        top: 4px;
        right: 4px;
        font-weight: $--font-weight-bold;
        color: $--text-light-color;
    }

    .order-item-header {
        padding-bottom: 10px;
        margin-top: -10px;

        span {
            &:nth-child(1) {
                font-size: $--font-size-md;
                font-weight: bolder;
                color: $--text-color;
            }

            &:nth-child(2) {
                font-size: $--font-size-md;
                color: $--gold-color;
            }
        }
    }

    .order-item {
        .order-item__img {
            position: relative;
            flex-shrink: 0;
            width: 80px;
            height: 80px;

            img {
                width: 100%;
                height: 100%;
                border-radius: $--border-radius-sm;
            }

            .order-item-checked {
                position: absolute;
                top: -10px;
                left: -10px;
                color: #fa436a;
                background: #fff;
                border: 2px solid #fff;
                border-radius: $--border-round;
            }
        }

        .order-item__right {
            box-sizing: border-box;
            flex-direction: column;
            flex-grow: 2;
            height: 80px;
            padding-left: 10px;
            color: $--text-color;

            .order-item-goods {
                font-size: $--font-size-md;
                font-weight: $--font-weight-bold;
            }

            .order-item__price {
                width: 100%;

                .price-wrapper {
                    align-items: baseline;

                    .price-wrapper__amount {
                        display: inline-block;
                        margin-left: 8px;
                        font-size: $--font-size-md;
                        color: $--text-light-color;
                    }
                }
            }

            .order-item__right-cart {
                padding: 5px;
                font-size: $--font-size-lg;
                font-weight: bold;
                color: $--main-color;
                background: #eee;
                border-radius: 100%;
            }
        }

        .order-item--not-modify {
            justify-content: flex-end;
        }
    }

    .order-item--un-first {
        margin-top: 15px;
    }

    .order-item-subtotal {
        align-items: baseline;
        justify-content: flex-end;
        width: 100%;
        padding-top: 10px;
        color: $--text-light-color;
    }

    .order-item-footer {
        display: flex;
        margin-top: 20px;

        a {
            color: $--text-light-color;
        }

        button {
            padding: 0 10px;
            margin-left: 10px;
            font-size: $--font-size-sm;
        }
    }
}
</style>

<style lang="scss">
.address-preview {
    padding: 10px;

    span {
        font-size: $--font-size-sm;
        line-height: 26px;
        color: $--text-color;

        &:nth-child(1) {
            font-size: $--font-size-md;
            font-weight: bolder;
        }
    }
}
</style>

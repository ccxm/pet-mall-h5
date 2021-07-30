<template>
    <div class="goods-card y-flex" @click="toDetail">
        <img class="goods-card-bg" :src="info.masterImg">
        <div class="goods-info">
            <div class="goods-info__top y-center__between">
                <span>{{ info.goodsName }}</span>
                <like :is-like="goodsLikeList.includes(info.goodsId)" :like-num="info.likeNum" @like="likeForGoods(info.goodsId)" />
            </div>
            <div class="goods-info__bottom y-center__between">
                <money :money="info.discountPrice" />
                <span class="sales">已售 {{ info.saleVolume }} 件</span>
            </div>
        </div>
    </div>
</template>

<script>
import Money from '@/components/common/Money'
import Like from '@/components/common/Like'
import LikeMixins from '@/mixins/LikeMixins'
import { mapGetters } from 'vuex'

export default {
    name: 'GoodsCard',
    components: { Like, Money },
    mixins: [LikeMixins],
    props: {
        info: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        ...mapGetters(['goodsLikeList'])
    },
    methods: {
        toDetail() {
            this.$router.push({
                path: '/detail',
                query: {
                    goodsId: this.info.goodsId
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .goods-card {
        box-sizing: border-box;
        width: 176px;
        height: 223px;
        padding: 10px;
        margin-top: 10px;
        background: #fff;
        border-radius: 5px;

        .goods-card-bg {
            width: 156px;
            height: 140px;
            border-radius: 5px;
            object-fit: cover;
        }

        .goods-info {
            margin-top: 10px;
            color: #333;

            .goods-info__top {
                font-size: 16px;
                font-weight: bold;
            }

            .goods-info__bottom {
                margin-top: 10px;

                .sales {
                    font-size: 12px;
                    color: #999;
                }
            }
        }
    }
</style>

<template>
    <div id="Detail" class="yx-center">
        <goods-banner :img-list="(detail.goodsInfo && detail.goodsInfo.imgList) || []" />
        <detail-info :info="detail" />
        <goods-params />
        <goods-action :goods-id="goodsId" :disable-to-buy="detail.inventory === 0" :info="detail" />
        <comment-card :goods-id="goodsId" />
    </div>
</template>

<script>
import GoodsBanner from '../../components/detail/GoodsBanner'
import DetailInfo from '../../components/detail/DetailInfo'
import GoodsParams from '@/components/detail/GoodsParams'
import GoodsAction from '@/components/detail/GoodsAction'
import CommentCard from '../../components/detail/CommentCard'
import { getGoodsDetailDto } from '@/api/goods/dto'

export default {
    name: 'Detail',
    components: { CommentCard, GoodsAction, GoodsParams, DetailInfo, GoodsBanner },
    data() {
        return {
            goodsId: '',
            detail: {}
        }
    },
    created() {
        this.goodsId = this.$route.query.goodsId
        this.getGoodsDetail()
    },
    methods: {
        getGoodsDetail() {
            const dto = getGoodsDetailDto()
            dto.goodsId = this.goodsId
            this.$api.goods.getGoodsDetail(dto).then(res => {
                this.detail = res
            })
        }
    }
}
</script>

<style scoped lang="scss">
    #Detail {
        align-items: flex-start;
        padding-bottom: 60px;
    }
</style>

<template>
    <div class="list-panel">
        <van-pull-refresh
            v-model="isLoading"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="10"
            @refresh="onRefresh"
        >
            <div class="goods-wrapper y-center__between">
                <template v-for="item in goodsList">
                    <goods-card :key="item.goodsId" :info="item" />
                </template>
            </div>
            <div v-show="loading" class="xy-center list-panel__loading">
                <van-loading color="#1989fa" size="20">加载中</van-loading>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getGoodsDto } from '../../api/goods/dto'
import GoodsCard from '@/components/index/GoodsCard'

export default {
    name: 'ListPanel',
    components: {
        GoodsCard
    },
    data() {
        return {
            count: 0,
            isLoading: false,
            loading: false,
            list: new Array(15).fill(0).map((item, i) => item + i),
            getGoodsDto: getGoodsDto(),
            goodsList: [],
            busy: false
        }
    },
    created() {
        // this.fetchGoodsList()
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false
            }, 1000)
        },
        loadMore() {
            console.log('loadMore')
            this.busy = true
            this.loading = true
            this.fetchGoodsList()
        },
        fetchGoodsList() {
            this.$api.goods.getGoodsList(this.getGoodsDto).then(res => {
                const { goodsList } = res
                this.goodsList = this.goodsList.concat(goodsList)
                this.busy = (goodsList.length < this.getGoodsDto.pagingSize)
                this.loading = false
                this.getGoodsDto.currentPage++
            }).catch(() => {
                this.loading = false
                this.busy = false
            })
        }
    }
    // mounted() {
    //     window.addEventListener('scroll', (e) => {
    //         console.log(e)
    //     })
    // }
}
</script>

<style scoped lang="scss">
.list-panel {
    .list-panel__loading {
        padding: 10px 0;
    }

    .goods-wrapper {
        box-sizing: border-box;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 100%;
    }
}
</style>

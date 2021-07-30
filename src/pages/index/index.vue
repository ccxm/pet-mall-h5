<template>
    <div id="Home" class="y-flex">
        <banner />
        <goods-nav-tab @change="sortChange" />
        <scroll-view
            v-model="isLoading"
            :is-pulling="isPulling"
            :is-body-scroll="true"
            :is-load-all="goodsLength === goodsList.length"
            :distance="10"
            @pull-down="fetchGoodsList(true)"
            @reach-bottom="fetchGoodsList"
        >
            <div class="goods-wrapper y-center__between">
                <goods-card v-for="item in goodsList" :key="item.goodsId" :info="item" />
            </div>
        </scroll-view>
    </div>
</template>

<script>
import Banner from '@/components/index/Banner'
import GoodsNavTab from '@/components/common/GoodsNavTab'
import ScrollView from '@/components/common/ScrollView'
import GoodsCard from '@/components/index/GoodsCard'
import FetchGoodsListMixins from '@/mixins/FetchGoodsListMixins'

export default {
    name: 'Index',
    components: { Banner, GoodsNavTab, ScrollView, GoodsCard },
    mixins: [FetchGoodsListMixins],
    data() {
        return {
            selectTab: 0
        }
    }
}
</script>

<style scoped lang="scss">
    #Home {
        .goods-wrapper {
            box-sizing: border-box;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 100%;
        }
    }
</style>

<style lang="scss">
    .home-tab {
        padding-bottom: 20px;

        .van-tab {
            font-size: 16px;
            font-weight: 400;
            color: #424242;
        }

        .van-tabs__line {
            width: 38px;
            background: $--main-color;
        }

        .van-tab--active {
            font-weight: 600;
            color: #333;
        }
    }
</style>

<template>
    <div class="classify x-flex">
        <div class="classify-left">
            <span
                v-for="(item, index) in left"
                :key="index"
                class="classify-left-item xy-center"
                :class="{'classify-left-item--selected': selectedLeftIndex === index}"
                @click="selectedLeftIndex = index"
            >{{ item }}</span>
        </div>
        <div class="classify-right y-flex">
            <goods-nav-tab @change="sortChange" />
            <scroll-view
                v-model="isLoading"
                :is-pulling="isPulling"
                :is-load-all="goodsLength === goodsList.length"
                :distance="10"
                @pull-down="fetchGoodsList(true)"
                @reach-bottom="fetchGoodsList"
            >
                <order-item v-for="item in goodsList" :key="item.goodsId" :info="item" :is-classify="true" />
            </scroll-view>
        </div>
    </div>
</template>

<script>

import OrderItem from '@/components/common/OrderItem'
import ScrollView from '@/components/common/ScrollView'
import GoodsNavTab from '@/components/common/GoodsNavTab'
import FetchGoodsListMixins from '@/mixins/FetchGoodsListMixins'

export default {
    name: 'Sort',
    components: { GoodsNavTab, ScrollView, OrderItem },
    mixins: [FetchGoodsListMixins],
    data() {
        return {
            left: [
                '猫咪'
            ],
            selectedLeftIndex: 0
        }
    }
}
</script>

<style scoped lang="scss">
    .classify {
        height: 98%;
        margin-top: 2%;
        background: #fff;

        &-left {
            flex-shrink: 0;
            width: 80px;
            height: 100%;
            font-size: $--font-size-md;
            color: $--text-color;
            background: #f7f7f7;

            &-item {
                position: relative;
                height: 50px;
                //border-bottom: 1px solid $--border-light;
            }

            &-item--selected {
                color: $--main-color;
                background: #fff;

                &::before {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 4px;
                    height: 30px;
                    content: "";
                    background-color: $--main-color;
                    border-radius: 0 3px 3px 0;
                    opacity: 0.8;
                    transform: translateY(-50%);
                }
            }
        }

        &-right {
            flex: 2;
            margin-left: 5px;
        }
    }
</style>

<style lang="scss">
    .classify-right {
        .order-item-wrapper {
            width: 100%;
            margin: 0 !important;
            border: 0 !important;
            border-radius: 0;

            .order-item-goods {
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
</style>

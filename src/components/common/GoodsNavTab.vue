<template>
    <van-tabs v-model="selectTab" class="goods-nav-tabs">
        <van-tab title="推荐" />
        <van-tab>
            <div slot="title" class="goods-nav-tab xy-center" @click="saleVolumeSort === 1 ? saleVolumeSort = -1 : saleVolumeSort = 1">
                <span>销量</span>
                <div class="goods-nav-tab__sort yx-center">
                    <van-icon name="arrow-up" :class="{'sort-selected-icon': saleVolumeSort === -1}" />
                    <van-icon name="arrow-down" :class="{'sort-selected-icon': saleVolumeSort === 1}" />
                </div>
            </div>
        </van-tab>
        <van-tab>
            <div slot="title" class="goods-nav-tab xy-center" @click="priceSort === 1 ? priceSort = -1 : priceSort = 1">
                <span>价格</span>
                <div class="goods-nav-tab__sort yx-center">
                    <van-icon name="arrow-up" :class="{'sort-selected-icon': priceSort === -1}" />
                    <van-icon name="arrow-down" :class="{'sort-selected-icon': priceSort === 1}" />
                </div>
            </div>
        </van-tab>
    </van-tabs>
</template>

<script>
export default {
    name: 'GoodsNavTab',
    data() {
        return {
            selectTab: '',
            saleVolumeSort: 0,
            priceSort: 0
        }
    },
    watch: {
        priceSort() {
            this.$emit('change', {
                saleVolumeSort: this.saleVolumeSort,
                priceSort: this.priceSort
            })
        },
        saleVolumeSort() {
            this.$emit('change', {
                saleVolumeSort: this.saleVolumeSort,
                priceSort: this.priceSort
            })
        }
    }
}
</script>

<style lang="scss">
    .goods-nav-tabs {
        .van-tab {
            font-size: 16px;
            font-weight: 400;
            color: #424242;
        }

        .van-tabs__line {
            width: 38px;
            background: $--main-color;
        }

        .van-tabs__wrap {
            height: 50px;
        }

        .van-tab--active {
            font-weight: 600;
            color: #333;
        }

        .goods-nav-tab {
            .goods-nav-tab__sort {
                height: 28px;
                margin-left: 3px;
                font-weight: bold;
                color: #ccc;

                i {
                    font-size: $--font-size-sm;
                }

                .sort-selected-icon {
                    color: $--main-color;
                }
            }
        }
    }
</style>

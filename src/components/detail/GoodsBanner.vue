<template>
    <van-swipe :autoplay="3000" class="goods-banner">
        <van-swipe-item v-for="(image, index) in imgList" :key="index">
            <img :src="image" alt="banner">
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
    name: 'GoodsBanner',
    props: {
        imgList: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style scoped lang="scss">
    .goods-banner {
        width: 100%;

        img {
            width: 100%;
            height: 300px;
            object-fit: cover;
        }
    }
</style>

<style lang="scss">
    .goods-banner {
        width: 100%;

        .van-swipe-item {
            height: 300px !important;
        }

        .van-swipe__indicators {
            right: 0 !important;
            left: unset;

            .van-swipe__indicator {
                background: #bbb;
            }

            .van-swipe__indicator--active {
                width: 20px;
                height: 6px;
                background: $--main-color;
                border-radius: 6px;
            }
        }
    }
</style>

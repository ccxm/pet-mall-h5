<template>
    <van-swipe :autoplay="3000" class="banner">
        <van-swipe-item v-for="(image, index) in bannerList" :key="index">
            <img :src="image" alt="banner">
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
    name: 'Banner',
    data() {
        return {
            bannerList: [
                require('@/assets/images/banner/banner_01.png'),
                require('@/assets/images/banner/banner_02.png'),
                require('@/assets/images/banner/banner_03.png')
            ]
        }
    }
}
</script>

<style scoped lang="scss">
.banner {
    width: 100%;

    img {
        width: 100%;
        height: 156px;
        object-fit: cover;
    }
}
</style>

<style lang="scss">
.banner {
    width: 100%;

    .van-swipe-item {
        height: 156px !important;
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

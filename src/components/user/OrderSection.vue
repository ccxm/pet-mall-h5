<template>
    <div class="order-section y-center__between">
        <router-link class="order-section__item yx-center" tag="div" to="/order-list">
            <!--            <img src="@/assets/images/user/all.png">-->
            <i class="iconfont all" />
            <span>全部订单</span>
        </router-link>
        <router-link class="order-section__item yx-center" tag="div" to="/order-list?tab=1">
            <!--            <img src="@/assets/images/user/to-pay.png">-->
            <i class="iconfont pay" />
            <span>待付款</span>
        </router-link>
        <router-link class="order-section__item yx-center" tag="div" to="/order-list?tab=2">
            <!--            <img src="@/assets/images/user/to-comment.png">-->
            <i class="iconfont comment" />
            <span>待评价</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'OrderSection'
}
</script>

<style scoped lang="scss">
    .order-section {
        box-sizing: border-box;
        width: 355px;
        padding: 15px;
        margin-top: 15px;
        margin-left: 10px;
        background: #fff;
        border-radius: $--border-radius-lg;

        .order-section__item {
            font-size: $--font-size-sm;
            color: $--main-color;

            img {
                width: 25px;
                height: 25px;
                margin-bottom: 10px;
            }

            i {
                font-size: 30px;
                font-weight: 500;
            }
        }
    }
</style>

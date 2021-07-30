<template>
    <div class="goods-params">
        <div class="goods-params__item">
            <span>发货</span>
            <span>上海浦东</span>
        </div>
        <div class="goods-params__item">
            <span>优惠</span>
            <span>全场一律包邮</span>
        </div>
        <div class="goods-params__item">
            <span>服务</span>
            <span>7天无理由退换货</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GoodsParams'
}
</script>

<style scoped lang="scss">
    .goods-params {
        box-sizing: border-box;
        width: 355px;
        padding: 10px 20px;
        margin-top: 10px;
        margin-left: 10px;
        background: #fff;
        border-radius: $--border-radius-lg;

        .goods-params__item {
            margin: 10px 0;
            font-size: $--font-size-md;
            color: $--text-color;

            span {
                display: inline-block;

                &:nth-child(1) {
                    width: 50px;
                    color: $--text-light-color;
                    letter-spacing: 1px;
                }

                &:nth-child(2) {
                    font-weight: $--font-weight-bold;
                }
            }
        }
    }
</style>

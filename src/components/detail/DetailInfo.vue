<template>
    <div class="detail-info y-flex g-card">
        <div class="detail-info__price">
            <money :money="info.discountPrice" />
        </div>
        <div class="detail-info__text">
            <span>{{ info.goodsInfo && info.goodsInfo.intro }}</span>
            <div class="discount-tag">
                <span>促销优惠</span>
            </div>
        </div>
        <div class="detail-info__statistics y-center__between">
            <span>销量：{{ info.saleVolume }}</span>
            <span>库存：{{ info.inventory }}</span>
            <span>收藏：{{ info.likeNum }}</span>
        </div>
    </div>
</template>

<script>
import Money from '../common/Money'
export default {
    name: 'DetailInfo',
    components: { Money },
    props: {
        info: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style scoped lang="scss">
    .detail-info {
        .detail-info__text {
            margin: 8px 0;
            overflow: hidden;
            font-size: 17px;
            font-weight: bold;
            line-height: 24px;
            color: #333;

            .discount-tag {
                display: inline-block;

                span {
                    display: inline-block;
                    padding: 2px 4px;
                    margin-left: 5px;
                    font-size: 12px;
                    font-weight: 300;
                    line-height: 15px;
                    color: #fff;
                    background: $--main-color;
                    border-radius: 2px;
                    transform: translateY(-2px);
                }
            }
        }

        .detail-info__statistics {
            font: normal 12px "Microsoft YaHei", sans-serif;
            color: #909399;
        }
    }
</style>

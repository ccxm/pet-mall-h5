<template>
    <div class="other-section">
        <div class="other-section-item">
            <van-cell class="other-section-item__recommend" title="相关推荐">
                <img slot="icon" src="@/assets/images/user/list/recommend.png">
                <div slot="label" class="recommend-wrapper x-flex">
                    <div v-for="(item, index) in goodsList" :key="index">
                        <img :src="item.masterImg" @click="toDetail(item.goodsId)">
                    </div>
                </div>
            </van-cell>
            <van-cell title="收货地址" is-link @click.native="to('/address-list')">
                <img slot="icon" src="@/assets/images/user/list/location.png">
            </van-cell>
            <van-cell title="设置" is-link @click.native="to('/setting')">
                <img slot="icon" src="@/assets/images/user/list/setting.png">
            </van-cell>
            <van-cell v-if="false" is-link title="个人资料" @click.native="to('/index')">
                <img slot="icon" src="@/assets/images/user/list/information.png">
            </van-cell>
        </div>

        <div class="other-section-item">
            <van-cell title="修改支付密码" is-link @click.native="to('/password')">
                <img slot="icon" src="@/assets/images/user/list/set-password.png">
            </van-cell>
            <van-cell title="找回支付密码" is-link @click.native="to('/password?mode=find')">
                <img slot="icon" src="@/assets/images/user/list/modify-password.png">
            </van-cell>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetGoodsMoreDto } from '@/api/goods/dto'

export default {
    name: 'OtherSection',
    data() {
        return {
            goodsList: []
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    created() {
        this.fetchGoodsMoreList()
    },
    methods: {
        to(path) {
            this.checkIsLogin() && this.$router.push(path)
        },
        toDetail(goodsId) {
            this.$router.push(`/detail?goodsId=${goodsId}`)
        },
        checkIsLogin() {
            if (!this.isLogin) {
                this.$modal({
                    showTitle: false,
                    content: '您还未登录或登录已过期，请重新登录'
                }).then(() => {
                    this.$router.push('/login')
                })
            }
            return this.isLogin
        },
        fetchGoodsMoreList() {
            const dto = new GetGoodsMoreDto()
            dto.maxLength = 10
            this.$api.goods.getMoreGoods(dto).then(res => {
                this.goodsList = res.moreGoodsList
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .other-section-item {
        box-sizing: border-box;
        width: 355px;
        padding: 0;
        margin-top: 15px;
        margin-left: 10px;
        background: #fff;
        border-radius: $--border-radius-lg;

        img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }

        .recommend-wrapper {
            width: 100%;

            img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
                border-radius: 8px;
            }
        }
    }
</style>

<style lang="scss">
    .other-section-item {
        .van-cell {
            align-items: center;
        }

        .other-section-item__recommend {
            align-items: flex-start;
            width: 100%;

            .recommend-wrapper {
                width: 298px;
                padding: 10px 0;
                overflow-x: scroll;
            }
        }
    }
</style>

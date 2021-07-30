<template>
    <div class="order-list">
        <div class="order-list__header">
            <van-tabs v-model="selectTab">
                <van-tab title="全部" />
                <van-tab title="待付款" />
                <van-tab title="待评价" />
            </van-tabs>
        </div>
        <div class="order-list__body">
            <keep-alive v-if="selectTab === 0">
                <all />
            </keep-alive>
            <keep-alive v-if="selectTab === 1">
                <to-pay />
            </keep-alive>
            <keep-alive v-if="selectTab === 2">
                <to-comment />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import All from '@/components/order-list/All'
import ToPay from '@/components/order-list/ToPay'
import ToComment from '@/components/order-list/ToComment'
export default {
    name: 'OrderList',
    components: {
        All,
        ToPay,
        ToComment
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            console.log(from.path)
            vm.isFromOrder = from.path === '/order'
        })
    },
    beforeRouteLeave(to, from, next) {
        // console.log(to, from, this.isFromOrder)
        // if (this.isFromOrder) {
        //     next('/')
        //     this.isFromOrder = false
        // } else {
        //     next()
        // }
        console.log(to.path, from.path)
        if (to.path === '/order') {
            next('/')
        } else {
            next()
        }
    },
    data() {
        return {
            selectTab: 0,
            isFromOrder: false
        }
    },
    watch: {
        selectTab() {
            this.$router.replace({
                query: { tab: this.selectTab }
            })
        }
    },
    created() {
        const { tab } = this.$route.query
        this.selectTab = tab ? parseInt(tab) : 0
        console.log(this.$router)
    }
}
</script>

<style scoped lang="scss">
.order-list {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 20px;

    &__header {
        flex-shrink: 0;
    }

    &__body {
        flex-grow: 2;
        overflow-y: auto;
    }
}
</style>

<style lang="scss">
.order-list {
    .van-tabs {
        z-index: 99;
        box-shadow: 0 2px 10px 4px rgba(114, 114, 114, 0.15);
    }

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
        color: $--main-color;
    }
}
</style>

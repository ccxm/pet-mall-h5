<template>
    <div class="tabbar">
        <template v-for="(item, index) in tabBar.list">
            <router-link
                :key="index"
                class="tabbar-item yx-center"
                :class="{'tabber-item--selected': selectedTabIndex === index}"
                :to="item.pagePath"
                tag="div"
                @click.native="select(index)"
            >
                <!--                <img :src="selectedIndex === index ? item.selectedIconPath : item.iconPath">-->
                <i class="iconfont" :class="[selectedTabIndex === index ? item.selectedClass : item.iconClass]" />
                <span :style="{color: selectedTabIndex === index ? tabBar.selectedColor : tabBar.color}">
                    {{ item.text }}
                </span>
            </router-link>
        </template>
    </div>
</template>

<script>
import { TAB_BAR_ROUTER_LIST } from '@/config/constant'
import { mapGetters } from 'vuex'

export default {
    name: 'Tabbar',
    data() {
        return {
            selectedIndex: 0,
            tabBar: {
                color: '#C0C4CC',
                selectedColor: '#fa436a',
                borderStyle: 'black',
                backgroundColor: '#ffffff',
                list: [{
                    pagePath: TAB_BAR_ROUTER_LIST.index,
                    iconClass: 'home',
                    selectedClass: 'home-selected',
                    // iconPath: require('@/assets/images/tabbar/tab-home.png'),
                    // selectedIconPath: require('@/assets/images/tabbar/tab-home-current.png'),
                    text: '首页'
                },
                {
                    pagePath: TAB_BAR_ROUTER_LIST.sort,
                    iconClass: 'sort',
                    selectedClass: 'sort-selected',
                    // iconPath: require('@/assets/images/tabbar/tab-cate.png'),
                    // selectedIconPath: require('@/assets/images/tabbar/tab-cate-current.png'),
                    text: '分类'
                },
                {
                    pagePath: TAB_BAR_ROUTER_LIST.cart,
                    iconClass: 'cart',
                    selectedClass: 'cart-selected',
                    // iconPath: require('@/assets/images/tabbar/tab-cart.png'),
                    // selectedIconPath: require('@/assets/images/tabbar/tab-cart-current.png'),
                    text: '购物车'
                },
                {
                    pagePath: TAB_BAR_ROUTER_LIST.user,
                    iconClass: 'my',
                    selectedClass: 'my-selected',
                    // iconPath: require('@/assets/images/tabbar/tab-my.png'),
                    // selectedIconPath: require('@/assets/images/tabbar/tab-my-current.png'),
                    text: '我的'
                }]
            }
        }
    },
    computed: {
        ...mapGetters(['selectedTabIndex'])
    },
    methods: {
        select(index) {
            this.$store.dispatch('app/setSelectedTabIndex', index)
        }
    }
}
</script>

<style scoped lang="scss">
.tabbar {
    display: flex;
    width: 100%;
    box-shadow: 0 3px 43px 0 rgba(114, 114, 114, 0.28);

    .tabbar-item {
        width: 25%;
        height: 50px;
        color: $--gray-4;

        img {
            width: 24px;
            height: 24px;
        }

        i {
            font-size: 24px;
        }

        span {
            font-size: 10px;
        }
    }

    .tabber-item--selected {
        color: $--main-color;
    }
}
</style>

<template>
    <div id="container" class="y-flex" :class="{'container--full': !showTabBar}">
        <nav-header v-if="showNavHeader" id="app-header" />
        <div id="app-body">
            <router-view />
        </div>
        <tabbar v-if="showTabBar" id="app-footer" />
    </div>
</template>

<script>
import Tabbar from '@/components/layout/Tabbar'
import NavHeader from '@/components/layout/NavHeader'
import { mapGetters } from 'vuex'
import TokenStore from '@/utils/TokenStore'

export default {
    name: 'App',
    components: {
        NavHeader,
        Tabbar
    },
    data() {
        return {
            message: 'Hello World'
        }
    },
    computed: {
        ...mapGetters(['showTabBar', 'showNavHeader'])
    },
    created() {
        this.$store.dispatch('app/showNavHeader')
        this.$store.dispatch('app/showTabBar')
        if (TokenStore.token) {
            this.$store.dispatch('user/saveUserInfo', TokenStore.getUserInfo())
            this.$store.dispatch('user/getBalance')
            this.$store.dispatch('user/updateCartLength')
            this.$store.dispatch('user/getGoodsLikeList')
        } else {
            this.$store.dispatch('user/saveUserInfo', null)
        }
    }
}
</script>

<style scoped lang="scss">
@import url("//at.alicdn.com/t/font_1541787_cb9wdm8ymd.css");
@import url("//at.alicdn.com/t/font_2636219_vaom7uu4jn.css");

#container {
    display: flex;
    width: 375px;
    height: calc(100vh - 50px);
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
    color: $--main-color;
}

.container--full {
    height: 100vh !important;
}

#app-body {
    flex-grow: 2;
    overflow-y: auto;
    background: $--background-color;
}

#app-header,
#app-footer {
    flex-shrink: 0;
}

#app-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    background: #fff;
}

h1 {
    font-size: 16px;
}
</style>

<template>
    <div class="nav-header xy-center">
        <div v-if="showNavLeft" class="nav-header__left xy-center">
            <van-icon name="arrow-left" color="#333" size="20" @click="back" />
            <span v-if="showLeftText">返回</span>
        </div>
        <div class="nav-header__center xy-center" :class="{'nav-header__center--retract': showNavLeft}">
            <span>{{ navBarTitle }}</span>
        </div>
        <div v-if="showRight" class="nav-header__right" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'NavHeader',
    props: {
        // showLeft: {
        //     type: Boolean,
        //     default: false
        // },
        showLeftText: {
            type: Boolean,
            default: false
        },
        showRight: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters(['showNavLeft', 'navBarTitle'])
    },
    methods: {
        back() {
            this.$router.back()
        }
    }
}
</script>

<style scoped lang="scss">
    .nav-header {
        justify-content: flex-start;
        height: 44px;
        padding: 0 10px;
        font-size: 16px;
        color: #fff;

        .nav-header__left {
            justify-content: flex-start;
            width: 70px;
        }

        .nav-header__center {
            flex: 2;
            font-weight: bold;
            color: #000;
            //margin-left: 70px;
        }

        .nav-header__center--retract {
            margin-left: -70px;
        }

        .nav-header__right {
            width: 70px;
        }
    }
</style>

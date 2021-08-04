<template>
    <div class="user-info y-center__between">
        <div class="user-info__left xy-center">
            <img v-if="isLogin" v-preview :src="userInfo.avatarUrl | addImagePrefix">
            <img v-else v-preview src="@/assets/images/user/default-photo.png">
            <div v-if="isLogin" class="yx-center">
                <span>{{ userInfo.nickName }}</span>
                <span>喵币：{{ (userInfo.balance || 0).toFixed(2) }}</span>
            </div>
            <div v-else class="yx-center">
                <span>Hi，游客~</span>
            </div>
        </div>
        <div class="user-info__right">
            <van-icon v-if="isLogin" name="arrow" size="20" @click="toInfo" />
            <div v-else class="yx-center">
                <van-button round class="user-info__login" @click="toLogin">登录/注册</van-button>
                <!--                <van-button v-else round class="user-info__login" @click="logout">退出登录</van-button>-->
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TokenStore from '@/utils/TokenStore'
import { resetState } from '@/store'

export default {
    name: 'UserInfo',
    computed: {
        ...mapGetters(['isLogin', 'userInfo'])
    },
    methods: {
        toLogin() {
            this.$router.push('/login')
        },
        toInfo() {
            this.$router.push('/personal-info')
        },
        logout() {
            TokenStore.deleteToken()
            resetState.call(this)
        }
    }
}
</script>

<style scoped lang="scss">
    .user-info {
        box-sizing: border-box;
        width: 100%;
        height: 130px;
        padding: 0 15px;
        color: #fff;
        background: linear-gradient(to right top, $--main-color, 50%, #ffad33);

        .user-info__left {
            img {
                width: 50px;
                height: 50px;
                border-radius: $--border-round;
            }

            div {
                margin-left: 10px;

                span {
                    &:nth-child(1) {
                        font-size: $--font-size-lg;
                        font-weight: $--font-weight-bold;
                    }

                    &:nth-child(2) {
                        display: inline-block;
                        padding: 2px 8px;
                        margin-top: 10px;
                        font-size: $--font-size-sm;
                        background: #fda980;
                        border-radius: 15px;
                    }
                }
            }
        }

        .user-info__right {
            .user-info__login {
                height: 30px;
                font-size: $--font-size-sm;
                line-height: 30px;
                color: #fff;
                background: #fda980;
                border: none;
            }
        }
    }
</style>

<template>
    <div class="personal-info">
        <van-cell-group>
            <van-cell title="邮箱" :value="userInfo.email" />
            <van-cell title="昵称" :value="userInfo.nickName" />
            <van-cell title="性别" :value="userInfo.gender ? '男' : '女'" />
            <van-cell v-if="userInfo.avatarUrl" title="头像">
                <div slot="default">
                    <img v-preview :src="userInfo.avatarUrl | addImagePrefix">
                </div>
            </van-cell>
        </van-cell-group>
        <van-cell-group class="personal-info__version">
            <van-cell title="版本" :value="version" />
        </van-cell-group>
        <van-button class="personal-info__logout" @click="logout">退出登录</van-button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CONFIG from '@/config'
import TokenStore from '@/utils/TokenStore'
import { resetState } from '@/store'
import { sleep } from '@/utils'

export default {
    name: 'PersonalInfo',
    data() {
        return {
            version: CONFIG.VERSION
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        async logout() {
            this.$tips.success('您已登出')
            await sleep(500)
            TokenStore.deleteToken()
            resetState.call(this)
            this.$router.back()
        }
    }
}
</script>

<style scoped lang="scss">
    .personal-info {
        margin-top: 5px;

        img {
            width: 25px;
            height: 25px;
        }

        &__version {
            margin-top: 10px;
        }

        &__logout {
            width: 100%;
            margin-top: 100px;
            color: $--main-color;
            border: 0;
        }
    }
</style>

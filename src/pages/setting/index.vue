<template>
    <div id="Setting">
        <p class="edit-info">修改个人信息</p>
        <van-form @submit="onSubmit">
            <van-field
                v-model="dto.nickName"
                name="昵称"
                label="昵称"
                placeholder="请输入昵称"
                :rules="[{ required: true }]"
            />
            <van-field name="radio" label="单选框" class="gender-wrapper">
                <template #input>
                    <van-radio-group v-model="dto.gender" direction="horizontal">
                        <van-radio :name="0" checked-color="#ff4e00">
                            <img src="@/assets/images/setting/man.png">
                        </van-radio>
                        <van-radio :name="1" checked-color="#ff4e00">
                            <img src="@/assets/images/setting/woman.png">
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field name="uploader" label="上传头像">
                <template #input>
                    <van-uploader v-model="dto.avatarUrl" :max-count="1" :before-read="beforeRead" />
                </template>
            </van-field>
            <div class="g-bottom-btn">
                <van-button round block type="info" native-type="submit" color="#ff4e00">更新</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addImagePrefix } from '@/plugins/modules/filters/filters'
import { UpdateUserInfoDto } from '@/api/user/dto'
import { sleep } from '@/utils'

export default {
    name: 'Setting',
    data() {
        return {
            dto: new UpdateUserInfoDto()
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    watch: {
        userInfo: {
            handler(obj) {
                this.dto = { ...obj }
                delete this.dto.cartLength
                this.dto.avatarUrl = [{ url: addImagePrefix(obj.avatarUrl) }]
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        onSubmit(values) {
            console.log('submit', values)
            if (!this.dto.avatarUrl.length) {
                this.$tips.info('请先上传头像')
                return
            }
            this.updateUserInfo()
        },
        async updateUserInfo() {
            const loadingInstance = this.$tips.loading('保存中')
            const dto = { ...this.dto }
            dto.avatarUrl = await this.uploadImage()
            this.$api.user.updateUserInfo(dto).then(async res => {
                loadingInstance.message = '更新成功'
                this.$store.dispatch('user/saveUserInfo', res)
                await sleep(500)
                this.$router.back()
            })
        },
        uploadImage() {
            return new Promise(resolve => {
                const file = this.dto.avatarUrl[0]
                if (file.file) {
                    this.$api.user.uploadImage(file.file).then(res => {
                        resolve(res.avatarUrl)
                    })
                } else {
                    resolve(file.url)
                }
            })
        },
        beforeRead(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$tips.info('上传图片只能是 JPG 或 PNG 格式!')
            }
            if (!isLt2M) {
                this.$tips.info('上传图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        }
    }
}
</script>

<style scoped lang="scss">
    #Setting {
        .edit-info {
            padding-left: 10px;
            margin-left: 15px;
            font-size: $--font-size-md;
            color: $--text-color;
            border-left: 3px solid #ccc;
            border-top-left-radius: $--border-radius-sm;
            border-bottom-left-radius: $--border-radius-sm;
        }

        .gender-wrapper {
            img {
                width: 20px;
                height: 20px;
                margin-right: 60px;
            }

            .van-radio__label {
                display: flex;
                align-items: center;
            }
        }
    }
</style>

<style lang="scss">
    #Setting {
        .gender-wrapper {
            .van-radio__label {
                display: flex;
                align-items: center;
            }
        }

        .van-uploader__preview-delete {
            background: $--main-color;
        }
    }
</style>

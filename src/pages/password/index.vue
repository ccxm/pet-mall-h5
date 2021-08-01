<template>
    <div id="Password">
        <template v-if="curStep === stepEnum.first">
            <div class="password-tip yx-center">
                <span>请验证身份</span>
            </div>
            <div class="password-email-wrapper g-card">
                <van-form ref="emailForm" label-width="1.2rem" class="y-center" @submit="sendVerifyCode">
                    <van-field
                        v-model="email"
                        name="邮箱"
                        label="邮箱"
                        placeholder="请输入邮箱"
                        :rules="[{ required: true, validator: checkIsEmail, message: '请输入正确的邮箱' }]"
                    >
                        <template #button>
                            <van-button
                                size="mini"
                                type="primary"
                                color="#ff3f3f"
                                native-type="button"
                                :class="{'g-disabled': startCount}"
                                @click.native="getVerifyCode"
                            >{{ startCount ? `${countdown}秒再次获取` : '发送验证码' }}</van-button>
                        </template>
                    </van-field>
                </van-form>
            </div>
            <div class="get-verify-btn xy-center">
                <van-button block type="primary" size="small" :class="{'g-disabled': !canNext}" @click.native="curStep = stepEnum.second">下一步</van-button>
            </div>
        </template>
        <template v-else>
            <div class="password-tip yx-center">
                <template v-if="curStep === stepEnum.second">
                    <span>请输入验证码</span>
                </template>
                <template v-if="curStep === stepEnum.third">
                    <span>设置密码</span>
                    <span>请输入新密码</span>
                </template>
                <template v-if="curStep === stepEnum.fourth">
                    <span>确认密码</span>
                    <span>请再次输入密码</span>
                </template>
            </div>
            <van-password-input
                class="password-input"
                :value="value"
                :focused="showKeyboard"
                :gutter="10"
                :mask="curStep !== stepEnum.second"
                @focus="showKeyboard = true"
            />
            <van-number-keyboard
                v-model="value"
                :show="showKeyboard"
                :hide-on-click-outside="false"
                @blur="showKeyboard = false"
            />
        </template>
    </div>
</template>

<script>
import { isEmail } from '@/utils/validate'
import { GetVerifyCodeDto } from '@/api/user/dto'
import { UpdatePayKeyDto } from '@/api/account/dto'

export default {
    name: 'Password',
    data() {
        const stepEnum = {
            first: 'getVerifyCode',
            second: 'inputVerifyCode',
            third: 'inputKey',
            fourth: 'confirmKey'
        }
        return {
            stepEnum,
            email: '',
            verifyCode: '',
            value: '',
            password: '',
            errorInfo: '',
            countdown: 59,
            startCount: false,
            showKeyboard: true,
            canNext: false, // 能否下一步
            curStep: stepEnum.first
        }
    },
    watch: {
        value(value) {
            if (value.length === 6) {
                if (this.curStep === this.stepEnum.second) {
                    this.verifyCode = value
                    this.value = ''
                    this.curStep = this.stepEnum.third
                    return
                }
                if (this.curStep === this.stepEnum.third) {
                    this.password = value
                    this.value = ''
                    this.curStep = this.stepEnum.fourth
                    return
                }
                if (this.curStep === this.curStep.fourth && this.password !== value) {
                    this.errorInfo = '两次密码不一致，请重新输入'
                    this.curStep = this.stepEnum.third
                    this.value = ''
                    this.password = ''
                    return
                }
                // 邮箱和密码都正确
                this.updatePayKey()
            }
        }
    },
    methods: {
        checkIsEmail(val) {
            return new Promise(resolve => {
                resolve(isEmail(val))
            })
        },
        getVerifyCode() {
            this.$refs.emailForm.submit()
        },
        sendVerifyCode() {
            const dto = new GetVerifyCodeDto()
            dto.email = this.email
            this.$api.user.getVerifyCode(dto).then(() => {
                this.canNext = true
                this.startCount = true
                this.startCountDown()
            })
        },
        startCountDown() {
            const timer = setInterval(() => {
                this.countdown--
                if (this.countdown === 0) {
                    clearInterval(timer)
                    this.startCount = false
                }
            }, 1000)
        },
        updatePayKey() {
            const dto = new UpdatePayKeyDto()
            dto.email = this.email
            dto.paykey = this.value
            dto.verifyCode = this.verifyCode
            this.$api.account.updatePaykey(dto).then(() => {
                setTimeout(() => {
                    this.$router.back()
                }, 500)
            }).catch(() => {
                this.value = ''
                this.curStep = this.stepEnum.second
            })
        }
    }
}
</script>

<style scoped lang="scss">
    #Password {
        color: $--text-color;

        .password-tip {
            height: 80px;
            margin-top: 80px;
            font-size: $--font-size-md;
            color: $--text-light-color;

            span {
                &:nth-child(1) {
                    display: inline-block;
                    padding: 10px 0;
                    font-size: $--font-size-lg;
                    font-weight: $--font-weight-bold;
                    color: $--text-color;
                }
            }
        }

        .password-email-wrapper {
            padding: 8px;
        }

        .get-verify-btn {
            width: 100%;
            margin-top: 250px;

            button {
                width: 100px;
                background: $--main-color;
                border-color: $--main-color;
                border-radius: $--border-radius-md;
            }
        }
    }
</style>

<style lang="scss">
    #Password {
        .password-input {
            justify-content: center;
            margin-top: 50px !important;

            .van-password-input__item {
                flex: unset !important;
                width: 40px !important;
                height: 40px !important;
                background: #eee;
                border-radius: $--border-radius-md;

                i {
                    background: #333;
                }
            }
        }
    }
</style>

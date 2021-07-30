<template>
    <div id="Login" class="g-bg-img yx-center">
        <div class="login-wrapper">
            <van-form ref="loginForm" class="login-form" @submit="onSubmit">
                <van-field
                    v-model="email"
                    name="邮箱"
                    label="邮箱"
                    placeholder="请输入邮箱"
                    :rules="[{ required: true, validator: checkIsEmail, message: '请输入正确的邮箱' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true,validator: checkIsPassword, message: '密码长度不小于6位' }]"
                />
                <van-field
                    v-if="!isLoginMode"
                    v-model="repeatPassword"
                    type="password"
                    name="请再次输入密码"
                    label="重复密码"
                    placeholder="请再次输入密码"
                    :rules="[{ required: true, validator: checkPasswordIsSame, message: '两次密码不一致' }]"
                />
                <div v-if="isLoginMode" class="forgot">
                    <span>忘记密码？</span>
                </div>
            </van-form>
        </div>
        <span class="login-tip" @click="isLoginMode = !isLoginMode">{{ isLoginMode ? '账号注册' : '已有账号？去登录' }}</span>
        <van-button round type="info" icon="down" class="login-button" @click="submitForm" />
    </div>
</template>

<script>
import { isEmail, isPassword } from '@/utils/validate'
import { loginDto, registerDto } from '@/api/user/dto'
import TokenStore from '@/utils/TokenStore'
import { resetState } from '@/store'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            repeatPassword: '',
            isLoginMode: true
        }
    },
    methods: {
        checkIsEmail(val) {
            return new Promise(resolve => {
                resolve(isEmail(val))
            })
        },
        checkIsPassword(val) {
            return new Promise(resolve => {
                resolve(isPassword(val))
            })
        },
        checkPasswordIsSame(val) {
            return new Promise(resolve => {
                resolve(val === this.password)
            })
        },
        changeMode() {
            this.isLoginMode = !this.isLoginMode
            this.$store.dispatch('app/setNavBarTitle', this.isLoginMode ? '登录' : '注册')
        },
        submitForm() {
            this.$refs.loginForm.submit()
        },
        onSubmit() {
            const dto = this.isLoginMode ? loginDto() : registerDto()
            dto.email = this.email
            dto.password = this.password
            if (!this.isLoginMode) {
                dto.verifyCode = '123456'
            }
            this.$api.user[this.isLoginMode ? 'login' : 'register'](dto).then(res => {
                this.success(res)
            })
        },
        async success(res) {
            if (!this.isLoginMode) {
                this.isLoginMode = true
                return
            }
            resetState.call(this)
            TokenStore.saveToken(res.token)
            // 获取账户余额
            this.$store.dispatch('user/saveUserInfo', res.userInfo)
            this.$store.dispatch('user/getBalance', res.userInfo)
            setTimeout(() => {
                this.$router.back()
            }, 2000)
        }
    }
}
</script>

<style scoped lang="scss">
    #Login {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        font-size: 12px;
        color: #fff;
        background: $--main-color;

        /* background-image: url("../../assets/images/login/login-bg.jpg"); */

        .login-wrapper {
            box-sizing: border-box;
            width: 313px;
            //height: 313px;
            padding: 40px 30px;
            background: #fff;
            border-radius: 16px;
        }

        .login-tip {
            margin-top: 30px;
            letter-spacing: 2px;
        }
    }
</style>

<style lang="scss">
    .login-form {
        .van-cell {
            display: flex;
            flex-direction: column;
            padding-bottom: 5px !important;
            margin-bottom: 25px;

            .van-field__label {
                margin-bottom: 20px;
                font-size: 12px;
                color: #788991;
            }

            .van-field__value {
                font-size: 16px;
                color: #333;
            }
        }

        .forgot {
            display: flex;
            justify-content: flex-end;
            margin-top: -15px;
            font-size: 12px;
            color: #9d9faf;
        }

        .van-field--error {
            .van-field__control::placeholder {
                color: #626262;
            }
        }
    }

    .login-button {
        padding: 0 0.6rem;
        margin-top: 25px;
        background: #fcc !important;
        border: none;

        .van-icon {
            transform: rotate(-90deg);
        }
    }
</style>

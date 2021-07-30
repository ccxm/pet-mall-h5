<template>
    <div v-if="value" class="modal xy-center">
        <div class="modal-content" :style="{ marginTop: `${-top}px`}">
            <div v-if="showTitle" class="modal-header xy-center">
                <span>{{ title }}</span>
                <van-icon v-if="showClose" name="cross" class="modal-header__close" @click="close" />
            </div>
            <div class="modal-body xy-center">
                <span v-if="!customContent">{{ content }}</span>
                <slot v-else />
            </div>
            <div v-if="showFooter" class="modal-footer">
                <button v-if="showCancel" :style="{ color: cancelColor }" @click="cancel">{{ cancelText }}</button>
                <button v-if="showConfirm" :style="{ color: confirmColor }" @click="confirm">{{ confirmText }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        title: {
            type: String,
            default: '标题'
        },
        value: {
            type: Boolean,
            default: true
        },
        content: {
            type: String,
            default: '您确定删除吗'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        showCancel: {
            type: Boolean,
            default: true
        },
        showConfirm: {
            type: Boolean,
            default: true
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        showFooter: {
            type: Boolean,
            default: true
        },
        showClose: {
            type: Boolean,
            default: false
        },
        cancelColor: {
            type: String,
            default: '#969799'
        },
        confirmColor: {
            type: String,
            default: '#1989fa'
        },
        customContent: {
            type: Boolean,
            default: false
        },
        top: {
            type: [Number, String],
            default: 100
        },
        // 是否抛出取消回调
        throwCancel: {
            type: Boolean,
            default: false
        },
        // 是否展示关闭前确认
        showBeforeClose: {
            type: Boolean,
            default: false
        }
    },
    beforeDestroy() {
        this.$el.parentNode.removeChild(this.$el)
    },
    methods: {
        confirm() {
            this.$emit('confirm')
            this.$emit('close')
        },
        cancel() {
            this.$emit('cancel')
            this.$emit('close')
        },
        close() {
            if (this.showBeforeClose) {
                this.beforeClose()
                return
            }
            this.$emit('close')
            this.$emit('input', false)
        },
        beforeClose() {
            this.$emit('before-close')
        }
    }
}
</script>

<style scoped lang="scss">
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        color: $--text-color;
        background: rgba(0, 0, 0, 0.4);

        .modal-content {
            box-sizing: border-box;
            width: 280px;
            padding-top: 15px;
            letter-spacing: 1px;
            background: #fff;
            border-radius: $--border-radius-lg;
        }

        .modal-header {
            position: relative;
            padding-top: 3px;
            padding-bottom: 10px;
            font-size: 20px;
            font-weight: $--font-weight-bold;
            color: $--text-color;

            .modal-header__close {
                position: absolute;
                top: -10px;
                left: 10px;
                font-size: 16px;
                font-weight: $--font-weight-bold;
            }
        }

        .modal-body {
            padding: 15px 0 30px;
            font-size: $--font-size-md;
            line-height: 22px;
        }

        .modal-footer {
            border-top: 1px solid #e7e7e7;

            button {
                position: relative;
                width: 50%;
                height: 50px;
                font-size: 17px;
                line-height: 50px;
                background: #fff;
                border: none;
                outline: none;

                &:nth-child(1) {
                    color: $--text-light-color;
                    border-bottom-left-radius: $--border-radius-lg;
                }

                &:nth-last-child(1) {
                    color: $--primary-color;
                    border-bottom-right-radius: $--border-radius-lg;
                }

                &:nth-child(2) {
                    &::after {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 1px;
                        height: 50px;
                        content: " ";
                        background: #e7e7e7;
                    }
                }
            }
        }
    }
</style>

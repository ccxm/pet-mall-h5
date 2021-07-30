<template>
    <div class="write-comment-item g-card">
        <order-item :info="info" :value="info.purchaseNum" :can-modify="false" />
        <div class="write-comment-item__rate yx-center">
            <van-rate
                v-model="rate"
                :size="25"
                gutter="8"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
            />
            <span>觉得宠物怎么样，打个分吧~</span>
        </div>
        <div class="write-comment-item__write">
            <van-field
                v-model="comment"
                rows="3"
                :error="isError"
                autosize
                type="textarea"
                maxlength="200"
                placeholder="说说你对宠物的看法吧~"
            />
            <van-uploader v-model="imgList" :before-read="beforeRead" />
        </div>
        <div class="write-comment-item__footer y-center__between">
            <van-checkbox v-model="isAnonymous" name="anonymous">匿名</van-checkbox>
            <span class="write-comment-item__footer-desc">公开头像和昵称</span>
        </div>
    </div>
</template>

<script>
import OrderItem from '@/components/common/OrderItem'
export default {
    name: 'WriteCommentItem',
    components: { OrderItem },
    props: {
        info: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            rate: 5,
            comment: '',
            goodsId: '',
            imgList: [],
            isAnonymous: false,
            isError: false
        }
    },
    watch: {
        comment(val) {
            val ? this.isError = false : undefined
        }
    },
    mounted() {
        this.goodsId = this.info.goodsId
    },
    methods: {
        validator() {
            if (!this.comment) {
                this.isError = true
                return false
            }
            return true
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

<style lang="scss">
    .write-comment-item {
        .order-item-wrapper {
            width: 100%;
            padding-top: 10px;
            margin: 0;
        }

        &__rate {
            width: 100%;
            padding: 10px 0;
            background: #fafafa;
            border-radius: $--border-radius-md;

            span {
                display: inline-block;
                margin-top: 10px;
                font-size: $--font-size-sm;
                color: $--text-light-color;
            }
        }

        &__write {
            .van-cell::after {
                border-bottom: none;

                .van-field__control {
                    color: $--text-color;
                }
            }

            .van-uploader {
                &__upload {
                    background: #fff;
                    border: 1px dashed #dcdee0;
                    border-radius: $--border-radius-md;

                    &-icon {
                        font-size: 30px;
                    }
                }

                &__preview-delete {
                    background: $--main-color;
                }
            }
        }

        &__footer {
            padding-top: 10px;
            margin-top: 10px;
            font-size: $--font-size-sm;
            color: $--text-color;
            border-top: 1px solid #f7f7f7;

            .van-checkbox {
                &__label {
                    line-height: unset;
                }

                &__icon--checked .van-icon {
                    color: #fff;
                    background-color: $--main-color;
                    border-color: $--main-color;
                }
            }

            &-desc {
                color: $--text-light-color;
            }
        }
    }
</style>

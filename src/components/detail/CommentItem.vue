<template>
    <div class="comment-item" :class="{'comment-item--small': isSmall }">
        <div class="comment-item__author y-center">
            <img v-preview :src="getAvatarUrl">
            <span>{{ getNickName }}</span>
            <img class="comment-item__author__vip" src="@/assets/images/detail/vip-new.png">
        </div>
        <div class="comment-item-body">
            <p class="comment-item-body__content">{{ info.list[0].comment }}</p>
            <div class="comment-item-body__imgs y-center__between">
                <template v-for="(img, index) in info.list[0].imgList">
                    <img :key="index" v-preview :src="img | addImagePrefix">
                </template>
            </div>
        </div>
        <div class="comment-item-footer y-center__between">
            <div class="comment-date">{{ info.list[0].createAt | beautifyTime }}</div>
            <div class="comment-star">
                <star
                    :goods-id="goodsId"
                    :like-num="info.list[0].likeNum"
                    :un-like-num="info.list[0].unLikeNum"
                    :comment-id="info.commentId"
                    :comment-list-id="info.list[0].commentListId"
                    @change="handleChange"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Star from '@/components/detail/Star'

import { addImagePrefix, formatNickName } from '@/plugins/modules/filters/filters'

export default {
    name: 'CommentItem',
    components: { Star },
    props: {
        isSmall: {
            type: Boolean,
            default: false
        },
        info: {
            type: Object,
            default: () => {}
        },
        goodsId: {
            type: String,
            default: ''
        }
    },
    computed: {
        getAvatarUrl() {
            if (!this.info.userInfo || !this.info.userInfo.avatarUrl || this.info.isAnonymous) {
                return require('@/assets/images/user/default-photo.png')
            }
            return addImagePrefix(this.info.userInfo.avatarUrl)
        },
        getNickName() {
            const nickName = (this.info.userInfo && this.info.userInfo.nickName) || ''
            return this.info.isAnonymous ? formatNickName(nickName) : nickName
        }
    },
    methods: {
        handleChange(res) {
            const { likeNum, unLikeNum } = res
            // 在子组件里修改父组件的值，这里不太合法
            /* eslint-disable */
            this.info.list[0].likeNum = likeNum
            this.info.list[0].unLikeNum = unLikeNum
            console.log(this.info)
        }
    }
}
</script>

<style scoped lang="scss">
    .comment-item {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 15px;
        font-size: $--font-size-sm;
        color: $--text-color;
        background: #fff;

        .comment-item__author {
            img {
                width: 35px;
                height: 35px;
                margin-right: 8px;
                border-radius: $--border-round;
            }

            span {
                font-size: $--font-size-md;
            }

            .comment-item__author__vip {
                width: 30px;
                height: 15px;
                margin-right: 0;
                margin-left: 8px;
                border-radius: 0;
            }
        }

        .comment-item-body {
            margin-top: 15px;
            font-size: $--font-size-md;
            line-height: 24px;

            .comment-item-body__imgs {
                flex-wrap: wrap;
                justify-content: flex-start;

                img {
                    width: 112px;
                    height: 112px;
                    margin-right: 3px;
                    margin-bottom: 8px;
                    border-radius: $--border-radius-sm;
                }
            }
        }

        .comment-item-footer {
            .comment-date {
                font-size: $--font-size-md;
                color: $--text-light-color;
            }
        }
    }

    .comment-item--small {
        padding: 10px 0;

        .comment-item-body {
            .comment-item-body__imgs {
                img {
                    width: 100px;
                    height: 100px;
                    margin-bottom: 4px;
                }
            }
        }
    }
</style>

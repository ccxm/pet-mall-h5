<template>
    <div class="star">
        <div @click="likeForComment(statusEnum.like)">
            <i v-if="likeStatus === statusEnum.unselected || likeStatus === statusEnum.unlike" class="iconfont icon-zan-up-0" />
            <img v-else-if="likeStatus === statusEnum.like" src="@/assets/images/detail/zan-up.svg">
            <span>{{ likeNum }}</span>
        </div>
        <div @click="likeForComment('UNLIKE')">
            <i v-if="likeStatus === statusEnum.unselected || likeStatus === statusEnum.like" class="iconfont icon-zan-down-0" />
            <img v-else-if="likeStatus === statusEnum.unlike" src="@/assets/images/detail/zan-down.svg">
            <span>{{ unLikeNum }}</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { LikeForCommentDto } from '@/api/comment/dto'

export default {
    name: 'Star',
    props: {
        likeNum: {
            type: Number,
            default: 0
        },
        unLikeNum: {
            type: Number,
            default: 0
        },
        goodsId: {
            type: String,
            default: ''
        },
        commentId: {
            type: String,
            default: ''
        },
        commentListId: {
            type: String,
            default: ''
        }
    },
    data() {
        const statusEnum = {
            like: 'LIKE',
            unlike: 'UNLIKE',
            unselected: 'UNSELECTED'
        }
        return {
            statusEnum,
            likeStatus: statusEnum.unselected,
            tempLikeNum: 0,
            tempUnLikeNum: 0,
            tempCommentLikeList: []
        }
    },
    computed: {
        ...mapGetters(['commentLikeList'])
    },
    watch: {
        commentLikeList: {
            handler() {
                this.checkIsLiked()
            },
            immediate: true
        }
    },
    created() {
        this.checkIsLiked()
    },
    methods: {
        likeForComment(status) {
            const dto = new LikeForCommentDto()
            dto.goodsId = this.goodsId
            dto.commentId = this.commentId
            dto.likeState = this.likeStatus = status
            dto.commentListId = this.commentListId
            this.$api.comment.likeForComment(dto).then(res => {
                this.$emit('change', {
                    likeNum: res.likeNum,
                    unLikeNum: res.unLikeNum
                })
                this.$store.dispatch('user/getCommentLikeList')
            }).catch(() => {
                this.likeStatus = 'UNSELECTED'
            })
        },
        // 检查是否已经点赞
        checkIsLiked() {
            const commentItem = this.commentLikeList.find(item => item.commentId === this.commentId)
            if (commentItem) {
                this.likeStatus = commentItem.likeState
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .star {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 120px;
        padding-bottom: 5px;
        margin-left: auto;
        border-radius: 20px;

        div {
            i {
                display: inline-block;
                width: 20px;
                height: 20px;
                font-size: 20px;
                color: #f40;
            }

            img {
                width: 20px;
                height: 20px;
                animation: rotate45 0.6s linear;
            }

            span {
                margin-left: 2px;
                font-size: 14px;
                color: #333;
            }

            &:nth-child(2) {
                display: flex;
                margin-left: 10px;

                i,
                img {
                    display: inline-block;
                    padding-top: 10px;
                }

                img {
                    animation: rotate-45 0.6s linear;
                }

                span {
                    display: inline-block;
                    margin-top: 10px;
                }
            }
        }
    }

    @keyframes rotate45 {
        0% {
            transform: rotate(0);
        }

        50% {
            transform: rotate(-45deg);
        }

        100% {
            transform: rotate(0);
        }
    }

    @keyframes rotate-45 {
        0% {
            transform: rotate(0);
        }

        50% {
            transform: rotate(45deg);
        }

        100% {
            transform: rotate(0);
        }
    }
</style>

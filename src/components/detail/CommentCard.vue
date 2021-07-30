<template>
    <div class="comment-card g-card">
        <div class="comment-card__header y-center__between">
            <span class="comment-amount">宝贝评价({{ total }})</span>
            <div class="view-more-comment y-center" @click="toCommentList">
                <span>查看更多</span>
                <van-icon name="arrow" />
            </div>
        </div>
        <comment-item v-if="commentInfo" :is-small="true" :info="commentInfo" :goods-id="goodsId" />
        <empty-data v-else :is-icon="true" name="empty-comment" label="暂无评论" color="#ccc" size="50" top="30" />
    </div>
</template>

<script>
import CommentItem from './CommentItem'
import { GetCommentDto } from '@/api/comment/dto'
import EmptyData from '@/components/common/EmptyData'

export default {
    name: 'CommentCard',
    components: { EmptyData, CommentItem },
    props: {
        goodsId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            total: 0,
            commentInfo: null
        }
    },
    created() {
        this.getFirstComment()
    },
    methods: {
        getFirstComment() {
            const dto = new GetCommentDto()
            dto.goodsId = this.goodsId
            dto.pageSize = 1
            dto.curPage = 0
            this.$api.comment.getCommentList(dto).then(res => {
                const { totalCommentNum, commentList } = res
                this.total = totalCommentNum
                this.commentInfo = commentList.length ? commentList[0] : null
            })
        },
        toCommentList() {
            this.$router.push(`/comment-list?id=${this.goodsId}`)
        }
    }
}
</script>

<style scoped lang="scss">
    .comment-card {
        .comment-card__header {
            margin-bottom: 10px;

            .comment-amount {
                font-size: $--font-size-lg;
                font-weight: $--font-weight-bold;
                color: $--text-color;
            }

            .view-more-comment {
                font-size: $--font-size-md;
                color: $--main-color;
            }
        }
    }
</style>

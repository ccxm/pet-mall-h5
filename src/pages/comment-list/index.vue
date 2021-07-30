<template>
    <scroll-view
        v-model="isLoading"
        class="comment-list"
        :is-pulling="isPulling"
        :disabled="listLength === listLength.length"
        height="100%"
        @pull-down="fetchCommentList(true)"
        @reach-bottom="fetchCommentList"
    >
        <template v-if="list.length">
            <comment-item
                v-for="(item, index) in list"
                :key="index"
                :goods-id="goodsId"
                :info="item"
            />
        </template>
        <empty-data v-else-if="isLoaded" :is-icon="true" name="empty-comment" label="暂无评论" color="#ccc" size="50" top="200" />
    </scroll-view>
</template>

<script>
import ScrollView from '@/components/common/ScrollView'
import CommentItem from '@/components/detail/CommentItem'
import EmptyData from '@/components/common/EmptyData'
import { GetCommentDto } from '@/api/comment/dto'
import { sleep } from '@/utils'

export default {
    name: 'CommentList',
    components: {
        ScrollView,
        CommentItem,
        EmptyData
    },
    data() {
        return {
            page: -1,
            list: [],
            isLoading: false,
            isPulling: false,
            listLength: 0,
            state: '',
            isLoaded: false,
            goodsId: ''
        }
    },
    created() {
        const { id } = this.$route.query
        if (id) {
            this.goodsId = id
            this.fetchCommentList(true)
            this.fetchCommentLikeList()
        }
    },
    methods: {
        fetchCommentList(isRefresh = false) {
            const dto = GetCommentDto()
            isRefresh ? this.isPulling = true : this.isLoading = true
            isRefresh ? this.page = 0 : this.page++
            dto.curPage = this.page
            dto.pageSize = 6
            dto.goodsId = this.goodsId
            this.$api.comment.getCommentList(dto).then(async res => {
                await sleep(500)
                this.list = isRefresh ? res.commentList : this.list.concat(res.commentList)
                this.listLength = res.totalCommentNum
            }).finally(() => {
                this.isLoading = false
                this.isPulling = false
                this.isLoaded = true
            })
        },
        fetchCommentLikeList() {
            this.$store.dispatch('user/getCommentLikeList')
        }
    }
}
</script>

<style scoped lang="scss">
    .comment-list {
        margin-top: 5px;
    }
</style>

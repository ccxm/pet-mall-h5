<template>
    <div class="write-comment">
        <write-comment-item v-for="item in goodsList" :key="item.goodsId" :info="item" />
        <van-button class="g-bottom-btn--square" @click="beforeSubmit">提交</van-button>
    </div>
</template>

<script>
import WriteCommentItem from '@/components/comment/WriteCommentItem'
import { GetOrderDto } from '@/api/order/dto'
import { CommentDto, CommentItemDto } from '@/api/comment/dto'
import { copyProperties, sleep } from '@/utils'

export default {
    name: 'WriteComment',
    components: { WriteCommentItem },
    data() {
        return {
            orderId: '',
            goodsList: []
        }
    },
    created() {
        this.orderId = this.$route.query.id
        if (this.orderId) {
            this.fetchOrder()
        }
    },
    mounted() {
        console.log(this.$children)
    },
    methods: {
        fetchOrder() {
            const dto = new GetOrderDto()
            dto.orderId = this.orderId
            this.$api.order.getOrder(dto).then(res => {
                this.goodsList = res.order.goodsList
            })
        },
        async beforeSubmit() {
            const passList = []
            const commentDto = new CommentDto()
            for (const child of this.$children) {
                passList.push(child.validator())
                const dto = new CommentItemDto()
                copyProperties(dto, child.$data)
                commentDto.commentList.push(dto)
            }
            if (!passList.every(isTrue => isTrue)) {
                this.$tips.info('请将表单填写完整')
                return
            }
            const loadingInstance = this.$tips.loading('保存中')
            await sleep(300)
            await this.uploadImage(commentDto)
            this.submit(commentDto, loadingInstance)
        },
        async submit(commentDto, loadingInstance) {
            commentDto.orderId = this.orderId
            for (const item of commentDto.commentList) {
                item.orderId = this.orderId
                await this.$api.comment.writeComment(item)
            }
            loadingInstance.icon = 'success'
            loadingInstance.message = '评论成功'
            await sleep(500)
            loadingInstance.close()
            this.$router.back()
        },
        uploadImage(commentDto = new CommentDto()) {
            const count = commentDto.commentList.reduce((sum, item) => {
                return (sum += item.imgList.length)
            }, 0)
            if (!count) {
                return
            }
            return new Promise(async resolve => {
                for (const commentItem of commentDto.commentList) {
                    const imgList = await Promise.all(commentItem.imgList.map(async file => {
                        const { avatarUrl } = await this.$api.comment.uploadImage(file.file)
                        return avatarUrl
                    }))
                    console.log(imgList)
                    commentItem.imgList = imgList
                }
                resolve()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .write-comment {
        padding-bottom: 60px;
        overflow-y: auto;
    }
</style>

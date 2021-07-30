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
            const loadingInstance = this.$tips.loading('上传图片中')
            await sleep(300)
            await this.uploadImage(commentDto)
            loadingInstance.message = '保存中'
            console.log(loadingInstance)
            this.submit(commentDto, loadingInstance)
        },
        async submit(commentDto, loadingInstance) {
            commentDto.orderId = this.orderId
            await this.$api.comment.writeComment(commentDto)
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
            let i = 0
            return new Promise(async resolve => {
                for (const commentItem of commentDto.commentList) {
                    commentItem.imgList = await Promise.all(commentItem.imgList.map(async file => {
                        const { url } = await this.$api.comment.uploadImage(file.file)
                        i++
                        if (i >= count) {
                            resolve()
                        }
                        console.log(url)
                        return url
                    }))
                }
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

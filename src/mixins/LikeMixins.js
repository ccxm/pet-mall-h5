import { LikeForGoodsDto } from '@/api/user/dto'
import { mapGetters } from 'vuex'

export default {
    name: 'LikeMixins',
    data() {
        return {
            likeList: []
        }
    },
    computed: {
        ...mapGetters(['goodsLikeList']),
        checkIsLike() {
            // 为了和详情区分开
            const goodsId = this.goodsInfo ? this.goodsInfo.goodsId : this.goodsDetail.goodsId
            return this.goodsLikeList.includes(goodsId)
        }
    },
    methods: {
        likeForGoods(goodsId) {
            const dto = new LikeForGoodsDto()
            dto.goodsId = goodsId
            this.$api.user.likeForGoods(dto).then(res => {
                console.log(this.info)
                if (this.info) {
                    this.info.likeNum = res.likeNum
                } else {
                    this.goodsDetail.likeNum = res.likeNum
                }
                this._updateLikeList(goodsId, res.likeState)
            })
        },
        // 更新点赞列表
        _updateLikeList(goodsId, likeState) {
            // if (likeState) {
            //     this.likeList.push(goodsId)
            // } else {
            //     this.likeList.splice(this.likeList.indexOf(goodsId))
            // }
            this.$store.dispatch('user/getGoodsLikeList')
        }
    }
}

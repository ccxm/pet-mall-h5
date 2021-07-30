import { getGoodsDto } from '@/api/goods/dto'

export default {
    name: 'FetchGoodsListMixins',
    data() {
        return {
            goodsList: [],
            page: -1,
            isLoading: false,
            isSelectedAll: false,
            isPulling: false,
            goodsLength: 0,
            dto: getGoodsDto()
        }
    },
    created() {
        this.fetchGoodsList(true)
    },
    methods: {
        fetchGoodsList(isRefresh = false) {
            isRefresh ? this.isPulling = true : this.isLoading = true
            isRefresh ? this.page = 0 : this.page++
            this.dto.currentPage = this.page
            this.$api.goods.getGoodsList(this.dto).then(async res => {
                this.goodsList = isRefresh ? res.goodsList : this.goodsList.concat(res.goodsList)
                this.goodsLength = res.count
            }).finally(() => {
                this.isLoading = false
                this.isPulling = false
            })
        },
        sortChange(res) {
            const { saleVolumeSort, priceSort } = res
            this.dto.priceSort = !priceSort ? null : priceSort
            this.dto.saleVolumeSort = !saleVolumeSort ? null : saleVolumeSort
            this.fetchGoodsList(true)
        }
    }
}

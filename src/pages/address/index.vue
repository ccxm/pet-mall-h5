<template>
    <div>
        <custom-address-edit
            class="edit-address"
            :area-list="areaList"
            :address-info="addressInfo"
            :show-delete="isUpdate"
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { AddressDto } from '@/api/address/dto'
import { copyProperties } from '@/utils'
import CustomAddressEdit from '@/components/address/CustomAddressEdit'

export default {
    name: 'Address',
    components: { CustomAddressEdit },
    data() {
        return {
            areaList,
            searchResult: [],
            addressInfo: new AddressDto(),
            isUpdate: false
        }
    },
    created() {
        const { isUpdate, id } = this.$route.query
        this.isUpdate = !!isUpdate
        if (isUpdate) {
            const target = this.$store.getters.addressList.find(item => item.addressId === id)
            this.addressInfo = target
        }
    },
    methods: {
        onSave(res) {
            copyProperties(this.addressInfo, res)
            this.submitAddress()
        },
        onDelete() {
            this.$modal({
                title: '温馨提示',
                content: '您确定删除该地址吗',
                confirmText: '删除',
                confirmColor: '#ee0a24'
            }).then(() => {
                this.deleteAddress()
            })
        },
        onChangeDetail(val) {
            console.log(this.addressInfo)
        },
        submitAddress() {
            this.$api.address[this.isUpdate ? 'updateAddress' : 'addAddress'](this.addressInfo).then(() => {
                this.addressInfo = new AddressDto()
                setTimeout(() => {
                    this.$router.back()
                }, 500)
            })
        },
        deleteAddress() {
            this.$api.address.deleteAddress(this.addressInfo.addressId).then(() => {
                setTimeout(() => {
                    this.$router.back()
                }, 500)
            })
        }
    }
}
</script>

<style lang="scss">
    .edit-address {
        .van-switch--on {
            background-color: $--main-color;
        }

        .van-address-edit__buttons {
            position: absolute;
            bottom: 0;
            width: 345px;
            padding-bottom: 10px;

            .van-button--danger {
                background: $--main-color;
                border-color: $--main-color;
            }
        }
    }
</style>

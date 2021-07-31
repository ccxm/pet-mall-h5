<template>
    <div class="address-list">
        <address-item v-for="(item, index) in addressList" :key="item.addressId" :is-edit="true" :info="item" :index="index" />
        <div class="g-bottom-btn">
            <van-button round block type="info" @click="toAdd">新增地址</van-button>
        </div>
    </div>
</template>

<script>
import AddressItem from '@/components/common/AddressItem'
import { mapGetters } from 'vuex'

export default {
    name: 'AddressList',
    components: { AddressItem },
    computed: {
        ...mapGetters(['addressList'])
    },
    created() {
        this.$store.dispatch('address/getAddressList', true)
    },
    methods: {
        toAdd() {
            this.$router.push('/address')
        }
    }
}
</script>

<style scoped lang="scss">
    .address-list {
        button {
            background: $--main-color;
            border-color: $--main-color;
        }
    }
</style>

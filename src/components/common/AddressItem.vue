<template>
    <div class="address x-flex" :class="{'g-disabled': disabled}" @click="select">
        <div class="address__left y-center">
            <van-icon name="location" size="20" />
        </div>
        <div class="address__center y-flex">
            <div>
                <span>{{ info.name }}</span>
                <span>{{ info.tel }}</span>
            </div>
            <span>{{ completeAddress }}</span>
        </div>
        <div class="address__right xy-center">
            <van-icon
                size="20"
                :name="isEdit ? 'edit' : 'arrow'"
                :color="isEdit ? '#ff0051' : '#969799'"
                @click.stop.native="toEditAddress"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddressItem',
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        info: {
            type: Object,
            default: () => {}
        },
        disabled: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number,
            default: 0
        }
    },
    computed: {
        completeAddress() {
            return this.info.province + this.info.city + this.info.county + this.info.addressDetail
        }
    },
    methods: {
        toEditAddress() {
            this.isEdit ? this.$router.push(`/address?isUpdate=true&id=${this.info.addressId}`) : this.$router.push('/address-list?from=order')
        },
        select() {
            if (this.isEdit && this.$route.query.from === 'order') {
                this.$store.dispatch('address/selectIndex', this.index)
                this.$router.back()
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .address {
        box-sizing: border-box;
        width: 355px;
        padding: 15px;
        margin-top: 15px;
        margin-left: 10px;
        background: #fff;
        border-radius: $--border-radius-lg;

        .address__left,
        .address__right {
            flex-shrink: 0;
            width: 40px;
        }

        .address__center {
            flex-grow: 2;
            font-size: $--font-size-md;
            color: $--text-color;

            div {
                margin-bottom: 5px;

                span {
                    &:nth-child(1) {
                        display: inline-block;
                        margin-right: 5px;
                        font-size: $--font-size-lg;
                        font-weight: $--font-weight-bold;
                    }

                    &:nth-child(2) {
                        font-size: $--font-size-sm;
                        color: $--text-light-color;
                    }
                }
            }
        }
    }
</style>

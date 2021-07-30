<template>
    <div>
        <user-info />
        <order-section />
        <other-section />
    </div>
</template>

<script>
import UserInfo from '@/components/user/UserInfo'
import OrderSection from '@/components/user/OrderSection'
import OtherSection from '@/components/user/OtherSection'

export default {
    name: 'User',
    components: { OtherSection, OrderSection, UserInfo }
}
</script>

<!--<style scoped>-->

<!--</style>-->

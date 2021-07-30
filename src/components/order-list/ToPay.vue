<script>
import BaseList from '@/components/order-list/BaseList'
import { PAYMENT_STATE } from '@/config/constant'

export default {
    name: 'ToPay',
    extends: BaseList,
    data() {
        return {
            state: PAYMENT_STATE.UNPAID.value
        }
    }
}
</script>

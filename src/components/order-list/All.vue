<script>
import BaseList from '@/components/order-list/BaseList'
import { PAYMENT_STATE } from '@/config/constant'

export default {
    name: 'All',
    extends: BaseList,
    data() {
        return {
            state: PAYMENT_STATE.ALL.value
        }
    }
}
</script>

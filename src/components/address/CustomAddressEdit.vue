<script>
import { AddressEdit } from 'vant'
export default {
    name: 'CustomAddressEdit',
    extends: AddressEdit,
    methods: {
        onDelete() {
            this.$emit('delete')
        }
    }
}
</script>


<script>
import { Uploader } from 'vant'
export default {
    name: 'CustomUpload',
    extends: Uploader,
    methods: {
        beforeRead(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$notify('上传头像图片只能是 JPG 或 PNG 格式!')
            }
            if (!isLt2M) {
                this.$notify('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        }
    }
}
</script>

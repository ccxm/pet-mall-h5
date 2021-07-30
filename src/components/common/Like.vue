<template>
    <div class="like-wrapper y-center" @click.stop="clickLike">
        <!--        <img-->
        <!--            :class="isLike ? 'enlarge' : 'diminish'"-->
        <!--            :src="require(`@/assets/svgs/like_${isLike ? 1 : 0}.svg`)"-->
        <!--        >-->
        <i class="iconfont" :class="[(isLike ? 'enlarge' : 'diminish'),(isLike ? 'like-selected' : 'like')]" />
        <template v-if="showLikeNum">
            <span class="like-wrapper-num">{{ likeNum | formatLikeNum }}</span>
            <span v-if="likeNum > 999" class="like-wrapper-num add">+</span>
        </template>
    </div>
</template>

<script>
export default {
    name: 'Like',
    props: {
        isLike: {
            type: Boolean,
            default: false
        },
        likeNum: {
            type: Number,
            default: 1
        },
        showLikeNum: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        clickLike() {
            this.$emit('like')
        }
    }
}
</script>

<style scoped lang="scss">
    .like-wrapper {
        display: flex;
        align-items: center;
        //height: 20px;
        //padding-top: 2px;
        font: 200 16px Source Han Sans CN, sans-serif;
        color: #888;

        i {
            font-size: 20px;
        }

        .diminish {
            animation: diminish 0.4s linear;
        }

        .enlarge {
            animation: enlarge 0.4s linear;
        }

        .add {
            margin-top: -8px;
        }

        .like-wrapper-num {
            margin-left: 5px;
        }
    }

    .like-selected {
        color: $--main-color;
    }

    // 变小
    @keyframes diminish {
        from {
            transform: scale(1);
        }

        to {
            transform: scale(0);
        }
    }

    @-webkit-keyframes diminish {
        from {
            transform: scale(1);
        }

        to {
            transform: scale(0);
        }
    }

    // 变大
    @keyframes enlarge {
        from {
            transform: scale(0);
        }

        to {
            transform: scale(1);
        }
    }

    @-webkit-keyframes enlarge {
        from {
            transform: scale(0);
        }

        to {
            transform: scale(1);
        }
    }

</style>

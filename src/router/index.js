import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: () => import('@/pages/index'),
            meta: {
                title: '首页',
                hideNavHeader: true
            }
        },
        {
            path: '/sort',
            name: 'Sort',
            component: () => import('@/pages/sort'),
            meta: {
                title: '分类'
            }
        },
        {
            path: '/cart',
            name: 'Cart',
            component: () => import('@/pages/cart'),
            meta: {
                title: '购物车'
            }
        },
        {
            path: '/user',
            name: 'User',
            component: () => import('@/pages/user'),
            meta: {
                title: '个人中心',
                hideNavHeader: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/login'),
            meta: {
                title: '登录',
                hideTabBar: true
            }
        },
        {
            path: '/detail',
            name: 'Detail',
            component: () => import('@/pages/detail'),
            meta: {
                title: '商品详情',
                hideTabBar: true,
                hideNavHeader: true
            }
        },
        {
            path: '/order',
            name: 'Order',
            component: () => import('@/pages/order'),
            meta: {
                title: '确认订单',
                hideTabBar: true,
                showNavLeft: true
            }
        },
        {
            path: '/address',
            name: 'Address',
            component: () => import('@/pages/address'),
            meta: {
                title: '编辑地址',
                hideTabBar: true,
                showNavLeft: true
            }
        },
        {
            path: '/address-list',
            name: 'AddressList',
            component: () => import('@/pages/address-list'),
            meta: {
                title: '地址列表',
                hideTabBar: true,
                showNavLeft: true
            }
        },
        {
            path: '/setting',
            name: 'Setting',
            component: () => import('@/pages/setting'),
            meta: {
                title: '设置',
                hideTabBar: true,
                showNavLeft: true
            }
        },
        {
            path: '/password',
            name: 'Password',
            component: () => import('@/pages/password'),
            meta: {
                title: '设置支付密码',
                hideTabBar: true,
                showNavLeft: true
            }
        },
        {
            path: '/order-list',
            name: 'OrderList',
            component: () => import('@/pages/order-list'),
            meta: {
                title: '订单列表',
                hideTabBar: true,
                showNavLeft: true
            }
        },
        {
            path: '/write-comment',
            name: 'WriteComment',
            component: () => import('@/pages/write-comment'),
            meta: {
                title: '写评论',
                hideTabBar: true,
                showNavHeader: false,
                showNavLeft: true
            }
        },
        {
            path: '/comment-list',
            name: 'CommentList',
            component: () => import('@/pages/comment-list'),
            meta: {
                title: '评论列表',
                hideTabBar: true,
                showNavHeader: false,
                showNavLeft: true
            }
        },
        {
            path: '/personal-info',
            name: 'PersonalInfo',
            component: () => import('@/pages/personal-info'),
            meta: {
                title: '个人信息',
                hideTabBar: true,
                showNavHeader: false,
                showNavLeft: true
            }
        }
    ]
})

router.afterEach((to) => {
    document.title = to.meta.title
    // 隐藏tabBar
    if (to.meta.hideTabBar) {
        store.dispatch('app/hideTabBar')
    } else {
        store.dispatch('app/showTabBar')
    }
    if (to.meta.hideNavHeader) {
        store.dispatch('app/hideNavHeader')
    } else {
        store.dispatch('app/showNavHeader')
    }
    if (to.meta.showNavLeft) {
        store.dispatch('app/showNavLeft')
    } else {
        store.dispatch('app/hideNavLeft')
    }
    store.dispatch('app/setNavBarTitle', to.meta.title)
})

export default router

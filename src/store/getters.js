const getters = {
    showNavHeader: state => state.app.showNavHeader,
    showNavLeft: state => state.app.showNavLeft,
    showTabBar: state => state.app.showTabBar,
    curRouter: state => state.app.curRouter,
    navBarTitle: state => state.app.navBarTitle,
    selectedTabIndex: state => state.app.selectedTabIndex,
    isLogin: state => {
        return Object.keys(state.user.userInfo).length > 0
    },
    userInfo: state => state.user.userInfo,
    cartLength: state => state.user.userInfo && state.user.userInfo.cartLength,
    addressList: state => state.address.addressList,
    selectedAddressIndex: state => state.address.selectedAddressIndex,
    purchaseList: state => state.goods.purchaseList,
    commentLikeList: state => state.user.commentLikeList,
    goodsLikeList: state => state.user.goodsLikeList
}

export default getters

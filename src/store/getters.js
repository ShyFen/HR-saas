const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    name: state => state.user.userInfo.username, //用户名
    userId: state => state.user.userInfo.userInfo,
    staffPhoto: state => state.user.userInfo.staffPhoto
}
export default getters
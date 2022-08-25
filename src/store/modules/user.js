import { getToken, setToken, removeToken } from "@/utils/auth.js"

const state = {
    token: getToken(), //初始化vuex时，从缓存中读取
};
const mutations = {
    setToken(state, token) {
        state.token = token // 设置token
            // vuex变化 => 缓存数据
        setToken(token) // vuex和 缓存数据的同步
    },
    // 删除缓存
    removeToken(state) {
        state.token = null // 删除vuex的token
        removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
    }
};
const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
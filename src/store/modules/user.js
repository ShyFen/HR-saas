import { getToken, setToken, removeToken, getTimeKey, setTimeKey } from "@/utils/auth.js"
import { login, getUserInfo, getUserPhoto } from '@/api/user'

const state = {
    token: getToken(), //初始化vuex时，从缓存中读取
    userInfo: {},
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
    },
    // 设置用户信息
    setUserInfo(state, user) {
        state.userInfo = user;
    },
    // 删除用户信息
    removeUserInfo(state) {
        state.userInfo = {};
    }
};
const actions = {
    async login(context, data) {
        const res = await login(data);
        context.commit("setToken", res);
        // 登录成功，使用时间戳
        setTimeKey() //设置时间戳
    },
    async getUserInfo(context) {
        // 用户基本信息
        const res = await getUserInfo();
        // 用户详情信息
        const userPhoto = await getUserPhoto(res.userId);
        const userObj = {...res, ...userPhoto };
        context.commit("setUserInfo", userObj);

    },
    loginOut(context) {
        // 删除token
        context.commit("removeToken");
        // 删除用户信息
        context.commit("removeUserInfo")
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
import axios from 'axios';
import { Message } from "element-ui"
import store from "@/store"
import router from "@/router/index"
import { getTimeKey } from "@/utils/auth"

// 超时时间
const TimeOut = 10000000
    // 判断超时时间
function isTimeOut() {
    let newTime = Date.now()
    let oldTime = getTimeKey();
    // true表示过期
    return (newTime - oldTime) / 1000 > TimeOut

}

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            if (isTimeOut()) {
                // 删除touken
                store.dispatch("user/loginOut")
                router.push("login")
                return Promise.reject(error)
            }
            config.headers["Authorization"] = `Bearer ${store.getters.token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.success) {
            return res.data;
        } else {
            Message.error(res.message)
            return Promise.reject(new Error(res.message))
        }


    },
    error => {
        if (error.response && error.response.data && error.response.data.code === 10002) {
            // 表示后端token超时了
            store.dispatch("user/loginOut")
            router.push("/login")
        }
        return Promise.reject(error)
    }
)

export default service
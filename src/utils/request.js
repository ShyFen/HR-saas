import axios from 'axios';
import { Message } from "element-ui"
import store from "@/store"

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
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
        return Promise.reject(error)
    }
)

export default service
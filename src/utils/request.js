import axios from 'axios';
import { Message } from "request"

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(
    config => {

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
        return res.success ? res.data : Promise.reject(new Error(Message.error(res.message)))

    },
    error => {
        return Promise.reject(error)
    }
)

export default service
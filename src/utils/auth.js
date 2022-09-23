import Cookies from 'js-cookie'

const TokenKey = 'user-token'
const timeKey = "time-key" //时间戳，用于验证用户登录的时间长度，看是否需要删除token

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

// 获取时间戳
export function getTimeKey() {
    return Cookies.get(timeKey)
}

// 读取时间戳
export function setTimeKey() {
    Cookies.set(timeKey, Date.now())
}
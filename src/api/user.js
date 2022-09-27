import request from '@/utils/request'

// 登录接口
export function login(data) {
    // 返回一个promise对象
    return request({
        url: "/sys/login",
        method: "POST",
        data
    })
}

// 获取用户基本信息
export function getUserInfo(token) {
    return request({
        url: "/sys/profile",
        method: "post",

    })
}

// 获取用户头像，根据用户id
export function getUserPhoto(id) {
    return request({
        url: `/sys/user/${id}`,
    })
}

export function logout() {}
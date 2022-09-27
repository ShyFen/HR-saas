import request from "@/utils/request"

export function getEmployees() {
    return request({
        url: "/sys/user/simple"
    })
}
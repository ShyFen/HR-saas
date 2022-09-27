import request from '@/utils/request'

// 获取组织架构信息
export function getDepartments() {
    return request({
        url: "/company/department",
    })
}

// 新增部门
export function addDepartments(data) {
    return request({
        method: "post",
        url: " /company/department",
        data
    })
}

// 删除部门
export function delDepartments(id) {
    return request({
        method: "delete",
        url: `/company/department/${id}`
    })
}
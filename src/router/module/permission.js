// 员工的路由规则
import Layout from "@/layout"

export default {
    path: "/permission",
    name: "permission", //权限可以用到
    component: Layout,
    children: [{
        path: "",
        component: () =>
            import ("@/views/permission"),
        meta: {
            title: "权限管理"
        }
    }]
}
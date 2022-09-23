// 员工的路由规则
import Layout from "@/layout"

export default {
    path: "/social",
    name: "social", //权限可以用到
    component: Layout,
    children: [{
        path: "",
        component: () =>
            import ("@/views/social"),
        meta: {
            title: "社保"
        }
    }]
}
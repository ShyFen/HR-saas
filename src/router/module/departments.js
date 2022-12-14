// 员工的路由规则
import Layout from "@/layout"

export default {
    path: "/departments",
    name: "departments", //权限可以用到
    component: Layout,
    children: [{
        path: "",
        component: () =>
            import ("@/views/departments"),
        meta: {
            title: "组织架构",
            icon: "tree"
        }
    }]
}
// 员工的路由规则
import Layout from "@/layout"

export default {
    path: "/salarys",
    name: "salarys", //权限可以用到
    component: Layout,
    children: [{
        path: "",
        component: () =>
            import ("@/views/salarys"),
        meta: {
            title: "工资"
        }
    }]
}
// 员工的路由规则
import Layout from "@/layout"

export default {
    path: "/attendances",
    name: "attendances", //权限可以用到
    component: Layout,
    children: [{
        path: "",
        component: () =>
            import ("@/views/attendances"),
        meta: {
            title: "考勤"
        }
    }]
}
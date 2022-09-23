// 员工的路由规则
import Layout from "@/layout"

export default {
    path: "/approvals",
    name: "approvals", //权限可以用到
    component: Layout,
    children: [{
        path: "",
        component: () =>
            import ("@/views/approvals"),
        meta: {
            title: "审批",
            icon: "tree-table"
        }
    }]
}
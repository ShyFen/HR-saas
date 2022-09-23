import Vue from 'vue'
import Router from 'vue-router'

import approvalsRouter from './module/approvals'
import departmentsRouter from './module/departments'
import employeesRouter from './module/employees'
import permissionRouter from './module/permission'
import attendancesRouter from './module/attendances'
import salarysRouter from './module/salarys'
import settingRouter from './module/setting'
import socialRouter from './module/social'

Vue.use(Router)

import Layout from '@/layout'

// 静态路由
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

// 定义一个动态路由
const asyncRouter = [
    approvalsRouter,
    departmentsRouter,
    employeesRouter,
    permissionRouter,
    attendancesRouter,
    salarysRouter,
    settingRouter,
    socialRouter
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    // 将静态路由和动态路由合并
    routes: [...constantRoutes, ...asyncRouter]
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
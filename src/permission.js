import router from "@/router"
import store from "@/store"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

// 不受token的限制
const whiteList = ["/login", "/404"]

// 路由的前置守卫
router.beforeEach(async(to, from, next) => {
    nprogress.start() //开启进度条
    if (store.state.user.token) {
        console.log("store.getters.token:", store.state.user.token)
        if (to.path === "/login") {
            next("/") //跳转到主页
        } else {
            if (!store.getters.userId) {
                await store.dispatch("user/getUserInfo")
            }
            next() //放过
        }
    } else {
        if (whiteList.indexOf(to.path) > -1) {
            // 在白名单
            next()
        } else {
            // 不在白名单，也没有token
            next("/login")
        }
    }
    nprogress.done()
})

// 路由的后置守卫
router.afterEach(() => {
    nprogress.done() //关闭进度条
})
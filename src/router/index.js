import Vue from 'vue'
import VueRouter from 'vue-router'
import loginVue from '../views/login/login'
import homeVue from '../views/home/home'

Vue.use(VueRouter)

// 登录模块
const login = {
    path:'/login',
    name:'Login',
    component: loginVue
}

const defaultPath={
    path: '/',
    components: {
        default: () => import('@/views/login/login.vue')
    }
}
const home = {
    path:'/home',
    name:'home',
    component:homeVue
}
const routes=[
    login,
    defaultPath,
    home
]

const router = new VueRouter({
    routes:routes
})



export default router

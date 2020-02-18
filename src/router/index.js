import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Log from '@/views/Log'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/log', component: Log }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/home/index.vue'
import AdminPages from '../pages/admin/index.vue'
import Login from '../pages/login/index.vue'
import About from '../pages/about/index.vue'
import Event from '../components/searchEvent/SearchEvent.vue'

import { userKey } from '@/global'

Vue.use(VueRouter)


const routes = [{
    name: 'home',
    path: '/',
    component: Home
},
 {
     name: 'adminPages',
     path: '/admin',
     component: AdminPages,
 },
 {
    name: 'login',
    path: '/login',
    component: Login
},
{
    name: 'about',
    path: '/about',
    component: About
},
{
    name: 'Event',
    path: '/event',
    component: Event
},

]




const router = new VueRouter({
    mode: 'history',
    routes    
})

router.beforeEach((to, from, next) => { // permite que um usuario que n seja adm visualize a tela
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresLogin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' }) // valida se ele admin ou nao se n for volta para o home
    } else {
        next()
    } // representa cada rotas
}) // recebe varios parametros

export default router
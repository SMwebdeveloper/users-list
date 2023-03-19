import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

// Pages
import Home from "@/pages/Home.vue"
import NotFound from "@/pages/404.vue"
import Users from '@/pages/Users.vue'

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'home',
            component:Home
        },
        {
            path:'/users',
            name:'users',
            component:Users
        },
        {
            path:'*',
            name:'notFound',
            component:NotFound
        }
    ]
})
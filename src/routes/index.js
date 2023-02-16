import { createRouter, createWebHistory } from 'vue-router'


const routes = [
        {
        path: '/login',
        name: 'login-component',
        component: () => import("../views/auth/Login.vue"),
    },
    {
        path: '/register',
        name: 'register-component',
        component: () => import("../views/auth/Register.vue"),
    },
    {
        path: '/',
        name: 'dashboard-component',
        component: () => import("../views/pages/movie/Dashboard.vue"),
    },
    {
        path: '/admin',
        name: 'admin-component',
        component: () => import("../views/pages/cms/Admin.vue"),
    },
    {
        path: '/edit-movie/:Pid',
        name: 'edit-movie-component',
        component: () => import("../views/pages/cms/EditMovie.vue"),
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

// 是否为hash路由
const history = import.meta.env.VITE_HASH_ROUTER === "true" ? createWebHistory : createWebHashHistory;

export const router = createRouter({
    history: history(),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/user/login/index.vue'),
        },
    ],
})

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Chats',
        component: () => import('../views/Chats')
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/Settings')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;

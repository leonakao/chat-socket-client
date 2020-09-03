import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/settings'
    },
    {
        path: '/view',
        name: 'View',
        component: () => import('../layouts/View'),
        children: [
            {
                path: 'user',
                name: 'UserView',
                component: () => import('../views/User')
            },
            {
                path: 'rest',
                name: 'RestView',
                component: () => import('../views/Rest')
            },
            {
                path: 'moto',
                name: 'MotoView',
                component: () => import('../views/Moto')
            },
            {
                path: 'supt',
                name: 'SuptView',
                component: () => import('../views/Supt')
            },
        ]
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

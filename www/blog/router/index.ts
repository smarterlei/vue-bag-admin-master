const routes = [
    {
        path: '/',
        name: 'web',
        component: () => import('@/bag-web/layout/Index.vue'),
        redirect: 'home',
        children: [
            {
                path: '/home', name: 'home', meta: { title: '首页' },
                component: () => import('@/bag-web/views/home/Index.vue'),
            },
           
        ],
    },
 
];

export default routes;

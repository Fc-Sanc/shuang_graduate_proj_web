const routes = [

    // 默认主页
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {path: '', component: () => import('pages/common/Index.vue')},
        ]
    },

    {
        path: '/candidate',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {path: '', component: () => import('pages/common/Index.vue')},
            {path: '/candidate/post_page', component: () => import('pages/candidate/PostPage.vue')},
            {path: '/candidate/register', component: () => import('pages/candidate/RegisterPage.vue')},
            {path: '/candidate/login', component: () => import('pages/candidate/LoginPage.vue')},
            {path: '/candidate/account', component: () => import('pages/candidate/CandidateAccountPage.vue')},
            {path: '/candidate/resume', component: () => import('pages/candidate/ResumePage.vue')},
            {path: '/candidate/chat', component: () => import('pages/common/ChatterPage.vue')},
            {path: '/candidate/offer', component: () => import('pages/candidate/CandidateOfferPage.vue')},
        ]
    },

    {
        path: '*',
        component: () => import('pages/common/Error404.vue')
    }
]

export default routes

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {path: 'post_page', component: () => import('pages/PostPage.vue')}
    ]
  }, {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/LoginPage')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

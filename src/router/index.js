import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/edit/:id(step[1-6])',
    name: 'edit',
    component: () => import('../views/EditView.vue')
  },
  {
    path: '/showResume',
    name: 'showResume',
    component: () => import('../views/ShowResumeView.vue'),
    children: [
      {
        path: ':id',
        component: () => import('../views/ShowResumeView.vue')
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

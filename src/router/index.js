import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

/**
 * github访问速度慢，按需加载可能会出现延迟所以不采用
 */
import Home from '../views/HomeView.vue'
import EditView from '../views/EditView.vue'
import ShowResumeView from '../views/ShowResumeView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    // component: () => import('../views/HomeView.vue')
    component: Home
  },
  {
    path: '/edit/:id(step[1-6])',
    name: 'edit',
    // component: () => import('../views/EditView.vue')
    component: EditView
  },
  {
    path: '/showResume',
    name: 'showResume',
    // component: () => import('../views/ShowResumeView.vue'),
    component: ShowResumeView,
    children: [
      {
        path: ':id',
        // component: () => import('../views/ShowResumeView.vue')
        component: ShowResumeView
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    // component: () => import('../views/NotFoundView.vue')
    component: NotFoundView
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory('/create-resume/'),
  routes
})

router.beforeEach((to, from, next) => {
  const { state } = store

  const res = /\/edit\/step[2-6]/
  // encryptData
  if (!state.step1Data.name || !state.step1Data.sex) {
    if (res.test(to.path)) {
      next('/edit/step1')
    } else if (to.path.indexOf('/showResume') >= 0) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

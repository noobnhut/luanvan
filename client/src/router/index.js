import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
      path: '/',
      name: 'login',
     component: () => import('../views/login.vue')
    },
    {
      path: '/home',
      name: 'home',
     component: () => import('../views/home.vue')
    },
    {
      path: '/register',
      name: 'register',
     component: () => import('../views/register.vue')
    },
    {
      path: '/messenger',
      name: 'messenger',
     component: () => import('../views/messenger.vue')
    },
    {
      path: '/information',
      name: 'information',
     component: () => import('../views/information.vue')
    },

  ]
})

export default router;

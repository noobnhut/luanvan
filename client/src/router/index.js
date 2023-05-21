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
      path: '/admin',
      name: 'loginadmin',
     component: () => import('../views/loginadmin.vue')
    },
    {
      path: '/adminlogin',
      name: 'admin',
      component: () => import('../views/admin.vue'),
      children:[
        {
          path: 'category',
          name:'category',
          component:()=>import('../pages/admin/category.vue')
        },
        {
          path: 'user',
          name:'user',
          component:()=>import('../pages/admin/user.vue')
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue'),
      children:[
      {
        path: 'donate',
        name:'donate',
        component:()=>import('../pages/home/donate.vue')
      },
      {
        path: '',
        name:'home',
        component:()=>import('../pages/home/homepost.vue')
      },
      {
        path: 'buy',
        name:'buy',
        component:()=>import('../pages/home/buy.vue')
      },
      {
        path: 'trade',
        name:'trade',
        component:()=>import('../pages/home/trade.vue')
      },
      {
        path: 'search',
        name:'search',
        component:()=>import('../pages/home/search.vue')
      }
    ]
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
      path: '/information/:name/:id',
      name: 'information',
     component: () => import('../views/information.vue'),
    
    },
    {
      path: '/detailpost/:name/:id',
      name: 'detailpost',
     component: () => import('../views/detailpost.vue')
    },
    

  ]
})

export default router;

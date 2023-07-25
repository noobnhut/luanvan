import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/map.vue')
    },
    //Đăng kí
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/login.vue')
    },

    // Đăng nhập
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/register.vue')
    },

    // Trang chủ
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../pages/home/homepost.vue') // thành phần hiển thị tại  /home
        },
        {
          path: 'donate', // trao tặng
          name: 'donate',
          component: () => import('../pages/home/donate.vue')
        },
        {
          path: 'trade', // trao tặng
          name: 'trade',
          component: () => import('../pages/home/trade.vue')
        },
        {
          path: 'search', // tìm mua
          name: 'search',
          component: () => import('../pages/home/search.vue')
        },
      ]
    },

    // trang thông tin cá nhân
    {
      path: '/information/:name/:id',
      name: 'information',
      component: () => import('../views/information.vue'),

    },

    //chi tiết bài đăng
    {
      path: '/detailpost/:name/:id',
      name: 'detailpost',
      component: () => import('../views/detailpost.vue')
    },
    {
      path: '/searchview',
      name: 'searchview',
      component: () => import('../views/search.vue'),
      props: (route) => ({ data: JSON.parse(decodeURIComponent(route.query.data)) })
    },
    //admin page
    {
      path: '/admin',
      name: 'loginadmin',
      component: () => import('../views/auth/loginadmin.vue')
    },

    {
      path: '/adminlogin',
      name: 'admin',
      component: () => import('../views/admin.vue'),
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import('../components/admin/banner.vue')
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('../pages/admin/category.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../pages/admin/user.vue')
        },
        {
          path: 'post',
          name: 'post',
          component: () => import('../pages/admin/post.vue')
        },
        {
          path: 'report',
          name: 'report',
          component: () => import('../pages/admin/report.vue')
        },
        {
          path: 'statistical',
          name: 'statistical',
          component: () => import('../pages/admin/statistical.vue')
        }
      ]
    },


  ]
})

export default router;

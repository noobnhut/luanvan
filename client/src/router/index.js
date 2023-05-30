import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //Đăng kí
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login.vue')
    },

    // Đăng nhập
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue')
    },

    // Trang chủ
    {
      path: '/home',
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
          path: 'buy', // mua bán
          name: 'buy',
          component: () => import('../pages/home/buy.vue')
        },
        {
          path: 'trade', //trao đổi
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

    // giao diện kết quả tìm kiếm
    {
      path: '/searchview',
      name: 'searchview',
      component: () => import('../views/searchview.vue')
    },

    // ứng dụng chat
    {
      path: '/messenger',
      name: 'messenger',
      component: () => import('../views/messenger.vue'),
      children: [
        {
          path: 'chat/:id_user/:id_room',
          name: 'chat',
          component: () => import('../pages/messenger/chatcenter.vue')
        }
      ]
    },


    //admin page
    {
      path: '/admin',
      name: 'loginadmin',
      component: () => import('../views/loginadmin.vue')
    },

    {
      path: '/adminlogin',
      name: 'admin',
      component: () => import('../views/admin.vue'),
      children: [
        {
          path: 'category',
          name: 'category',
          component: () => import('../pages/admin/category.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../pages/admin/user.vue')
        }
      ]
    },


  ]
})

export default router;

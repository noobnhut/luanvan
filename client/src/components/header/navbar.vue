<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto  flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
      <a class="cursor-pointer" @click="gotoHome()">
        <h2 class="logo text-xl font-bold text-gray-900">404Social</h2>
      </a>
      <div class="search-bar flex items-center bg-gray-100 md:w-92">
        <i class="uil uil-search text-gray-600 mx-2"></i>
        <input type="search" class="bg-transparent text-sm rounded-md px-4 py-3 pr-10 focus:outline-none w-full md:w-72"
          placeholder="Tìm kiếm" @click="openSearch()" readonly />
      </div>
      <div class="flex  items-center" >
        <button v-if="checkLogin"
          class="bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white font-bold py-2 px-4 rounded flex-shrink-0 mx-2 lg:flex items-center hidden "
          @click="onShow"  >
          <i class=" uil-plus-square  lg:text-3xl md:text-xl"></i>
          <p class="px-2">Tạo bài đăng</p>
        </button>

        <div class="profile-pic ml-2" v-if="checkLogin" >
          <img :src="user.avatar" alt="pic 1" class="rounded-full w-10 h-10 object-cover cursor-pointer"
            @click="opendropdown"/>
          <div id="dropdownHover"  
            class="z-10 absolute bg-white divide-y divide-gray-100 mt-1 ml-1 rounded-lg shadow w-50  dark:bg-gray-700"
            :class="{ hidden: hidden }">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
              <li class="py-2 px-1 flex items-center  hover:bg-gray-100">
                <i class=" text-violet-500 uil-chat-bubble-user md:text-xl"></i>
                <a @click="goIn4" class="block  px-4 py-2  ">Thông tin khách
                  hàng</a>
              </li>
              <li class="py-2 px-1  flex items-center hover:bg-gray-100">
                <i class=" text-violet-500  uil-keyhole-square md:text-xl"></i>
                <a class="block px-4 py-2  " @click="onShowChange">Thay đổi mật
                  khẩu</a>
              </li>
              <li class="py-2 px-1  flex items-center hover:bg-gray-100" @click="outWeb">
                <i class=" text-violet-500 uil-exit md:text-xl"></i>
                <a class="block px-4 py-2  ">Đăng xuất</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="profile-pic ml-2">
          <div
            class="rounded-full w-10 h-10 object-cover bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 flex items-center justify-center">
            <i class="uil-facebook-messenger text-3xl md:text-xl"></i>
          </div>
        </div>
        <div class="profile-pic ml-2" @click="onShowNotification">
          <div
            class="rounded-full w-10 h-10 object-cover bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 flex items-center justify-center">
            <i class="uil-github text-3xl md:text-xl"></i>
          </div>
        </div>

      </div>
    </div>
  </nav>
  <toast ref="toast"></toast>
  <post_content v-if="isShowModel" @cancel="onShow"></post_content>
  <change v-if="showchange" @cancel="onShowChange"/>
  <notification @cancel="onShowNotification()" v-if="showNotification"/>
  <search v-if="showsearch" @cancel="openSearch()"/>
</template>
  
<script>
import notification from '../notification.vue';
import toast from '../toast/toast.vue';
import post_content from '../post/post_content.vue';
import userService from '../../plugins/userService';
import change from '../information/change.vue';
import socketService from '../../plugins/socketService';
import search from '../search.vue';
export default {

  name: "NavigationBar",
  data() {
    return {
      screenWidth: window.innerWidth,
      isShowModel: false,
      user: '',
      hidden: true,
      showchange:false,
      checkLogin:true,
      showNotification:false,
      showsearch:false
    };
  },

  components:
  {
    toast,
    post_content,
    change,
    search,
    notification

  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    this.user = userService.getUserToken();
    if (!this.user) {
    this.checkLogin = false
    localStorage.setItem('user', false);
    }
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    onShow() {
      this.isShowModel = !this.isShowModel
    },
    opendropdown() {
      this.hidden = !this.hidden
    },
    
    outWeb() {
      socketService.userDisconnect(this.user.id)
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$refs.toast.showToast('Đăng xuất thành công')
      setTimeout(() => {
        this.$router.push({ name: 'login' });
      }, 1000)
    },
    goIn4() {
      // Trong thành phần hoặc hành động của bạn
      window.location.href = `${import.meta.env.VITE_API_BASE_URL_API}information/${this.user.username}/${this.user.id}`;

    },
    onShowChange()
    {
      this.showchange=!this.showchange
      this.hidden = !this.hidden
    },
    
    onShowNotification()
    {
      this.showNotification = !this.showNotification
    },
    gotoHome()
    {
      window.location.href = `${import.meta.env.VITE_API_BASE_URL_API}`;
    },
    openSearch()
    {
      this.showsearch = !this.showsearch
    }
  },
};
</script>
  
<style scoped>
@media (max-width: 767px) {
  .search-bar {
    display: none;
  }

  .logo {
    margin-left: 1rem;
  }
}
</style>
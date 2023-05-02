<template>
    <div class="leftnav">

        <div class="md:flex items-center px-4 mt-2 bg-white shadow-lg rounded-lg py-4 md:py-8">
          <img class="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2" src="../assets/login.gif" alt="Avatar">
          <h3 class="text-gray-900 font-semibold md:text-xs lg:text-base ml-2 text-xs  md:block hidden">Nguyễn Minh Nhựt</h3>
      </div>

        <div class="mt-8 shadow-lg rounded-lg p-4 ">
          <a class="flex items-center py-4 ">
            <i class=" text-violet-500  uil-tag uil-tag mr-4 text-xl md:text-2xl "></i>
            <h3 class="font-semibold   hidden text-xs  md:block  lg:text-base sm:block lg:block ">Trao đổi</h3>
          </a>
          <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700">
          <a class="flex items-center py-4">
            <i class=" text-violet-500 uil-label-alt mr-4 md:text-xl"></i>
            <h3 class="font-semibold   hidden text-xs  md:block  lg:text-base sm:block lg:block">Mua bán</h3>
          </a>
          <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700">
          <a class="flex items-center py-4  ">
            <i class=" text-violet-500 uil-gift mr-4 md:text-xl"></i>
            <h3 class="font-semibold   hidden text-xs  md:block  lg:text-base sm:block lg:block">Trao tặng</h3>
          </a>
          <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700">
          <router-link to="/information" class="flex items-center py-4  ">
            <i class=" text-violet-500  uil-chat-bubble-user mr-4 md:text-xl"></i>
            <h3 class="font-semibold   hidden text-xs  md:block  lg:text-base sm:block lg:block">Thông tin cá nhân</h3>
          </router-link>
        </div>
        <router-link to="/messenger" class=" items-center mt-4 py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer flex md:hidden">
          <i class=" text-violet-500   uil-facebook-messenger mr-4 md:text-xl"></i>
          <h3 class="font-semibold   hidden text-xs  md:block  lg:text-base sm:block lg:block">Nhắn tin</h3>
        </router-link>
        <label class="flex items-center mt-4 py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer ">
          <i class=" text-violet-500  uil-plus-square mr-4 md:text-xl"></i>
          <h3 class="font-semibold  hidden text-xs  md:block  lg:text-base sm:block lg:block" @click="onShow">Tạo bài đăng</h3>
        </label>
        <label @click="outWeb" class="flex items-center mt-4 py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer ">
          <i class="text-violet-500 uil-exit mr-4 md:text-xl"></i>
          <h3 class="font-semibold  hidden text-xs  md:block  lg:text-base sm:block lg:block">Đăng xuất</h3>
        </label>
       
      </div>
  <toast ref="toast"></toast>
  <post_content v-if="isShowModel" @cancel="onShow"></post_content>
  
</template>
<script>

import toast from '../components/toast.vue';
import post_content from './post_content.vue';

export default
{
  data() {
    return {
      isShowModel: false,
    }
  },
  components:
  {
    toast,
    post_content

  },
  methods: {
    outWeb() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$refs.toast.showToast('Đăng xuất thành công')
      setTimeout(() => {
            this.$router.push({ name: 'login' });
            }, 1000) 
    },
    onShow() {
      this.isShowModel = !this.isShowModel
    },
  }
}
</script>


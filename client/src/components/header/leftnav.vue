<template>
    <div class="leftnav">
      <div class="md:flex items-center px-4 mt-2 bg-white shadow-lg rounded-lg py-4 md:py-8" v-if="checkLogin">
        <div class="flex items-center">
          <div class="relative" v-for="us in usersocket.filter(item=>item.id == user.id)">

            <div class="flex items-center justify-center  overflow-hidden rounded-full">
              <img class="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2" :src="us.avatar" alt="Avatar">
            </div>
              <div :class="['absolute bottom-0 right-0 w-4 h-4 mr-1 rounded-full border-2 border-white', us.online ? 'bg-green-500' : 'bg-red-500']"></div>
            </div>
            </div>
            <h3 @click="goIn4()" class="text-gray-900 font-semibold md:text-xs lg:text-base ml-2 text-xs md:block hidden cursor-pointer">{{user.username}}</h3>
        </div>      
    </div>
        <div class="mt-8 shadow-lg rounded-lg p-4 ">
      <router-link to="/donate" class="flex items-center py-4  ">
            <i class=" text-violet-500 uil-gift mr-4 md:text-xl"></i>
            <h3 class="font-semibold   hidden text-xs  md:block  lg:text-base sm:block lg:block">Trao tặng</h3>
          </router-link>
          <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"/>
          <router-link to="/search" class="flex items-center py-4  ">
            <i class=" text-violet-500 uil-search mr-4 md:text-xl"></i>
            <h3 class="font-semibold   hidden text-xs  md:block  lg:text-base sm:block lg:block">Tìm kiếm</h3>
          </router-link>
          <router-link to="/trade" class="flex items-center py-4  ">
            <i class=" text-violet-500 uil-search mr-4 md:text-xl"></i>
            <h3 class="font-semibold   hidden text-xs  md:block  lg:text-base sm:block lg:block">Trao đổi</h3>
          </router-link>
          <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700">
          <a v-if="checkLogin" @click="goIn4" class="flex items-center py-4 cursor-pointer ">
            <i class=" text-violet-500  uil-chat-bubble-user mr-4 md:text-xl"></i>
            <h3 class="font-semibold   hidden text-xs  md:block  lg:text-base sm:block lg:block">Thông tin cá nhân</h3>
          </a>
        </div>
       

        <div class="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16 hidden md:block">
          <div class="bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white py-2 px-4">
              <h2 class="text-xl font-semibold text-gray-800">Bảng xếp hạng</h2>
          </div>
          <div class="max-h-80 min-h-10 overflow-y-auto">
              <ul class="divide-y divide-gray-200" v-for="(rank, index) in ranks">
                  <li class="flex items-center py-4 px-6">
                      <span class="text-gray-700 text-lg font-medium mr-4">{{ index + 1 }}.</span>
                      <img class="w-12 h-12 rounded-full object-cover mr-4" :src="rank.avatar" alt="User avatar">
                      <div class="flex-1">
                          <h3 class="text-lg font-medium text-gray-800">{{ rank.username }}</h3>
                          <p class="text-gray-600 text-base">{{ rank.ranking_score }} điểm</p>
                      </div>
                  </li> 
              </ul>
          </div>
      </div>

      
  <toast ref="toast"></toast>
  <post_content v-if="isShowModel" @cancel="onShow"></post_content>
  
</template>
<script>

import toast from '../toast/toast.vue';
import post_content from '../post/post_content.vue';
import userService  from '../../plugins/userService';
import socketService from '../../plugins/socketService';
export default
{
  
  data() {
    return {
      isShowModel: false,
      user:'',
      ranks:[],
      checkLogin:true,
      users:[],
      usersocket:[],
      data:[]

    }
  },
  components:
  {
    toast,
    post_content
  },
   mounted()
  {
   this.user=userService.getUserToken();
   if(!this.user)
   {
    this.checkLogin = false
   }
   this.getRank()
   userService.renderUser().then((data)=>
   {
    this.users=data
   })
   socketService.getListOnline((data) => {
      this.updateUserStatus(data)
    });
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
    goIn4()
    {
      window.location.href = `${import.meta.env.VITE_API_BASE_URL_API}information/${this.user.username}/${this.user.id}`;
    },
    async getRank()
      {
        try {
            const result = await this.$axios.get('rank/get');
            this.ranks= result.data
        } catch (error) {
            console.log(error)
        }
      },
      updateUserStatus(data) {
        this.usersocket = this.users.map((user) => {
          return {
            id: user.id,
            username: user.username,
            online: data[user.id],
            avatar: user.avatar,
          };
        });
      }
  }
}
</script>


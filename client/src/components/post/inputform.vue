<template>
    <div class="bg-white w-full h-18 p-4 rounded-md shadow-md" v-if="checkLogin">
        <div class="w-full h-16  items-center flex justify-between md:px-5">
            <img class=" rounded-full md:w-10 md:h-10 md:mr-3 h-8 w-8 mr-1" :src="user.avatar" alt="">
            <button class=" w-full rounded-full h-10 bg-gray-100 cursor-pointer px-5 text-sm md:text-base" @click="onShow">Đăng bài gì cho hôm nay nào ?</button>
        </div>
    </div>
    <post_content key="0" v-if="isShowModel" @cancel="onShow()" />
</template>

<script>
import post_content from './post_content.vue';
import userService from '../../plugins/userService';
export default
{
  
    data() {
    return {
      isShowModel: false,
      user:'',
      checkLogin:true
     
    }
  },
    components:
    {
        post_content
    },
    mounted()
    {
      this.user=userService.getUserToken()
      if(!this.user)
      {
        this.checkLogin = false
      }
    },
    methods:
    {
     onShow() {
      this.isShowModel =!this.isShowModel
    },
    }

}
</script>
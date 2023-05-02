<template>
    <div class="bg-white w-full h-18 p-4 rounded-md shadow-md">
        <div class="w-full h-16  items-center flex justify-between md:px-5">
            <img class=" rounded-full md:w-10 md:h-10 md:mr-3 h-8 w-8 mr-1" src="../assets/login.gif" alt="">
            <button class=" w-full rounded-full h-10 bg-gray-100 cursor-pointer px-5 text-sm md:text-base" @click="onShow">Đăng bài gì cho hôm nay nào ?</button>
        </div>
    </div>
    <post_content v-if="isShowModel" @cancel="onShow"></post_content>
</template>

<script>
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
        post_content
    },
    methods:
    {
     onShow() {
      this.isShowModel = !this.isShowModel
    },
    }

}
</script>
<template>
  <navbar/> 
  <div class="grid grid-cols-4 gap-4  ">
    <div class="py-2 col-span-1 mx-2 md:mx-4 lg:mx-8 ">
     <leftnav/>
    </div>
    <div class=" p-4 lg:col-span-2 md:col-span-2 col-span-3 ">
      <div class="bg-white w-full h-18 p-4 rounded-md shadow-md">
        <div class="w-full h-16  items-center flex justify-between md:px-5">
            <img class=" rounded-full md:w-10 md:h-10 md:mr-3 h-8 w-8 mr-1" src="../assets/login.gif" alt="">
            <button class=" w-full rounded-full h-10 bg-gray-100 cursor-pointer px-5 text-sm md:text-base">Đăng bài gì cho hôm nay nào ?</button>
        </div>
    </div>
      <post/>
    </div>
    <div class=" p-4 hidden md:block lg:block md:col-span-1 lg:col-span-1">
      <rightnav/>
    </div>
  </div>
</template>
0
<script>
import navbar from '../components/navbar.vue'; 
import leftnav from '../components/leftnav.vue'
import post from '../components/post.vue';
import rightnav from '../components/rightnav.vue';

export default
{
  components:
  {
    navbar,
    post,
    leftnav,
    rightnav
  }
}
</script>


<template>
<div class="m-2">
    <!--top-->
    <div class="w-full px-6 mx-auto mb-10">
      <div class="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl" style="background-image: url('https://haycafe.vn/wp-content/uploads/2022/01/Hinh-nen-Macbook-3D-moi-nhat.jpg'); background-position-y: 50%">
        <span class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
      </div>
      
      <div
        class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
        <div class="flex flex-wrap -mx-3">
          <div class="flex-none w-auto max-w-full px-3">
  
          </div>
          <div class="flex-none w-auto max-w-full px-3 my-auto">
            <div class="h-full">
              <h5 class="mb-1">Thống kê</h5>
            </div>
          </div>
          <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
            <div class="relative right-0">
              <ul class="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl flex-col on-resize h-20">
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!--user +  tuong tac-->
    <div class="flex mt-6 justify-center mb-6 ">
      <div class="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
        <div
          class="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4">
          <div class="relative h-full overflow-hidden bg-cover rounded-xl ">
            <span class="absolute top-0 left-0 w-full h-full bg-center bg-cover  to-slate-800 opacity-80"></span>
            <div class="relative z-10 flex flex-col flex-auto h-full p-4">
              <h5 class="pt-2 mb-6 font-bold text-white">Thống kê người dùng</h5>
              <userchart />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
        <div
          class="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4">
          <div class="relative h-full overflow-hidden bg-cover rounded-xl ">
            <span class="absolute top-0 left-0 w-full h-full bg-center bg-cover  to-slate-800 opacity-80"></span>
            <div class="relative z-10 flex flex-col flex-auto h-full p-4">
              <h5 class="pt-2 mb-6 font-bold text-white">Thống kê tương tác bài đăng</h5>
              <postInteraction />
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!--type va cat-->
    <div class="flex mt-6 justify-center mb-10 ">
      <div class="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
        <div
          class="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4">
          <div class="relative h-full overflow-hidden bg-cover rounded-xl ">
            <span class="absolute top-0 left-0 w-full h-full bg-center bg-cover  to-slate-800 opacity-80"></span>
            <div class="relative z-10 flex flex-col flex-auto h-full p-4">
              <h5 class="pt-2 mb-6 font-bold text-white">Thống kê bài đăng theo loại bài đăng</h5>
              <postTypeChart />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
        <div
          class="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4">
          <div class="relative h-full overflow-hidden bg-cover rounded-xl ">
            <span class="absolute top-0 left-0 w-full h-full bg-center bg-cover  to-slate-800 opacity-80"></span>
            <div class="relative z-10 flex flex-col flex-auto h-full p-4">
              <h5 class="pt-2 mb-6 font-bold text-white">Thống kê bài đăng theo loại danh mục</h5>
              <postByCat />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div> <p class="sr-only">aaa</p></div>
</div>

</template>

  
<script>

import userchart from '../../components/chart/userchart.vue';
import postTypeChart from '../../components/chart/postTypeChart.vue'
import postByCat from '../../components/chart/postByCat.vue';
import postInteraction from '../../components/chart/postInteraction.vue'
export default {
  name: 'App',
  components:
  {
    userchart,
    postTypeChart,
    postInteraction,
    postByCat
  },
  methods: {

  }
};
</script>
<template>

    <div class="max-w-xl w-full mx-auto rounded-md shadow-md overflow-hidden mt-6">
        <!-- Header -->
        <div class="flex items-center px-4 py-2 bg-white border-b">
            <img class="w-10 h-10 rounded-full mr-2" src="../../assets/login.gif" alt="Avatar">
            <div class="bg-white">
                 <h3 class="text-gray-900 font-medium">Nguyễn Minh Nhựt</h3>
                 <p class="text-gray-500 text-sm">2 giờ trước</p>
            </div>      
        </div>
        <div class="px-4 py-2 bg-white">
            <p class="text-blue-700 font-bold text-xs">#Hồ Chí Minh</p>
            <p class="text-blue-700 font-bold text-xs">#Mua bán</p>
            <p class="text-slate-700 md:text-sm lg:text-base text-xs">
               Hôm nay endgame muốn bán lại em phím cơ tâm huyết.
               #Enter67 đã full mod rất ngon
            </p>
            <p class="text-blue-700 font-bold text-xs">Giá: 100.000 đồng</p>
        </div>
        <!-- Image -->
        <div class="flex items-center mt-4 py-2 px-4">
            <swiper :pagination="true" :modules="modules" class="mySwiper" :autoplay="{ delay: 1000 }">
              <swiper-slide>
                <img class="max-w-sm w-full mx-auto" src="../../assets/login.gif" alt="Bài đăng">
              </swiper-slide>
            </swiper>
          </div>

        <!-- Footer -->
        <div class="px-4 py-2 bg-white">
            <div class="flex items-center mb-2">
                <button class="mr-3">
                    <span><i class="uil uil-heart"></i></span>
                </button>
                <button class="mr-3">
                    <span><i class="uil uil-comment"></i></span>
                </button>
                <button>
                    <span><i class="uil uil-share"></i></span>
                </button>
            </div>
            <p class="text-gray-900 font-medium mb-2">100 lượt thích</p>
           
            <div class="flex items-center mt-2">
                <img class="w-6 h-6 rounded-full mr-2" src="../../assets/login.gif" alt="Avatar">
                <input class="w-full px-4 py-2 border rounded-full text-gray-700 focus:outline-none" type="text"
                    placeholder="Thêm bình luận...">
            </div>

        </div>
    </div>
    
</template>

<script>

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

import "swiper/swiper-bundle.min.css";
// import required modules
import { Pagination } from 'swiper';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {


        }
    },
    
    setup() {
        return {
            modules: [Pagination],
        };
    },
};
</script>
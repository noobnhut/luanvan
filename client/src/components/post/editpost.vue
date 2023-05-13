<template>
  <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Cập nhập bài đăng</h5>
        <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
      </div>
      <div class="py-4 px-2">
        <div class="mt-1">
          <input type="text" placeholder="Tiêu đề"
            class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
            v-model="title">
        </div>

        <div class="mt-5">
          <input type="text" placeholder="Nội dung bài đăng"
            class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
            v-model="post_content">
        </div>
        <div class="md:flex mb-2 block mt-5 ">
          <div class="relative md:mr-2 mt-5">
            <label>Thành phố:</label>
            <select v-model="city_id" required @change="onCitySelected()"
              class="block appearance-none w-full bg-white border  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
              <option disabled>Thành phố</option>
              <option v-for="city in citys" :key="city.code" :value="city.code">{{ city.name }}</option>
            </select>
          </div>
          <div class="relative md:mr-2 mt-5">
            <label>Quận huyện:</label>
            <select v-model="districts_code" @change="onDistrictSelected()"
              class="block appearance-none w-full bg-white border  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
              <option disabled selected>Quận/Huyện</option>
              <option v-for="district in districts" :key="district.code" :value="district.code">{{
                district.name }}
              </option>
            </select>
          </div>
          <div class="relative mt-5">
            <label>Xã phường:</label>
            <select v-model="commune_id"
              class="block appearance-none w-full bg-white border  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm ">
              <option disabled selected>Xã/Phường</option>
              <option v-for="commune in communes" :key="commune.code" :value="commune.code">{{ commune.name }}
              </option>
            </select>
          </div>
        </div>

        
        <!-- Image -->
        <div class="flex items-center " v-on:mouseenter="handleMouseEnter" v-on:mouseleave="handleMouseLeave" >
          <swiper :pagination="true" :modules="modules" class="mySwiper " :autoplay="{ delay: 1000 }" >
            <div class="flex items-end">
              
            </div>
            <swiper-slide v-for="img in imgs">
              <img class=" h-48 w-48 mx-auto" :src="img.url" alt="Bài đăng">
            </swiper-slide>
            <swiper-slide v-for="video in videos">
              <video loop controls class=" h-48 w-48 mx-auto ">
                <source :src="video.url" type="video/mp4" />
              </video>
            </swiper-slide>
          </swiper>
        </div>

      </div>

      <div class="modal-footer py-3 px-4 ">
        <button
          class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
          @click="updateInfo">Cập
          nhập</button>
        <button
          class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
          @click="onclose()">Đóng</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import userService from '../../plugins/userService';
import addressService from '../../plugins/addressService';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

import "swiper/swiper-bundle.min.css";
// import required modules
import { Pagination } from 'swiper';
export default {
  props: ['postId', 'citycode', 'districtcode', 'communecode'], // Khai báo prop postId
  data() {
    return {
      user: '',
      citys: [],
      districts: [],
      communes: [],
      city_id: '',
      districts_code: '',
      commune_id: '',
      post_content: '',
      title: '',
      imgs: [],
      videos: []
    }
  },
  components: {
    Swiper,
    SwiperSlide,

  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  mounted() {
    this.user = userService.getUserToken();
    addressService.getCountry().then(data => {
      this.citys = data;
    });
    addressService.getDistricts(this.citycode).then(data => {
      this.districts = data;
    });
    addressService.getCommune(this.districtcode).then(data => {
      this.communes = data;
    });
    this.city_id = this.citycode;
    this.districts_code = this.districtcode;
    this.commune_id = this.communecode;
    this.renderPost()
  },
  methods: {
    onclose() {
      this.$emit('cancel')
    },
    async onCitySelected() {
      this.districts = await addressService.getDistricts(this.city_id);
    },
    async onDistrictSelected() {
      this.communes = await addressService.getCommune(this.districts_code);
    },
    async renderPost() {
      try {
        const result = await this.$axios.get(
          `post/render`
        );
        this.posts = result.data.filter(post => post.id === this.postId);
        this.title = this.posts[0].title;
        this.post_content = this.posts[0].post_content;
        this.imgs = this.posts[0].Imgs;
        this.videos = this.posts[0].Videos;
      } catch (e) {
        console.log(e);
      }
    },
    handleMouseEnter() {
      // Xử lý khi hover vào phần tử
    
    },
    handleMouseLeave() {
      // Xử lý khi rời khỏi phần tử
     
    },
  },

};
</script>
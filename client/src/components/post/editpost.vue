<template>
  <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div class=" bg-white w-11/12 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-full">
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Cập nhập bài đăng</h5>
        <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
      </div>
      <div class=" py-4 px-2 overflow-y-auto ">
        <div class="mt-1">
          <label class="block text-base ml-2 font-medium text-gray-900 dark:text-white">Tiêu đề :</label>
          <input type="text" placeholder="Tiêu đề"
            class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            v-model="title" />
        </div>

        <div class="mt-2">
          <label class="block text-base ml-2 font-medium text-gray-900 dark:text-white">Nội dung bài đăng :</label>
          <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            placeholder="Nhập nội dung ..." v-model="post_content"></textarea>
        </div>

        <div class="md:flex mb-2 block">
          <div class="relative md:mr-2 mt-5">
            <label class="ml-2">Thành phố :</label>
            <select v-model="city_id" required @change="onCitySelected()"
              class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
              <option disabled>Thành phố</option>
              <option v-for="city in citys" :key="city.code" :value="city.code">
                {{ city.name }}
              </option>
            </select>
          </div>
          <div class="relative md:mr-2 mt-5">
            <label class="ml-2">Quận huyện :</label>
            <select v-model="districts_code" @change="onDistrictSelected()"
              class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
              <option disabled selected>Quận/Huyện</option>
              <option v-for="district in districts" :key="district.code" :value="district.code">
                {{ district.name }}
              </option>
            </select>
          </div>
          <div class="relative mt-5">
            <label class="ml-2">Xã phường :</label>
            <select v-model="commune_id"
              class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
              <option disabled selected>Xã/Phường</option>
              <option v-for="commune in communes" :key="commune.code" :value="commune.code">
                {{ commune.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Image -->

        <div class="flex items-center mt-4 py-2 px-4">
          <div class="container grid grid-cols-3 gap-2 mx-auto">

           
              <div class="flex justify-center items-center bg-gray-300 h-screen "  v-for="img in imgs">
                <div class="w-64 h-64 bg-gray-500 rounded-lg overflow-hidden shadow-lg">
                  <img :src="img.url" alt="Your Image" class="w-full h-full object-cover filter blur-sm">
                </div>
              </div>
          

            <div class="w-full rounded" v-for="video in videos">
              <video loop controls >
                <source :src="video.url" type="video/mp4" />
              </video>
          </div>

        </div>
        </div>
        
      </div>


      <div class="modal-footer py-3 px-4">
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
          v-if="is_clearimg" @click="clearIMG()">
          Xóa ảnh
        </button>
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
          v-if="is_clearvideo" @click="clearVideo()">
          Xóa video
        </button>
      </div>
      <div class="modal-footer py-3 px-4">
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
          @click="updateInfo">
          Cập nhập
        </button>
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
          @click="onclose()">
          Đóng
        </button>
      </div>
    </div>
  </div>

  <toast ref="toast"></toast>
</template>

<script>
import toast from "../toast/toast.vue";

import userService from "../../plugins/userService";
import addressService from "../../plugins/addressService";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.min.css";
import { Pagination } from "swiper";
export default {
  emits: ["cancel"],
  props: ["postId", "citycode", "districtcode", "communecode"], // Khai báo prop postId
  data() {
    return {
      user: "",
      citys: [],
      districts: [],
      communes: [],
      city_id: "",
      districts_code: "",
      commune_id: "",
      post_content: "",
      title: "",
      imgs: [],
      videos: [],
      catid: "",
      cats: [],
      type: "",
      img_delete: [],
      video_delete: [],
      is_clearimg: false,
      is_clearvideo: false
    };
  },
  components: {
    toast,
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
    addressService.getCountry().then((data) => {
      this.citys = data;
    });
    addressService.getDistricts(this.citycode).then((data) => {
      this.districts = data;
    });
    addressService.getCommune(this.districtcode).then((data) => {
      this.communes = data;
    });
    this.city_id = this.citycode;
    this.districts_code = this.districtcode;
    this.commune_id = this.communecode;
    this.renderPost();
    this.getCat();
  },
  methods: {
    onclose() {
      this.$emit("cancel");
    },
    async onCitySelected() {
      this.districts = await addressService.getDistricts(this.city_id);
    },
    async onDistrictSelected() {
      this.communes = await addressService.getCommune(this.districts_code);
    },
    async getCat() {
      try {
        const result = await this.$axios.get(`getcat`);
        this.cats = result.data;
      } catch (e) {
        console.log(e);
      }
    },
    async renderPost() {
      try {
        const result = await this.$axios.get(`post/render`);
        this.posts = result.data.filter((post) => post.id === this.postId);
        this.title = this.posts[0].title;
        this.post_content = this.posts[0].post_content;
        this.imgs = this.posts[0].Imgs;
        if (this.imgs.length !== 0) {
          this.is_clearimg = true
        }

        this.videos = this.posts[0].Videos;
        if (this.videos.length !== 0) {
          this.is_clearvideo = true
        }
        (this.catid = this.posts[0].Category.id),
          (this.type = this.posts[0].type);
      } catch (e) {
        console.log(e);
      }
    },
    async updateInfo() {
      try {
        const result = await this.$axios.put(`post/update/` + this.postId, {
          title: this.title,
          post_content: this.post_content,
          type: this.type,
          id_cat: this.id_cat,
          citycode: this.city_id,
          districtcode: this.districts_code,
          communecode: this.commune_id,
          id_user: this.user.id,
        });
        console.log(result);
        if (result.status == 200) {
          this.$refs.toast.showToast("Cập nhập thành công");
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      } catch (error) { }
    },
    clearIMG() {
      if (this.imgs.length !== 0) {
        this.img_delete = this.imgs;
        this.imgs = [];
        this.is_clearimg = false;
        console.log(this.img_delete);
      }
    },
    clearVideo() {
      if (this.videos.length !== 0) {
        this.video_delete = this.videos;
        this.videos = [];
        this.is_clearvideo = false;
        console.log(this.video_delete);
      }
    }
  },
};
</script>

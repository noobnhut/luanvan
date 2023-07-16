<template>
  <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div class=" bg-white w-11/12 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-full">
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Cập nhập bài đăng</h5>
        <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
      </div>
      <div class=" py-4 px-2 overflow-y-auto ">
        <div class="grid grid-cols-2 ">
          <!--left update-->
          <div class="py-2 px-2">
            <div class="relative mb-2">
              <select id="select" name="select" v-model="type"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                <option disabled selected>Chọn loại bài đăng</option>
                <option value="Tìm kiếm">Tìm kiếm</option>
                <option value="Trao tặng">Trao tặng</option>
                <option value="Trao đổi">Trao đổi</option>
                <p class="text-red-500 text-sm ml-1" v-if="!type && typeFocused">Không được để trống.</p>

              </select>
            </div>

            <div class="relative mt-5">
              <label>Loại sản phẩm</label>
              <select v-model="catid"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled selected>Loại sản phẩm</option>
                <option v-for="cat in cats" :key="cat.id" :value="cat.id">
                  {{ cat.cat_name }}
                </option>
              </select>
              <p class="text-red-500 text-sm ml-1" v-if="!catid && catFocused">Không được để trống.</p>

            </div>
            <div class="mt-1">
              <label class="block text-base ml-2 font-medium text-gray-900 dark:text-white">Tiêu đề :</label>
              <input type="text" placeholder="Tiêu đề"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                v-model="title" />
              <p class="text-red-500 text-sm ml-1" v-if="!title && titleFocused">Không được để trống.</p>

            </div>

            <div class="mt-2">
              <label class="block text-base ml-2 font-medium text-gray-900 dark:text-white">Nội dung bài đăng :</label>
              <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                placeholder="Nhập nội dung ..." v-model="post_content"></textarea>
              <p class="text-red-500 text-sm ml-1" v-if="!post_content && contentFocused">Không được để trống.</p>

            </div>

            <div class=" mb-2 block">
              <div class="relative md:mr-2 mt-5">
                <label class="ml-2">Thành phố :</label>
                <select v-model="city_id" required @change="onCitySelected()"
                  class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                  <option disabled>Thành phố</option>
                  <option v-for="city in citys" :key="city.code" :value="city.code">
                    {{ city.name }}
                  </option>
                </select>
                <p class="text-red-500 text-sm ml-1" v-if="!city_id && cityFocused">Không được để trống.</p>

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
                <p class="text-red-500 text-sm ml-1" v-if="!districts_code && districtFocused">Không được để trống.</p>

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
                <p class="text-red-500 text-sm ml-1" v-if="!commune_id && communeFocused">Không được để trống.</p>

              </div>
            </div>
          </div>
          <!--right update-->
          <div class="py-2">

            <!-- Image -->
            <div class="flex items-center mt-4 py-2 px-4">

              <swiper :pagination="true" :modules="modules" class="mySwiper" :autoplay="{ delay: 1000 }">
                <swiper-slide v-for="img in imgs">
                  <img class="max-w-sm w-full mx-auto h-32 md:h-64" :src="img.url" alt="Bài đăng">
                </swiper-slide>

                <swiper-slide v-for="img in imgs_new">
                  <img class="max-w-sm w-full mx-auto h-32 md:h-64" :src="img.url" alt="Bài đăng">
                </swiper-slide>

                <swiper-slide v-for="video in videos">
                  <video loop controls class="max-w-sm w-full mx-auto h-32 md:h-64 ">
                    <source :src="video.url" type="video/mp4" />
                  </video>
                </swiper-slide>


                <swiper-slide v-for="video in videos_new">
                  <video loop controls class="max-w-sm w-full mx-auto h-32 md:h-64 ">
                    <source :src="video.url" type="video/mp4" />
                  </video>
                </swiper-slide>
              </swiper>
              
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4 shrink-0">
              <button @click="deleteimg()"
                class=" text-xs border  bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                Xóa ảnh
              </button>

              <button @click="deletevideo()"
                class=" text-xs border  bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                Xóa video
              </button>

              <label for="video-file" class="cursor-pointer ">
                <div
                  class="text-xs border bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                  Thêm video
                </div>
                <input id="video-file" type="file" accept=".mp4" @change="onFileSelectedVideo" multiple hidden />
              </label>

              <label for="img-file">
                <div
                  class="text-xs border  bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none ">
                  Thêm ảnh
                </div>
                <input id="img-file" type="file" @change="onFileSelected" multiple hidden
                  accept=".png, .jpeg, .gif, .jpg" />
              </label>

            </div>
          

          </div>
        </div>
      </div>


      <div class="modal-footer py-3 px-4">

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
  props: ["post",], // Khai báo prop postId
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
      imgs_new: [],
      videos_new: [],
      avatar: null,
      video: null,
      id: '',
      cityFocused: false, districtFocused: false, communeFocused: false, catFocused: false,
      typeFocused: false, titleFocused: false, contentFocused: false, avatarFocusted: false,
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
    this.id = this.post.id
    this.title = this.post.title
    this.post_content = this.post.post_content;
    this.city_id = this.post.citycode
    this.districts_code = this.post.districtcode
    this.commune_id = this.post.communecode;
    addressService.getDistricts(this.city_id).then((data) => {
      this.districts = data;
    });
    addressService.getCommune(this.districts_code).then((data) => {
      this.communes = data;
    });
    this.imgs = this.post.Imgs;
    if (this.imgs.length !== 0) {
      this.is_clearimg = true
    }

    this.videos = this.post.Videos;
    if (this.videos.length !== 0) {
      this.is_clearvideo = true
    }
    (this.catid = this.post.Category.id),
      (this.type = this.post.type);
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
    deleteimg() {

      if (this.imgs.length > 0) {
        this.imgs = []
      }
      else {
        this.$refs.toast.showToast("Không có ảnh để xóa");
      }
    },
    deletevideo() {
      if (this.videos.length > 0) {
        this.videos = []
      }
      else {
        this.$refs.toast.showToast("Không có video để xóa");
      }
    },

    //post/create
    onFileSelected(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        this.imgs_new.push({ id: i, url: imageUrl });
      }
      this.avatar = files;
      console.log(this.imgs_new)
    },
    onFileSelectedVideo(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        this.videos_new.push({ id: i, url: imageUrl });
      }
      this.video = files;
    },
    async updateInfo() {
      try {
        if (this.avatar) {
          const formImg = new FormData();
          for (let i = 0; i < this.avatar.length; i++) {
            const file = this.avatar[i];
            formImg.append("avatar", file);
          }
          try {
            const addimg = await this.$axios.post(
              `post/addimg/${this.id}`,
              formImg,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } catch (error) {
            console.log(error)
          }
        }
        if (this.video) {
          const formVideo = new FormData();
          for (let i = 0; i < this.video.length; i++) {
            const file = this.video[i];
            formVideo.append("video", file);
          }
          const addvideo = await this.$axios.post(
            `post/addvideo/${this.id}`,
            formVideo,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        this.cityFocused = true; this.districtFocused = true; this.communeFocused = true; this.catFocused = true;
        this.typeFocused = true; this.titleFocused = true; this.contentFocused = true; this.avatarFocusted = true;

        if (this.commune_id && this.districts_code && this.city_id  && this.title && this.type && this.post_content && this.catid) {
          const result = await this.$axios.put(`post/update/` + this.id, {
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
        }

      } catch (error) { }
    },


  },
};
</script>

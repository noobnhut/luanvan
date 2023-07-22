<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div class="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto h-full md:h-auto">
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Đăng bài</h5>
        <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
      </div>

      <div class="py-4 px-4">
        <div class="flex items-center px-4 py-2">
          <img class="w-10 h-10 rounded-full mr-2" :src="user.avatar" alt="Avatar" />
          <div>
            <h3 class="text-gray-900 font-medium">{{ user.username }}</h3>
          </div>
        </div>
        <div class="relative mb-2">
          <select id="select" name="select" v-model="type"
            class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
            <option disabled selected>Chọn loại bài đăng</option>
            <option value="Tìm kiếm">Tìm kiếm</option>
            <option value="Trao tặng">Trao tặng</option>
            <option value='Trao đổi'>Trao đổi</option>

          </select>
          <p class="text-red-500 text-sm ml-1" v-if="!type && typeFocused">Không được để trống.</p>

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
        <div class="md:flex mb-2 block">
          <div class="relative md:mr-2 mt-5">
            <label>Thành phố:</label>
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
            <label>Quận huyện:</label>
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
            <label>Xã phường:</label>
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
        <input type="text" class="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none"
          placeholder="Nhập tiêu đề " v-model="title" />
          <p class="text-red-500 text-sm ml-1" v-if="!title && titleFocused">Không được để trống.</p>

        <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          placeholder="Nhập nội dung ..." v-model="post_content"></textarea>
          <p class="text-red-500 text-sm ml-1" v-if="!post_content && contentFocused">Không được để trống.</p>

        <div class="flex">
          <label for="video-file">
            <i class="text-violet-500 uil-video mr-2 text-2xl"></i>
            <input id="video-file" type="file" accept=".mp4" @change="onFileSelectedVideo" multiple hidden />
          </label>
          <label for="img-file">
            <i class="text-violet-500 uil-image-plus text-2xl"></i>
            <input id="img-file" type="file" @change="onFileSelected" multiple hidden accept=".png, .jpeg, .gif, .jpg" />
          </label>
        </div>
       
        <p class="text-red-500 text-sm ml-1" v-if="!avatar && avatarFocusted">Vui lòng thêm ít nhất một ảnh.</p>

      </div>

      <div class="modal-footer py-3 px-4">
        <button @click="create"
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4">
          Đăng bài
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
import AddressService from "../../plugins/addressService";
import userService from "../../plugins/userService";
import toast from "../toast/toast.vue";
export default {
  emits: ["cancel"],
  data() {
    return {
      city_id: "",
      districts_code: "",
      cats: [],
      commune_id: "",
      citys: [],
      districts: [],
      communes: [],
      user: "",
      catid: "",
      avatar: null,
      video: "",
      post_content: "",
      title: "",
      type: "",
      cityFocused: false, districtFocused: false, communeFocused: false,catFocused:false,
      typeFocused:false, titleFocused:false, contentFocused:false,avatarFocusted: false,
    };
  },
  components: {
    toast,
  },
  mounted() {
    AddressService.getCountry().then((data) => {
      this.citys = data;
    });

    this.user = userService.getUserToken();
    this.city_id = this.user.citycode
    this.districts_code = this.user.districtcode
    this.commune_id = this.user.communecode;
    AddressService.getDistricts(this.city_id).then((data) => {
      this.districts = data;
    });
    AddressService.getCommune(this.districts_code).then((data) => {
      this.communes = data;
    });
    this.getCat();
  },
  methods: {
    onclose() {
      this.$emit("cancel");
    },
    async onCitySelected() {
      this.districts = await AddressService.getDistricts(this.city_id);
    },
    async onDistrictSelected() {
      this.communes = await AddressService.getCommune(this.districts_code);
    },
    async getCat() {
      try {
        const result = await this.$axios.get(`getcat`);
        this.cats = result.data;
      } catch (e) {
        console.log(e);
      }
    },
    //post/create
    onFileSelected(event) {
      const files = event.target.files;
      this.avatar = files;
    },
    onFileSelectedVideo(event) {
      const files = event.target.files;
      this.video = files;
    },

    async create() {
      let id_user = this.user.id;
      const formImg = new FormData();

      if (this.avatar) {
        for (let i = 0; i < this.avatar.length; i++) {
          const file = this.avatar[i];
          formImg.append("avatar", file);
        }
      } const formVideo = new FormData();
      if (this.video) {
        for (let i = 0; i < this.video.length; i++) {
          const file = this.video[i];
          formVideo.append("video", file);
        }
      }

      const formData = new FormData();
      formData.append("id_user", id_user);
      formData.append("id_cat", this.catid);
      formData.append("citycode", this.city_id);
      formData.append("districtcode", this.districts_code);
      formData.append("communecode", this.commune_id);
      formData.append("title", this.title);
      formData.append("post_content", this.post_content);
      formData.append("type", this.type);


      this.cityFocused=true; this.districtFocused=true; this.communeFocused=true;this.catFocused=true;
      this.typeFocused=true; this.titleFocused=true; this.contentFocused=true;this.avatarFocusted=true;

      if (this.commune_id && this.districts_code && this.city_id && this.avatar && this.title && this.type && this.post_content && this.catid) {
        try {
          const response = await this.$axios.post("post/create", formData, {});
          const id_post = response.data.id_post;
          if (response.status == 202) {
            this.$refs.toast.showToast(response.data);
          }
          if (response.status == 200 && id_post > 0) {
            const addimg = await this.$axios.post(
              `post/addimg/${id_post}`,
              formImg,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            const addvideo = await this.$axios.post(
              `post/addvideo/${id_post}`,
              formVideo,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (addimg.status == 200) {

              this.$refs.toast.showToast("Đăng bài thành công");
              this.cityFocused=false; this.districtFocused=false; this.communeFocused=false;this.catFocused=false;
      this.typeFocused=false; this.titleFocused=false; this.contentFocused=false;this.avatarFocusted=false;
              setTimeout(() => {
                this.onclose();
                location.reload()
              }, 1000)

            }
          }
        } catch (error) {
          console.error(error);
        }
      }

    },
  },
};
</script>

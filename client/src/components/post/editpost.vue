<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center z-50">
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div
      class="bg-white w-11/12 h-full md:h-auto md:max-w-2xl mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Cập nhập bài đăng</h5>
        <i
          class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl"
          @click="onclose"
        ></i>
      </div>

      <div class="py-4 px-2">
        <div class="mt-1 ">
          <label
            class="block text-base ml-2 font-medium text-gray-900 dark:text-white"
            >Tiêu đề :</label
          >
          <input
            type="text"
            placeholder="Tiêu đề"
            class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            v-model="title"
          />
        </div>

        <div class="mt-2">
          <label
            class="block text-base ml-2 font-medium text-gray-900 dark:text-white"
            >Nội dung bài đăng :</label
          >
          <textarea
            class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            placeholder="Nhập nội dung ..."
            v-model="post_content"
          ></textarea>
        </div>

        <div class="md:flex block items-center">
          <div class="mt-5 mr-2 md:w-1/3 relative">
            <label
              class="block text-base ml-2 font-medium text-gray-900 dark:text-white"
              >Giá sản phẩm :</label
            >
            <input
              type="text"
              placeholder="Giá sản phẩm"
              @input="formatCurrency"
              class="w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              v-model="price"
            />
          </div>
          <div class="relative mr-2 mt-5 md:w-1/3">
            <label
              class="block text-base ml-2 font-medium text-gray-900 dark:text-white"
              >Loại bài đăng :</label
            >

            <select
              id="select"
              name="select"
              v-model="type"
              class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm"
            >
              <option disabled selected>Chọn loại bài đăng</option>
              <option value="Bán hàng">Mua bán</option>
              <option value="Trao đổi">Trao đổi</option>
              <option value="Trao tặng">Trao tặng</option>
              <option value="Tìm mua">Tìm kiếm</option>
            </select>
          </div>

          <div class="relative mt-5 md:w-1/3">
            <label
              class="block text-base ml-2 font-medium text-gray-900 dark:text-white"
              >Loại sản phẩm :</label
            >
            <select
              v-model="catid"
              class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm"
            >
              <option disabled selected>Loại sản phẩm</option>
              <option v-for="cat in cats" :key="cat.id" :value="cat.id">
                {{ cat.cat_name }}
              </option>
            </select>
          </div>
        </div>

        <div class="md:flex mb-2 block mt-5">
          <div class="relative md:mr-2 mt-5">
            <label class="ml-2">Thành phố :</label>
            <select
              v-model="city_id"
              required
              @change="onCitySelected()"
              class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm"
            >
              <option disabled>Thành phố</option>
              <option v-for="city in citys" :key="city.code" :value="city.code">
                {{ city.name }}
              </option>
            </select>
          </div>
          <div class="relative md:mr-2 mt-5">
            <label class="ml-2">Quận huyện :</label>
            <select
              v-model="districts_code"
              @change="onDistrictSelected()"
              class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm"
            >
              <option disabled selected>Quận/Huyện</option>
              <option
                v-for="district in districts"
                :key="district.code"
                :value="district.code"
              >
                {{ district.name }}
              </option>
            </select>
          </div>
          <div class="relative mt-5">
            <label class="ml-2">Xã phường :</label>
            <select
              v-model="commune_id"
              class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm"
            >
              <option disabled selected>Xã/Phường</option>
              <option
                v-for="commune in communes"
                :key="commune.code"
                :value="commune.code"
              >
                {{ commune.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Image -->
      </div>

      <div class="modal-footer py-3 px-4">
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
          @click="updateInfo"
        >
          Cập nhập
        </button>
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
          @click="onclose()"
        >
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
      price: "",
      catid: "",
      cats: [],
      type: "",
    };
  },
  components: {
    toast,
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
    console.log(this.communecode);
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
        this.videos = this.posts[0].Videos;
        this.price = this.posts[0].price;
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
          price: this.unformatCurrency(this.price),
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
      } catch (error) {}
    },
    formatCurrency() {
      let value = this.price.replace(/\D/g, "");
      value = new Intl.NumberFormat("vi-VN").format(value);
      this.price = value;
    },
    unformatCurrency(formattedValue) {
      const unformattedValue = formattedValue.replace(/[^0-9]/g, "");
      const numericValue = parseFloat(unformattedValue);
      return numericValue;
    },
  },
};
</script>

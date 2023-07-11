<template>
  <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div class=" bg-white w-11/12 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-full">
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Tìm kiếm bán đăng</h5>
        <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
      </div>

      <div class="modal-footer py-3 px-4">

        <div class="py-4 px-4">

          <input type="text" class="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none"
            placeholder="Nhập từ muốn tìm kiếm " v-model="keyword" />
          <div class="md:flex mb-2 block">

            <div class="relative md:mr-2 mt-5">
              <label>Loại sản phẩm</label>
              <select v-model="catid"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled selected>Loại sản phẩm</option>
                <option v-for="cat in cats" :key="cat.id" :value="cat.id">
                  {{ cat.cat_name }}
                </option>
              </select>
            </div>

            <div class="relative md:mr-2 mt-5">
              <label>Loại bài đăng</label>
              <select id="select" name="select" v-model="type"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled selected>Chọn loại bài đăng</option>
                <option value="Tìm kiếm">Tìm kiếm</option>
                <option value="Trao tặng">Trao tặng</option>
                <option value="Trao đổi">Trao đổi</option>

              </select>
            </div>
            <div class="relative mt-5">
              <label>Số bán kính</label>
              <input type="text"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm"
                placeholder="Nhập số bán kính " v-model="radius" />
            </div>
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
            </div>
          </div>

        </div>

      </div>

      <div class="modal-footer py-3 px-4">
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
          @click="search()">
          Tìm kiếm
        </button>
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
          @click="onclose()">
          Đóng
        </button>
      </div>
    </div>
  </div>
  <search v-if="isshowSearch"  @cancel="showsearch"/>
</template>

<script>
import addressService from '../plugins/addressService';
import search from '../pages/home/search.vue';
export default {
  emits: ["cancel"],
  data() {
    return {
      user: "",
      citys: [],
      districts: [],
      communes: [],
      city_id: "",
      districts_code: "",
      commune_id: "",
      title: "",
      catid: "",
      cats: [],
      type: "",
      keyword: '',
      radius: '',    
      isshowSearch:false
    };
  },
  mounted() {

    addressService.getCountry().then((data) => {
      this.citys = data;
    });
    this.city_id = this.citycode;
    this.districts_code = this.districtcode;
    this.commune_id = this.communecode;
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
    async search() {
      try {
        const result = await this.$axios.post('post/search',
          {
            citycode: this.city_id, districtcode: this.districts_code, 
            communecode: this.commune_id, keyword: this.keyword, type: this.type,
             catid: this.catid, radius: this.radius
          });
          console.log(result.data)
          this.onclose()
          this.isshowSearch = true
      } catch (error) {
        console.log(error)
      }
    },
    showsearch()
    {
      this.isshowSearch = !this.isshowSearch
    }
  },
};
</script>
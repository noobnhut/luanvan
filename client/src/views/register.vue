<template>
  <div class="min-h-screen py-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div class="w-full py-16 px-12">
          <h2 class="text-3xl mb-4">Đăng ký</h2>
          <p class="mb-4">Chào mừng bạn đến với mạng xã hội của chúng tôi !</p>

          <div class="mt-5">
            <input type="text" placeholder="Họ và tên"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              v-model="username" @focus="checkUsernameError" />
          </div>
          <p class="text-red-500 text-sm ml-1" v-if="!username && usernameFocused">Tên người dùng bị trống.</p>
          <p class="text-red-500 text-sm ml-1"
            v-else-if="(username.length < 3 || username.length > 20) && usernameFocused">Tên người dùng phải từ 3 đến 20
            ký tự.</p>
          <div class="mt-5">
            <input type="text" placeholder="Số điện thoại"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              v-model="phone" @focus="checkphoneError()" />
          </div>
          <p class="text-red-500 text-sm ml-1" v-if="!phone && phoneFocused">Số điện thoại bị trống.</p>
          <p class="text-red-500 text-sm ml-1" v-else-if="!validPhone(phone) && phoneFocused">Số điện thoại sai định dạng.
          </p>

          <div class="mt-5">
            <input type="text" placeholder="Email"
              class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="email" @focus="checkemailError" />
            <p class="text-red-500 text-sm ml-1" v-if="!email && emailFocused">Email bị trống.</p>
            <p class="text-red-500 text-sm ml-1" v-else-if="!validEmail(email) && emailFocused">Email sai định dạng.</p>
          </div>
          <div class="mt-5">
            <input type="password" placeholder="Mật khẩu"
              class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="password" @focus="checkpasswordError" />
          </div>
          <p class="text-red-500 text-sm ml-1" v-if="!password && passwordFocused">Mật khẩu bị trống.</p>

          <div class="md:flex mb-2 block mt-5">
            <div class="relative md:mr-2 mt-5">
              <label>Thành phố:</label>
              <select v-model="city_id" required @change="onCitySelected()" @focus="checkcityError"
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
              <select v-model="districts_code" @change="onDistrictSelected()" @focus="checkDistrictsError"
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
              <select v-model="commune_id" @focus="checkCommuneError"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled selected>Xã/Phường</option>
                <option v-for="commune in communes" :key="commune.code" :value="commune.code">
                  {{ commune.name }}
                </option>
              </select>
              <p class="text-red-500 text-sm ml-1" v-if="!commune_id && communeFocused">Không được để trống.</p>

            </div>
          </div>

          <div class="mt-5">
            <input type="text" placeholder="Địa chỉ cụ thể:"
              class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="address" @focus=" checkaddressError()" />
          </div>
          <p class="text-red-500 text-sm ml-1" v-if="!address && addressFocusted">Địa chỉ cụ thể bị trống.</p>
          <p class="text-red-500 text-sm ml-1" v-if="address.length >= 10 && addressFocusted">Địa chỉ tối đa 10 kí tự.</p>

          <div class="flex items-center justify-center w-full mt-2">
            <label for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Nhấn để tải ảnh hoặc video lên</span>
                </p>
                <!-- <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> -->
              </div>
              <input id="dropzone-file" type="file" class="hidden" @change="onFileSelected"
                accept=".png, .jpeg, .gif, .jpg" />
            </label>

          </div>
          <p class="text-red-500 text-sm ml-1" v-if="!avatar && avatarFocusted">Vui lòng chọn ảnh.</p>
          <div class="mt-5">
            <button
              class="w-full block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              @click="register">
              Đăng ký
            </button>
          </div>

          <p class="mt-8">
            Bạn đã có tài khoản ?
            <router-link to="/" class="text-blue-500 hover:text-blue-700 font-semibold">
              Đăng nhập
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
  <toast ref="toast"></toast>
</template>

<script>
import AddressService from "../plugins/addressService";
import toast from "../components/toast/toast.vue";
import authService from "../plugins/authService";
export default {
  data() {
    return {
      username: "",
      password: "",
      address: "",
      phone: "",
      email: "",
      repassword: "",
      city_id: "",
      districts_code: "",
      commune_id: "",
      citys: [],
      districts: [],
      communes: [],
      avatar: null,
      usernameFocused: false,
      emailFocused: false,
      passwordFocused: false,
      cityFocused: false,
      districtFocused: false,
      communeFocused: false,
      addressFocusted: false,
      phoneFocused: false,
      avatarFocusted: false
    };
  },
  mounted() {
    AddressService.getCountry().then((data) => {
      this.citys = data;
    });
  },
  components: {
    toast,
  },
  methods: {
    onFileSelected(event) {
      this.avatar = event.target.files[0];
    },
    checkUsernameError() {
      this.usernameFocused = true;
    },
    checkemailError() {
      this.emailFocused = true;
    },
    checkpasswordError() {
      this.passwordFocused = true;
    },
    checkphoneError() {
      this.phoneFocused = true;
    },
    checkcityError() {
      this.cityFocused = true;
    },
    checkDistrictsError() {
      this.districtFocused = true;
    },
    checkCommuneError() {
      this.communeFocused = true;
    },
    checkaddressError() {
      this.addressFocused = true;
    },
    async register() {
      this.avatarFocusted = true
      this.usernameFocused = true,
        this.emailFocused = true,
        this.passwordFocused = true,
        this.cityFocused = true,
        this.districtFocused = true,
        this.communeFocused = true,
        this.addressFocusted = true,
        this.phoneFocused = true,
        this.avatarFocusted = true
      authService.register(this.avatar, this.username, this.password, this.email,
        this.address, this.phone, this.city_id, this.districts_code, this.commune_id, this.$refs, this.$router)
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPhone: function (phone) {
      const re = /^(0[1-9]|84[2-9])(\d{8})$/;
      return re.test(phone);
    },

    async onCitySelected() {
      this.districts = await AddressService.getDistricts(this.city_id);
    },

    async onDistrictSelected() {
      this.communes = await AddressService.getCommune(this.districts_code);
    },
  },
};
</script>

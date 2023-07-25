<template>
  <div class="min-h-screen py-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div class="w-full py-16 px-12">
          <h2 class="text-3xl mb-4">Đăng ký</h2>
          <p class="mb-4">Chào mừng bạn đến với mạng xã hội của chúng tôi !</p>

          <!--bắt đầu username
          + v-model : username đại diện cho tên người dùng
          + @focus -> checkUsernameError cho phép bật tắt việc check lỗi input username
          + 2 if là check rỗng và độ dài username nhập vào input
          -->

          <div class="mt-5">
            <input type="text" placeholder="Họ và tên"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              v-model="username" />
          </div>
          <p class="text-red-500 text-sm ml-1" v-if="!username && usernameFocused">Tên người dùng bị trống.</p>
          <p class="text-red-500 text-sm ml-1"
            v-else-if="!validFullName(username) && usernameFocused">Tên người dùng phải từ 3 tới 50 ký tự</p>

          <!--kết thúc username-->

          <!--bắt đầu phone
          + v-model : phone đại diện cho số điện thoại người dùng
          + @focus -> checkphoneError cho phép bật tắt việc check lỗi input phone
          + 2 if : 1 là check rỗng, 2 là check định dạng phone /^(0[1-9]|84[2-9])(\d{8})$/
          -->
          <div class="mt-5">
            <input type="text" placeholder="Số điện thoại"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              v-model="phone" />
          </div>
          <p class="text-red-500 text-sm ml-1" v-if="!phone && phoneFocused">Số điện thoại bị trống.</p>
          <p class="text-red-500 text-sm ml-1" v-else-if="!validPhone(phone) && phoneFocused">Số điện thoại sai định dạng.
          </p>

          <!--kết thúc phone-->

          <!--bắt đầu email
          + v-model: email đại diện cho email người dùng
          + @focus => checkemailError cho phép bật tắc check lỗi input email
          + 2 if là 1 cái check rỗng và else if check định dạng email 
          : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          -->
          <div class="mt-5">
            <input type="text" placeholder="Email"
              class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="email" />
            <p class="text-red-500 text-sm ml-1" v-if="!email && emailFocused">Email bị trống.</p>
            <p class="text-red-500 text-sm ml-1" v-else-if="!validEmail(email) && emailFocused">Email sai định dạng.</p>
          </div>

          <!--kết thúc email-->

          <!--bắt đầu password
          + v-model : password đại diện cho mật khẩu người dùng.
          + @focus -> checkpasswordError cho phép bật tắt check lỗi password
          + 4 if là check rỗng, check độ dài tối thiểu 8 kí tự , check kí tự đặc biệt, check chữ cái hoa
          -->
          <div class="mt-5">
            <input type="password" placeholder="Mật khẩu"
              class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="password" />
          </div>
          <p class="text-red-500 text-sm ml-1" v-if="!password && passwordFocused">Mật khẩu bị trống.</p>
          <p class="text-red-500 text-sm ml-1" v-else-if="password.length <= 7 && passwordFocused">Mật khẩu có tối thiểu 8
            kí tự</p>
          <p class="text-red-500 text-sm ml-1" v-else-if="!validPassword(password) && passwordFocused">Mật khẩu chứa kí tự
            đặc biệt " ~ / ) [ * ^ $ .... "</p>
          <p class="text-red-500 text-sm ml-1" v-else-if="!validPassword2(password) && passwordFocused">Mật khẩu có tối
            thiểu 1 chữ cái hoa</p>
          <!--kết thúc password -->

          <!--bắt đầu địa chỉ -->
          <div class="md:flex mb-2 block mt-5">
            <!--thành phố
            v-model : city_id lấy ra mã thành phố,
            @change = "onCitySelected() trả về id city"
            @focus -> checkcityError bật tắt kiểm tra
            1 if kiểm tra xem chọn chưa thành phố
            -->
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

            <!--Quận huyện
            v-model :districts_cod lấy ra mã quận huyện,
            @change = "onDistrictsSelected() trả về id Districts"
            @focus -> checkDistrictsError bật tắt kiểm tra
            1 if kiểm tra xem chọn chưa quận huyện
            -->
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

            <!--Xã thị trấn
             v-model :ommune_id lấy ra mã xã thị trấn,
            @change = "onCommuneSelected() trả về id Commune"
            @focus -> checkCommuneError bật tắt kiểm tra
            1 if kiểm tra xem chọn chưa xã thị trấn
            -->
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

          <!-- địa chỉ cụ thể:
          + @focus -> checkaddressError() bật tắt chế độ kiểm tra
          + v-model : address đại diện địa chỉ cụ thể
          + 1 if kiểm tra rỗng và độ dài <= 10
          -->
          <div class="mt-5">
            <input type="text" placeholder="Địa chỉ cụ thể:"
              class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="address" />
          </div>

          <p class="text-red-500 text-sm ml-1" v-if="!address && addressFocusted">Địa chỉ cụ thể bị trống.</p>
          <p class="text-red-500 text-sm ml-1" v-else-if="!validAddress(address) && addressFocusted">Địa chỉ tối đa 10 kí tự.</p>

          <!--kết thúc địa chỉ-->

          <!--bắt đầu img-->
          <div class="flex items-center justify-center w-full mt-2">
            <label for="dropzone-file" v-if="showimg"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                  </path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Nhấn để tải
                    ảnh hoặc video lên</span> </p>
                <!-- <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> -->
              </div>
              <input id="dropzone-file" type="file" class="hidden" accept=".png, .jpeg, .gif, .jpg"
                @change="onFileSelected" />
            </label>
            <img class="max-w-sm w-full mx-auto h-32 md:h-64 mt-1" :src="imageUrl" alt="" v-if="!showimg">
          </div>
          <p class="text-red-500 text-sm ml-1" v-if="!avatar && avatarFocusted">Vui lòng chọn ảnh.</p>
          <div class="mt-5">
            <!--kết thúc img-->

            <!-- button gọi method register-->
            <button
              class="w-full block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              @click="register">
              Đăng ký
            </button>
          </div>

          <!-- chuyển sang login form-->
          <p class="mt-8">
            Bạn đã có tài khoản ?
            <router-link to="/login" class="text-blue-500 hover:text-blue-700 font-semibold">
              Đăng nhập
            </router-link>
          </p>

        </div>
      </div>
    </div>
  </div>
  <!--component toast thông báo !!!-->
  <toast ref="toast"></toast>
</template>

<script>
// import 2 service là address( api thành phố ... ) & service xử lý đăng nhập đăng kí
import AddressService from "../../plugins/addressService";
import authService from "../../plugins/authService";
// import toast component
import toast from "../../components/toast/toast.vue";
export default {
  data() {
    return {
      /* dữ liệu tạo ra để lưu trữ thông tin người dùng nhập vào*/
      username: "", password: "", address: "", phone: "", email: "", repassword: "", city_id: "", districts_code: "", commune_id: "", avatar: null,

      /* dữ liệu tạo ra để lưu trữ thông tin các api*/
      citys: [], districts: [], communes: [],

      /* các biển kiểm tra bật tắt focus để validate form*/
      usernameFocused: false, emailFocused: false, passwordFocused: false, cityFocused: false, districtFocused: false, communeFocused: false,
      addressFocusted: false, phoneFocused: false, avatarFocusted: false, showimg: true,
      imageUrl: ''
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
    // xử lý các focus bật tắt validate
   

    //hàm lấy hình
    onFileSelected(event) {
      const maxFileSizeInBytes = 10 * 1024 * 1024; 
      const file =  event.target.files[0]
      if(file.size <= maxFileSizeInBytes)
      {
      this.avatar = file
      this.imageUrl = URL.createObjectURL(this.avatar);
      this.showimg = false
      }else
      {
        this.$refs.toast.showToast('Ảnh nhỏ hơn hoặc bằng 10mb');
      }
     
    },

    // lấy data quận huyện
    async onCitySelected() {
      this.districts = []
      this.communes = []
      this.districts_code = ''
      this.commune_id = ''
      this.districts = await AddressService.getDistricts(this.city_id);
    },
    // lấy data xã thị trấn
    async onDistrictSelected() {
      this.communes = []
      this.commune_id = ''
      this.communes = await AddressService.getCommune(this.districts_code);
    },
    //hàm đăng kí
    async register() {
      // bật hết các focus validate
      this.avatarFocusted = true, this.usernameFocused = true, this.emailFocused = true,
        this.passwordFocused = true, this.cityFocused = true, this.districtFocused = true,
        this.communeFocused = true, this.addressFocusted = true, this.phoneFocused = true

      //gọi lại hàm đăng kí từ authService
      if (this.validEmail(this.email) && this.validPassword(this.password) && this.validPhone(this.phone) &&  this.validPassword2(this.password) 
      && this.address && this.commune_id && this.districts_code && this.city_id && this.avatar && this.username && this.validFullName(this.username) && this.validAddress(this.addres)) {
        authService.register(this.avatar, this.username, this.password, this.email,
          this.address, this.phone, this.city_id, this.districts_code, this.commune_id, this.$refs, this.$router)
          this.avatarFocusted = false, this.usernameFocused = false, this.emailFocused = false,
        this.passwordFocused = false, this.cityFocused = false, this.districtFocused = false,
        this.communeFocused = false, this.addressFocusted = false, this.phoneFocused = false
      }else
    {
      // bật hết các focus validate
      this.avatarFocusted = true, this.usernameFocused = true, this.emailFocused = true,
        this.passwordFocused = true, this.cityFocused = true, this.districtFocused = true,
        this.communeFocused = true, this.addressFocusted = true, this.phoneFocused = true

    }
    },

    // các re ràng buộc
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPhone(phone) {
      const re = /^(0[1-9]|84[2-9])(\d{8})$/;
      return re.test(phone);
    },
    validPassword(password) {
      const re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      return re.test(password);
    },
     validFullName(fullName) {
      const re = /^.{3,50}$/; // Kiểm tra chuỗi từ 10 đến 50 ký tự
  return re.test(fullName);
},
  validPassword2(password) {
      const re = /[A-Z]/;
      return re.test(password);
    },
    validAddress(address)
    {
      const re = /^.{1,10}$/; 
      return re.test(address);
    }

  },
};
</script>

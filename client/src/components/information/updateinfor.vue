<template>
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto h-full md:h-auto">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập thông tin</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
            </div>
            <div class="py-4 px-2">

                <!--bắt đầu username
          + v-model : username đại diện cho tên người dùng
          + @focus -> checkUsernameError cho phép bật tắt việc check lỗi input username
          + 2 if là check rỗng và độ dài username nhập vào input
          -->
                <div class="mt-1">
                    <input type="text" placeholder="Họ và tên"
                        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                        v-model="username" />
                </div>
                <p class="text-red-500 text-sm ml-1" v-if="!username && usernameFocused">Tên người dùng bị trống.</p>
                <p class="text-red-500 text-sm ml-1"
                    v-else-if="!validFullName(username) && usernameFocused">Tên người dùng phải từ 3
                    đến 20
                    ký tự.</p>

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
                <p class="text-red-500 text-sm ml-1" v-else-if="!validPhone(phone) && phoneFocused">Số điện thoại sai định
                    dạng.
                </p>

                <!--kết thúc phone-->

                <div class="mt-5">
                    <input type="text" placeholder="Email" disabled
                        class=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
                        v-model="email">
                </div>


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
                        <p class="text-red-500 text-sm ml-1" v-if="!districts_code && districtFocused">Không được để trống.
                        </p>

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
                <p class="text-red-500 text-sm ml-1" v-if="address.length >= 10 && addressFocusted">Địa chỉ tối đa 10 kí tự.
                </p>
                <!--kết thúc địa chỉ-->
            </div>

            <div class="modal-footer py-3 px-4 ">
                <button
                    class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="updateInfo">Cập
                    nhập</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclose()">Đóng</button>
            </div>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>

<script>

import userService from '../../plugins/userService';
import addressService from '../../plugins/addressService';
import toast from '../toast/toast.vue'

export default {
    emits: ["cancel"],
    data() {
        return {
            user: '',
            cityname: '', username: '', address: '', commune_id: '',
            phone: '', email: '', city_id: '', districts_code: '',
            citys: [], communes: [], districts: [],
            /* các biển kiểm tra bật tắt focus để validate form*/
            usernameFocused: false, cityFocused: false, districtFocused: false, communeFocused: false,
            addressFocusted: false, phoneFocused: false,
        };
    },
    components: { toast },
    mounted() {

        this.user = userService.getUserToken();
        this.email = this.user.email;
        this.phone = this.user.phone;
        this.username = this.user.username;
        this.address = this.user.address;
        addressService.getCountry().then(data => {
            this.citys = data;
        });
        addressService.getDistricts(this.user.citycode).then(data => {
            this.districts = data;
        });
        addressService.getCommune(this.user.districtcode).then(data => {
            this.communes = data;
        });
        this.city_id = this.user.citycode;
        this.districts_code = this.user.districtcode;
        this.commune_id = this.user.communecode
    },
    methods: {
        onclose() {
            this.$emit('cancel')
        },
        // xử lý các focus bật tắt validate
        checkUsernameError() { this.usernameFocused = true; },
        checkphoneError() { this.phoneFocused = true; },
        checkcityError() { this.cityFocused = true; },
        checkDistrictsError() { this.districtFocused = true; },
        checkCommuneError() { this.communeFocused = true; },
        checkaddressError() { this.addressFocusted = true },
        validPhone(phone) {
            const re = /^(0[1-9]|84[2-9])(\d{8})$/;
            return re.test(phone);
        },
        async onCitySelected() {
            this.districts = []
            this.communes = []
            this.districts_code = ''
            this.commune_id = ''
            this.districts = await addressService.getDistricts(this.city_id);
        },
        async onDistrictSelected() {
            this.communes = []
            this.commune_id = ''
            this.communes = await addressService.getCommune(this.districts_code);
        },
        validFullName(fullName) {
            // Định nghĩa tiêu chí cho họ và tên người dùng hợp lệ
            const re = /^[a-zA-Z\s]{3,}$/;
            return re.test(fullName);
        },
        async updateInfo() {
            const id = this.user.id
            this.usernameFocused = true, this.cityFocused = true, this.districtFocused = true,
                this.communeFocused = true, this.addressFocusted = true, this.phoneFocused = true
            if (this.validPhone(this.phone)
                && this.address && this.commune_id && this.districts_code && this.city_id && this.username && this.validFullName(this.username)) {
                userService.updateInfo(this.address, this.phone, this.districts_code, this.city_id, this.commune_id, this.username, id, this.$refs)

            }
        }
    },
}

</script>

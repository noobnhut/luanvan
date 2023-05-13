<template>
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập thông tin</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
            </div>
            <div class="py-4 px-2">
                <div class="mt-1">
                    <input type="text" placeholder="Họ và tên"
                        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                        v-model="username">
                </div>

                <div class="mt-5">
                    <input type="text" placeholder="Số điện thoại"
                        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
                        v-model="phone">
                </div>

                <div class="mt-5">
                    <input type="text" placeholder="Email" disabled
                        class=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
                        v-model="email">
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

                <div class="mt-5">
                    <input type="text" placeholder="Địa chỉ cụ thể:"
                        class=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
                        v-model="address">
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
export default {
    data() {
        return {
            user: '',
            cityname: '',
            citys: [],
            districts: [],
            communes: [],
            username: '',
            address: '',
            phone: '',
            email: '',
            city_id: '',
            districts_code: '',
            commune_id: ''
        };
    },
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
        async onCitySelected() {
            this.districts = await addressService.getDistricts(this.city_id);
        },
        async onDistrictSelected() {
            this.communes = await addressService.getCommune(this.districts_code);
        },
        async updateInfo() {
            try {
                const response = await this.$axios.put(`user/updateInfo/${this.user.id}`,  {
                    address : this.address,
                    phone : this.phone,
                    districtcode:this.districts_code,
                    citycode:this.city_id,
                    communecode:this.commune_id,
                    username:this.username, 
                });
                if (response.status == 200) {
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    this.onclose()
                    location.reload()
                }
            } catch (error) {
                console.error(error);
            }

        }

    },
}

</script>

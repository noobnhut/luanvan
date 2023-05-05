<template>
    <div class="max-w-xl w-full mx-auto rounded-md shadow-md overflow-hidden mt-6">
        <div class="flex items-center px-4 py-2 mt-2 bg-white ">
            <h3 class="font-bold text-base lg:text-xl">Giới thiệu</h3>
        </div>
        <!--Chỉnh sửa ảnh đai diện-->
        <div class="flex items-center  px-4 py-2 bg-white ">
            <img class="h-12 w-12 rounded-md mr-2" :src="user.avatar" alt="Avatar">
            
            <button @click="onShow()"
                class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer">Đổi
                ảnh đại diện</button>
        </div>


        <!--Chỉnh sửa thông tin cá nhân-->
        <div class="px-2 py-2 mt-2">

            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-chat-bubble-user md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Họ và tên: <span class="font-semibold">{{ user.username
                }}</span>
                </h3>
            </label>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-location-arrow md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Thành phố: <span class="font-semibold"
                        v-for="city in citys.filter(items => items.code == user.citycode)">{{ city.name }}</span>
                </h3>
            </label>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-location-arrow md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Quận/Huyện: <span class="font-semibold" v-for="district in districts.filter(items=>items.code == user.districtcode)">{{ district.name }}</span>
                </h3>
            </label>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-location-arrow md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Xã/Phường: <span class="font-semibold" v-for="commune in communes.filter(items=>items.code == user.communecode)">{{ commune.name }}</span>
                </h3>
            </label>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-phone-alt md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Số điện thoại: <span class="font-semibold">{{ user.phone
                }}</span>
                </h3>
            </label>
            <div class="flex justify-center">
                <button @click="onShowInfo"
                    class=" mt-4 py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer">Chỉnh
                    sửa thông tin</button>
            </div>

        </div>
    </div>

    

    <toast ref="toast"></toast>
    <updateimg v-if="isShowModel" @cancel="onShow"></updateimg>
    <updateInfo v-if="isShowInfo" @cancel="onShowInfo"></updateInfo>

</template>
<script>
import updateimg from './updateimg.vue';
import userService from '../../plugins/userService';
import addressService from '../../plugins/addressService'
import toast from '../toast/toast.vue';
import updateInfo from '../information/updateinfor.vue'
export default
    {
        data() {
            return {
                isShowModel: false,
                isShowInfo: false,
                user: '',
                cityname: '',
                citys: [],
                districts:[],
                communes:[],
            }
        },
        components:
        {
            toast,
            updateimg,
            updateInfo
        },
        mounted() {
            this.user = userService.getUserToken();
            addressService.getCountry().then(data => {
                this.citys = data;
            });
            addressService.getDistricts(this.user.citycode).then(data => {
                this.districts = data;
            });
            addressService.getCommune(this.user.districtcode).then(data => {
                this.communes = data;
            });

        },
        methods: {
           
            onShow() {
                this.isShowModel = !this.isShowModel
            },
            onShowInfo() {
                this.isShowInfo = !this.isShowInfo
            },

        }
    }
</script>

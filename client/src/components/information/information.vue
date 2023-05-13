<template>
    <div class="max-w-xl w-full mx-auto rounded-md shadow-md overflow-hidden mt-6">
        <div class="flex items-center px-4 py-2 mt-2 bg-white ">
            <h3 class="font-bold text-base lg:text-xl">Giới thiệu</h3>
        </div>
        <!--Chỉnh sửa ảnh đai diện-->
        <div class="flex items-center  px-4 py-2 bg-white ">
            <img class="h-12 w-12 rounded-md mr-2" :src="users.avatar" alt="Avatar">

            <button @click="onShow()" :class="{ hidden: showIn4 }"
                class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer">Đổi
                ảnh đại diện</button>
        </div>


        <!--Chỉnh sửa thông tin cá nhân-->
        <div class="px-2 py-2 mt-2">

            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-chat-bubble-user md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Họ và tên: <span
                        class="font-semibold">{{ users.username
                        }}</span>
                </h3>
            </label>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-location-arrow md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Thành phố: <span class="font-semibold"
                        v-for="city in citys.filter(items => items.code == users.citycode)">{{ city.name }}</span>
                </h3>
            </label>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-location-arrow md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Quận/Huyện: <span class="font-semibold"
                        v-for="district in districts.filter(items => items.code == users.districtcode)">{{ district.name
                        }}</span>
                </h3>
            </label>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-location-arrow md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Xã/Phường: <span class="font-semibold"
                        v-for="commune in communes.filter(items => items.code == users.communecode)">{{ commune.name
                        }}</span>
                </h3>
            </label>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-phone-alt md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Số điện thoại: <span class="font-semibold">{{ users.phone
                }}</span>
                </h3>
            </label>
            <div class="flex justify-center">
                <button @click="onShowInfo" :class="{ hidden: showIn4 }"
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
import addressService from '../../plugins/addressService'
import userService from '../../plugins/userService';
import toast from '../toast/toast.vue';
import updateInfo from '../information/updateinfor.vue'
export default
    {
        data() {
            return {
                isShowModel: false,
                isShowInfo: false,
                cityname: '',
                citys: [],
                districts: [],
                communes: [],
                users: [],
                user: '',
                showIn4: false,
                id: ''
            }
        },
        components:
        {
            toast,
            updateimg,
            updateInfo
        },
        mounted() {
            this.getUsers();
            this.user = userService.getUserToken();
            addressService.getCountry().then(data => {
                this.citys = data;
            });
            if (this.$route.params.id != this.user.id) {
                this.showIn4 = true
            }
            else {
                this.showIn4 = false
            }
        },
        methods: {

            onShow() {
                this.isShowModel = !this.isShowModel
            },
            onShowInfo() {
                this.isShowInfo = !this.isShowInfo
            },
            async getUsers() {
                try {
                    const result = await this.$axios.get(
                        `user/getbyid/` + this.$route.params.id
                    );
                    this.users = result.data;
                    addressService.getDistricts(result.data.citycode).then(data => {
                        this.districts = data;
                    });
                    addressService.getCommune(result.data.districtcode).then(data => {
                        this.communes = data;
                    });



                } catch (e) {
                    console.log(e);
                }
            },
            

        }
    }
</script>

<template>
    <div class="max-w-xl w-full mx-auto rounded-md shadow-md overflow-hidden mt-6">
        <div class="flex items-center px-4 py-2 mt-2 bg-white ">
            <h3 class="font-bold text-base lg:text-xl">Giới thiệu</h3>
        </div>
        <!--Chỉnh sửa ảnh đai diện-->
        <div class="flex items-center  px-4 py-2 bg-white ">
            <img class="h-12 w-12 rounded-md mr-2" src="../assets/login.gif" alt="Avatar">
            <button
                class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer">Đổi
                ảnh đại diện</button>
        </div>


        <!--Chỉnh sửa thông tin cá nhân-->
        <div class="px-2 py-2 mt-2">
            <p class="flex justify-center">Tôi là một coder</p>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-chat-bubble-user md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Họ và tên: <span class="font-semibold">Nguyễn Minh
                        Nhựt</span>
                </h3>
            </label>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-location-arrow md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Thành phố: <span class="font-semibold">Hồ Chí Minh</span>
                </h3>
            </label>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-location-arrow md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Quận/Huyện: <span class="font-semibold">Hóc Môn</span>
                </h3>
            </label>
            <label class="flex items-center mt-4 py-2 rounded-lg cursor-pointer ">
                <i class="text-violet-500  uil-phone-alt md:text-xl"></i>
                <h3 class=" text-sm md:block sm:block lg:block">Số điện thoại: <span class="font-semibold">0929518xxx</span>
                </h3>
            </label>
            <div class="flex justify-center">
                <button
                    class=" mt-4 py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer">Chỉnh
                    sửa thông tin</button>
            </div>

        </div>
    </div>

    <label @click="outWeb"
        class=" flex items-center mt-4 py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer ">
        <i class="text-violet-500 uil-exit mr-4 md:text-xl"></i>
        <h3 class="font-semibold  hidden text-xs  md:block  lg:text-base sm:block lg:block">Đăng xuất</h3>
    </label>
    
    <toast ref="toast"></toast>
</template>
<script>

import toast from '../components/toast.vue';
export default
    {
        data() {
            return
            {

            };
        },
        components:
        {
            toast
        },
        methods: {
            outWeb() {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.$refs.toast.showToast('Đăng xuất thành công')
                setTimeout(() => {
                    this.$router.push({ name: 'login' });
                }, 1000)
            },
        }
    }
</script>

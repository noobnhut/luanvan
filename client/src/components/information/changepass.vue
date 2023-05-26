<template>
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập mật khẩu</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
            </div>

            <div class="py-4 px-4">
                <div class="  w-full">
                    <input type="text" class="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none"
                       disabled[] placeholder="Nhập địa chỉ mail " v-model="email" />
                    <input type="text" class="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none"
                        placeholder="Nhập mật khẩu cũ " v-model="password" />
                    <input type="text" class="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none"
                        placeholder="Nhập mật khẩu mới " v-model="newpassword" />
                </div>
            </div>

            <div class="modal-footer py-3 px-4 ">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="updatepass">Cập nhập</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclose()">Đóng</button>
            </div>
        </div>
    </div>
    <toast ref="toast" />
</template>

<script>

import userService from '../../plugins/userService';
import toast from '../toast/toast.vue';
export default {
    emits: ["cancel"],
    data() {
        return {
            user: '',
            email: '',
            password: '',
            newpassword: '',

        };
    },
    components: { toast },
    mounted() {
        this.user = userService.getUserToken();
        this.email = this.user.email
    },
    methods: {
        onclose() {
            this.$emit('cancel')
        },
        async updatepass() {
            try {
                if (this.newpassword.length < 6) {
                    this.$refs.toast.showToast('Mật khẩu chưa đủ dài');
                }
                const result = await this.$axios.put(`user/updatepasswowrd/` + this.user.id,
                    {
                        email: this.email,
                        oldPassword: this.password,
                        newPassword: this.newpassword
                    });
                    this.$refs.toast.showToast(result.data.message)
            } catch (error) {
                console.log(error)
            }
        }

    },
}

</script>

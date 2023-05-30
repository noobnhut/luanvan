<template>
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập mật khẩu</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
            </div>

            <div class="py-4 px-4">
                <div class=" w-full">
                    <!--bắt đầu email
                    + v-model: email đại diện cho email người dùng  -->
                    <input type="text" class="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none"
                        disabled placeholder="Nhập địa chỉ mail " v-model="email" />

                    <!--bắt đầu mật khẩu cũ-->
                    <input type="password" class="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none"
                        placeholder="Nhập mật khẩu cũ " v-model="password" @focus="checkpasswordError"/>
                    <p class="text-red-500 text-sm ml-1" v-if="!password && passwordFocused">Mật khẩu bị trống.</p>
                         
                    <!--kết thúc mật khẩu cũ-->

                    <!--bắt đầu password mới-->
                    <input type="password" class="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none"
                        placeholder="Nhập mật khẩu mới " v-model="newpassword" @focus="checkNewpasswordError" />

                    <p class="text-red-500 text-sm ml-1" v-if="!newpassword && newpasswordFocused">Mật khẩu bị trống.</p>
                    <p class="text-red-500 text-sm ml-1" v-else-if="newpassword.length <= 7 && newpasswordFocused">Mật khẩu
                        có tối
                        thiểu 8
                        kí tự</p>
                    <p class="text-red-500 text-sm ml-1" v-else-if="!validnewPassword(newpassword) && newpasswordFocused">
                        Mật khẩu
                        chứa kí tự
                        đặc biệt " ~ / ) [ * ^ $ .... "</p>
                    <p class="text-red-500 text-sm ml-1" v-else-if="!validnewPassword2(newpassword) && newpasswordFocused">
                        Mật khẩu
                        có tối
                        thiểu 1 chữ cái hoa</p>
                    <!--kết thúc password -->
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
            newpasswordFocused:false,
            passwordFocused: false
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
        checkNewpasswordError() { this.newpasswordFocused = true; },
        checkpasswordError() { this.passwordFocused = true; },

        async updatepass() {
            this.newpasswordFocused=true
            const id = this.user.id
            userService.updatepass(this.email, this.password, this.newpassword, this.$refs, id);
        },
        validnewPassword(newpassword) {
            const re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            return re.test(newpassword);
        },
        validnewPassword2(newpassword) {
            const re = /[A-Z]/;
            return re.test(newpassword);
        },
    },
}

</script>

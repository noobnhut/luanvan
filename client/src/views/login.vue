<template>
  <div class="min-h-screen py-20 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 drop-shadow-2xl">
          <img src="../assets/login.gif" alt="" class="w-full h-full object-cover">
        </div>

        <div class="w-full lg:w-1/2 py-16 px-12">
          <h2 class="text-3xl mb-4">Đăng nhập</h2>
          <p class="mb-4">
            Chào mừng bạn đến với mạng xã hội của chúng tôi !
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

          <div class="mt-5">
            <button class="w-full block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6" @click="login">Đăng nhập</button>
          </div>


          <p class="mt-8">
            Bạn chưa có tài khoản ?
            <router-link to="/register" class="text-blue-500 hover:text-blue-700 font-semibold">
              Đăng ký tài khoản
            </router-link>
          </p>

        </div>

      </div>
    </div>
  </div>
  <toast ref="toast"></toast>
</template>

<script>

import toast from '../components/toast/toast.vue';
import authService from '../plugins/authService';

export default {
  data() {
    return {
      email: '',
      password: '',
      user: '',
      emailFocused: false,
      passwordFocused: false,
    };
  },
  components:
  {
    toast
  },

  methods: {
    checkemailError() {
      this.emailFocused = true;
    },
    checkpasswordError() {
      this.passwordFocused = true;
    },
    async login() {
      this.emailFocused = true,
        this.passwordFocused = true,
        authService.login(this.email, this.password, this.$refs, this.user)
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>
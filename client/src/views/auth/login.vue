<template>
  <div class="min-h-screen py-20 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200">
    <div class="container mx-auto">

      <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 drop-shadow-2xl">
          <img src="../../assets/login.gif" alt="" class="w-full h-full object-cover">
        </div>

        <div class="w-full lg:w-1/2 py-16 px-12">
          <h2 class="text-3xl mb-4">Đăng nhập</h2>
          <p class="mb-4">
            Chào mừng bạn đến với mạng xã hội của chúng tôi !
          </p>

          <!--bắt đầu email
          + v-model: email đại diện cho email người dùng
          + @focus => checkemailError cho phép bật tắc check lỗi input email
          + 2 if là 1 cái check rỗng và else if check định dạng email 
          : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          -->
          <div class="mt-5">
            <input type="text" placeholder="Email"
              class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="email" @focus="checkemailError" />
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
              v-model="password" @focus="checkpasswordError" />
          </div>
          <p class="text-red-500 text-sm ml-1" v-if="!password && passwordFocused">Mật khẩu bị trống.</p>
          <p class="text-red-500 text-sm ml-1" v-else-if="password.length <= 7 && passwordFocused">Mật khẩu có tối thiểu 8
            kí tự</p>
          <p class="text-red-500 text-sm ml-1" v-else-if="!validPassword(password) && passwordFocused">Mật khẩu chứa kí tự
            đặc biệt " ~ / ) [ * ^ $ .... "</p>
          <p class="text-red-500 text-sm ml-1" v-else-if="!validPassword2(password) && passwordFocused">Mật khẩu có tối
            thiểu 1 chữ cái hoa</p>
          <!--kết thúc password -->

          <div class="mt-5">
            <!--button login-->
            <button class="w-full block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6" @click="login">Đăng nhập</button>
          </div>

          <!--chuyển qua đăng kí-->
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

  <!--component toast thông báo !!!-->
  <toast ref="toast"></toast>
</template>

<script>
// import service xử lý đăng nhập đăng nhập
import authService from '../../plugins/authService';

// import toast component
import toast from '../../components/toast/toast.vue';

export default {
  data() {
    return {
      /* dữ liệu tạo ra để lưu trữ thông tin người dùng nhập vào*/
      email: '', password: '',
      /* biến tạo ra lưu dữ liệu sau đăng nhập user*/
      user: '',
      /* các biển kiểm tra bật tắt focus để validate form*/
      emailFocused: false, passwordFocused: false,
    };
  },
  components:
  {
    toast
  },

  methods: {
    // xử lý các focus bật tắt validate
    checkemailError() { this.emailFocused = true; },
    checkpasswordError() { this.passwordFocused = true; },

    // hàm đăng kí
    async login() {
      this.emailFocused = true,
        this.passwordFocused = true,
        authService.login(this.email, this.password, this.$refs, this.user);
    
    },

    // các re ràng buộc
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPassword(password) {
      const re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      return re.test(password);
    },
    validPassword2(password) {
      const re = /[A-Z]/;
      return re.test(password);
    },

  },
};
</script>
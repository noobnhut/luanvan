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
              v-model="email" />
           
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
         
          <!--kết thúc password -->

          <div class="mt-5">
            <!--button login-->
            <button class="w-full block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6" @click="login">Đăng nhập</button>
          </div>

         
        </div>
      </div>
    </div>
  </div>

  <toast ref="toast"></toast>
</template>

<script>

import toast from '../../components/toast/toast.vue';

export default {
  data() {
    return {
      /* dữ liệu tạo ra để lưu trữ thông tin người dùng nhập vào*/
      email: '', password: '',
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

    //ham login
    async login() {
      try {
        const login = await this.$axios.post(`loginadmin`, {
          email: this.email,
          password: this.password,
        });
        if (login.status === 200) {
          // Lưu thông tin người dùng vào localStorage hoặc sessionStorage
          localStorage.setItem('admin', JSON.stringify(login.data));
          localStorage.setItem('token', login.data.token);
          // Chuyển hướng đến trang chính của ứng dụng
          this.$refs.toast.showToast('Đăng nhập thành công')
          setTimeout(() => {
            window.location.href = `http://localhost:5173/adminlogin/`;
          }, 1000)

        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.log(error);
      }
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
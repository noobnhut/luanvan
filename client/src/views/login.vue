<template>
    
    <div class="min-h-screen py-20 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200">
        <div class="container mx-auto">
          <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 drop-shadow-2xl">
                <img src="../assets/login.gif" alt=""
                class="w-full h-full object-cover">
            </div>

            <div class="w-full lg:w-1/2 py-16 px-12">
              <h2  class="text-3xl mb-4">Đăng nhập</h2>
              <p class="mb-4">
                Chào mừng bạn đến với mạng xã hội của chúng tôi !
              </p>
              
                <div class="mt-5">
                  <input type="text" placeholder="Email" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full" v-model="email">
                </div>
                <div class="mt-5">
                  <input type="password" placeholder="Mật khẩu" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full" v-model="password">
                </div>
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


</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const login = await this.$axios.post(`login`, {
          email: this.email,
          password: this.password,
        });
        if (login.status === 200) {
          // Lưu thông tin người dùng vào localStorage hoặc sessionStorage
          localStorage.setItem('user', JSON.stringify(login.data));
          localStorage.setItem('token', login.data.token);
          // Chuyển hướng đến trang chính của ứng dụng
          this.$router.push({ name: 'home' });
          this.handleCart();
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.log(error);
      }
    },
  },
};
</script>
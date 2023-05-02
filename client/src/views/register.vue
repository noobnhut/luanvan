<template>
    
    <div class="min-h-screen py-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200">
        <div class="container mx-auto">
          <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 drop-shadow-2xl">
                <img src="../assets/login.gif" alt=""
                class="w-full h-full object-cover">
            </div>

            <div class="w-full lg:w-1/2 py-16 px-12">
              <h2  class="text-3xl mb-4">Đăng ký</h2>
              <p class="mb-4">
                Chào mừng bạn đến với mạng xã hội của chúng tôi !
              </p>
              
                <div class="mt-5">
                  <input type="text" placeholder="Họ và tên" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none " v-model="username">
                </div>
                <div class="mt-5">
                    <input type="text" placeholder="Số điện thoại" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none " v-model="phone">
                  </div>
                <div class="mt-5">
                  <input type="text" placeholder="Email" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full" v-model="email">
                </div>
                <div class="mt-5">
                  <input type="password" placeholder="Mật khẩu" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full" v-model="password">
                </div>
                <div class="mt-5">
                  <input type="text" placeholder="Địa chỉ" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full" v-model="address">
                </div>
               
                <div class="mt-5">
                  <button class="w-full block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6" @click="register">Đăng ký</button>
                </div>
                <p class="mt-8">
                  Bạn đã có tài khoản ?
                  <router-link to="/" class="text-blue-500 hover:text-blue-700 font-semibold">
                      Đăng nhập
                  </router-link>
              </p>
             
            </div>
          </div>
        </div>
      </div>


</template>

<script>

export default
    {
        data() {
            return {
                username: '',
                password: '',
                address: '',
                phone: '',
                email: '',
                repassword: '',
                emailError: ''
            };
        },
       
        methods:
        {
            async register() {
                // Validate the form inputs
                try {
                    // Send the registration request
                    const register = await this.$axios.post(`register`,
                        {
                            username: this.username,
                            password: this.password,
                            email: this.email,
                            phone: this.phone,
                            address: this.address,
                            status:false
                            
                        }
                    );

                    // If the registration is successful, redirect the user to the login page
                    if (register.status === 200) {
                        this.$router.push({ name: 'login' });
                    }
                } catch (error) {
                    // Handle any errors that occur during the registration process
                    console.error(error);
                    alert('An error occurred during registration. Please try again later.');
                }
            },
            validateForm() {
                // Check if all the required fields are not empty
                if (!this.email || !this.password || !this.username || !this.phone || !this.address) {
                    alert('Không được để trống');
                    return false;
                }

                // Validate email format using regular expression
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.email)) {
                    alert('Email nhập vào không đúng chuẩn.');
                    return false;
                }

                const TestPasss = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(this.password);
                if (!TestPasss) {
                    alert('Mật khẩu chưa đủ chuẩn');
                    return false;
                }

                // Validate phone number format
                const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
                if (!phoneRegex.test(this.phone)) {
                    alert('Số điện thoại phải đủ 10 số.');
                    return false;
                }

                return true;
            },




        }
    }
</script>
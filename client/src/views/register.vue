<template>
  <div class="min-h-screen py-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">

        <div class="w-full  py-16 px-12">
          <h2 class="text-3xl mb-4">Đăng ký</h2>
          <p class="mb-4">
            Chào mừng bạn đến với mạng xã hội của chúng tôi !
          </p>

          <div class="mt-5">
            <input type="text" placeholder="Họ và tên"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
              v-model="username">
          </div>

          <div class="mt-5">
            <input type="text" placeholder="Số điện thoại"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none "
              v-model="phone">
          </div>

          <div class="mt-5">
            <input type="text" placeholder="Email"
              class=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="email">
          </div>

          <div class="mt-5">
            <input type="password" placeholder="Mật khẩu"
              class=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="password">
          </div>

          <div class="md:flex mb-2 block mt-5 ">
            <div class="relative md:mr-2 mt-5" >
              <label>Thành phố:</label>
              <select id="select" name="select"  required
                class="block appearance-none w-full bg-white border  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled>Thành phố</option>
                <option v-for="city in citys" :key="city.code" :value="city.code" @change="getDistricts(city.name)">{{ city.name }}</option>
              </select>
            </div>
            <div class="relative md:mr-2 mt-5">
              <label >Quận huyện:</label>
              <select id="select" name="select " v-model="districts_code"
                class="block appearance-none w-full bg-white border  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled selected>Quận/Huyện</option>
                <option v-for="district in districts" :key="district.code" :value="district.code">{{ district.name }}</option>

              </select>
            </div>
            <div class="relative mt-5">
              <label >Xã phường:</label>
              <select id="select" name="select"
                class="block appearance-none w-full bg-white border  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm ">
                <option disabled selected>Xã/Phường</option>
                <option value="option1"></option>
              </select>
            </div>
          </div>

          <div class="mt-5">
            <input type="text" placeholder="Địa chỉ cụ thể:"
              class=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="address">
          </div>

          <div class="flex items-center justify-center w-full mt-2">
            <label for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                  </path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Nhấn để tải
                    ảnh hoặc video lên</span> </p>
                <!-- <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> -->
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
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
        emailError: '',
        
        districts_code:'',
        citys:[],
        districts:[]
      };
    },
     mounted()
     {
      this.getCountry();
     
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
              status: false

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

      async getCountry()
      {
        try {
          const data = await this.$axios.get('https://provinces.open-api.vn/api/')
          {
            this.citys=data.data; 
          }
          console.log(data.data)
        } catch (error) {
          
        }
      },
      async getDistricts(city_id)
      {
        console.log(city_id)
      }



    }
  }
</script>
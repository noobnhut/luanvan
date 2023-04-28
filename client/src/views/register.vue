<template>
    
    <section class="flex flex-col md:flex-row h-screen items-center">
    <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="https://mega.com.vn/media/news/1706_hinh-nen-phi-hanh-gia105.jpg" alt=""
            class="w-full h-full object-cover">
    </div>

    <div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
              flex items-center justify-center">
        <div class="w-full h-100">
                <!--Logo-->
                <div class="text-center mt-5">
                    <h2 class="mb-12 mt-1 pb-1 text-xl font-semibold">
                       Đăng ký tài khoản
                      </h2>
                </div>

            

            <form class="mt-6" action="#" method="POST">
                <div>
                    <label class="block text-gray-700">Email:</label>
                    <input type="email" name="" id="" placeholder="Nhập địa chỉ email"
                        class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        autofocus required>
                </div>

                <div class="mt-4">
                    <label class="block text-gray-700">Mật khẩu</label>
                    <input type="password" name="" id="" placeholder="Nhập mật khẩu" minlength="8" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                      focus:bg-white focus:outline-none" required>
                </div>

                <div class="text-right mt-2">
                    <a href="#"
                        class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Quên mật khẩu?</a>
                </div>

                <button type="submit" class="w-full block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg
                    px-4 py-3 mt-6">Đăng nhập</button>
            </form>

            <hr class="my-6 border-gray-300 w-full">

          
        <p class="mt-8">
            Bạn đã có tài khoản ?
            <router-link to="/login" class="text-blue-500 hover:text-blue-700 font-semibold">
                Đăng nhập tài khoản
            </router-link>
        </p>

        <p class="text-sm text-gray-500 mt-12 text-center">&copy; 2023 Mạng xã hội</p>
    </div>

</div>

</section>


</template>
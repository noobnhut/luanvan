<template>
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Đăng bài</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
              </div>

            <div class="py-4 px-4">

                <div class="flex items-center px-4 py-2  ">
                    <img class="w-10 h-10 rounded-full mr-2" src="../assets/login.gif" alt="Avatar">
                    <div>
                        <h3 class="text-gray-900 font-medium">Nguyễn Minh Nhựt</h3>
                    </div>
                </div>
                <div class="relative mb-2">
                    <select id="select" name="select"
                        class="block appearance-none w-full bg-white border  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                        <option disabled selected>Chọn loại bài đăng</option>
                        <option value="option1">Mua bán</option>
                        <option value="option2">Trao đổi</option>
                        <option value="option3">Trao tặng</option>
                        <option value="option3">Tìm kiếm</option>
                    </select>
                </div>

                <div class="md:flex mb-2 block  ">
                    <div class="relative md:mr-2 mt-1">
                        <select id="select" name="select"
                            class="block appearance-none w-full bg-white border  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                            <option disabled selected>Thành phố</option>
                            <option value="option1"></option>
                        </select>
                    </div>
                    <div class="relative md:mr-2 mt-1">
                        <select id="select" name="select "
                            class="block appearance-none w-full bg-white border  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                            <option disabled selected>Quận/Huyện</option>
                            <option value="option1"></option>
                        </select>
                    </div>
                    <div class="relative mt-1">
                        <select id="select" name="select"
                            class="block appearance-none w-full bg-white border  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm ">
                            <option disabled selected>Xã/Phường</option>
                            <option value="option1"></option>
                        </select>
                    </div>
                </div>
                <input type="text" class="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Nhập tiêu đề ">

                <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    placeholder="Nhập nội dung ..."></textarea>

                <div class="flex items-center justify-center w-full">
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

            </div>

            <div class="modal-footer py-3 px-4 ">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4">Đăng
                    bài</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclose()">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    methods: {
        onclose() {
            this.$emit('cancel')
        },
    },
}

</script>

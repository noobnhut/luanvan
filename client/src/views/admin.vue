<template>
    <div class="h-screen flex overflow-hidden">

        <div :class="{ hidden: isShow }">
            <div
                class="fixed inset-0 z-30 bg-gray-600 opacity-0 pointer-events-none transition-opacity ease-linear duration-300">
            </div>

            <!-- Small Screen Menu -->
            <div class="fixed inset-y-0 left-0 flex flex-col z-40 max-w-xs w-full bg-white">

                <!-- Brand Logo / Name -->
                <div class="flex items-center px-6 py-3 h-16 mt-2">
                    <router-link to="/adminlogin" class="cursor-pointer">
                        <div class="text-2xl font-bold tracking-tight text-gray-800">TRANG QUẢN LÝ</div>
                    </router-link>
                </div>
                <!-- @end Brand Logo / Name -->

                <div class="px-4 py-2 ">
                    <ul class="mt-16">
                        <!--view online-->
                        <li class="py-4" @click="isShow = !isShow">
                            <a
                                class="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 opacity-50" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                    <rect x="4" y="4" width="6" height="6" rx="1" />
                                    <rect x="14" y="4" width="6" height="6" rx="1" />
                                    <rect x="4" y="14" width="6" height="6" rx="1" />
                                    <rect x="14" y="14" width="6" height="6" rx="1" />
                                </svg>
                                Danh sách online
                            </a>
                        </li>
                        <!--view bài đăng-->
                        <li class="py-4" @click="isShow = !isShow">
                            <a 
                                class="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 opacity-50" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                    <line x1="4" y1="19" x2="20" y2="19" />
                                    <polyline points="4 15 8 9 12 11 16 6 20 10" />
                                </svg>
                                Quản lý bài đăng
                            </a>
                        </li>
                        <!--view danh mục-->
                        <li class="py-4" @click="isShow = !isShow">
                            <a href="#"
                                class="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 opacity-50" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                    <polyline points="14 3 14 8 19 8" />
                                    <path d="M17 21H7a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                    <line x1="9" y1="9" x2="10" y2="9" />
                                    <line x1="9" y1="13" x2="15" y2="13" />
                                    <line x1="9" y1="17" x2="15" y2="17" />
                                </svg>
                                Quản lý danh mục
                            </a>
                        </li>
                    </ul>

                    <div class="bg-orange-200 mb-10 p-6 rounded-lg mt-16 absolute bottom-0">
                        <h2 class="text-gray-800 text-lg leading-tight"> <strong class="font-bold">Trang quản lý</strong>
                        </h2>
                        <p class="text-gray-800 text-sm mb-4 leading-tight">Hoàn thiện công việc</p>
                    </div>

                </div>

            </div>
            <!-- @end Small Screen Menu -->
        </div>


        <!-- Menu Above Medium Screen -->

        <div class="bg-white w-64 min-h-screen overflow-y-auto hidden md:block shadow relative z-30">

            <!-- Brand Logo / Name -->
            <div class="flex items-center px-6 py-3 h-16 mt-2">
                <router-link to="/adminlogin" class="cursor-pointer" @click="showbanner = true">
                    <div class="text-2xl font-bold tracking-tight text-gray-800">TRANG QUẢN LÝ</div>
                </router-link>
            </div>
            <!-- @end Brand Logo / Name -->

            <div class="px-4 py-2 ">
                <ul class="mt-16">
                    <!--view online-->
                    <li class="py-4" @click="showbanner = false">
                        <router-link to="/adminlogin/user" 
                            class="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 opacity-50" width="24" height="24"
                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                <rect x="4" y="4" width="6" height="6" rx="1" />
                                <rect x="14" y="4" width="6" height="6" rx="1" />
                                <rect x="4" y="14" width="6" height="6" rx="1" />
                                <rect x="14" y="14" width="6" height="6" rx="1" />
                            </svg>
                            Danh sách online
                        </router-link>
                    </li>
                    <!--view bài đăng-->
                    <li class="py-4" @click="showbanner = false">
                        <router-link to="/adminlogin/user" 
                            class="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 opacity-50" width="24" height="24"
                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                <line x1="4" y1="19" x2="20" y2="19" />
                                <polyline points="4 15 8 9 12 11 16 6 20 10" />
                            </svg>
                            Quản lý bài đăng
                        </router-link  >
                    </li>
                    <!--view danh mục-->
                    <li class="py-4" @click="showbanner = false">
                        <router-link to="/adminlogin/category"
                            class="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 opacity-50" width="24" height="24"
                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                <polyline points="14 3 14 8 19 8" />
                                <path d="M17 21H7a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                <line x1="9" y1="9" x2="10" y2="9" />
                                <line x1="9" y1="13" x2="15" y2="13" />
                                <line x1="9" y1="17" x2="15" y2="17" />
                            </svg>
                            Quản lý danh mục
                        </router-link>
                    </li>
                </ul>

                <div class="bg-orange-200 mb-10 p-6 rounded-lg mt-16 absolute bottom-0">
                    <h2 class="text-gray-800 text-lg leading-tight"> <strong class="font-bold">Trang quản lý</strong></h2>
                    <p class="text-gray-800 text-sm mb-4 leading-tight">Hoàn thiện công việc</p>
                </div>

            </div>
        </div>

        <!-- @end Menu Above Medium Screen -->


        <div class="flex-1 flex-col relative z-0 overflow-y-auto">
            <!--nav top-->
            <div class="px-4 md:px-8 py-2 h-16 flex justify-between items-center shadow-sm bg-white">
                <div class="p-2 rounded-full hover:bg-gray-200 cursor-pointer md:hidden" @click="SidebarShow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-600" width="24" height="24" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>
                <div class="flex items-center w-2/3">
                    <div class="text-xl font-bold tracking-tight text-gray-800 md:hidden ml-2">TRANG QUẢN LÝ</div>
                </div>

                <div class="flex items-center">
                    <div class="relative">

                        <div @click="openavatar()"
                            class="cursor-pointer text-sm font-bold w-12 h-12 bg-blue-200 text-blue-600 flex items-center justify-center rounded-full">
                            ADMIN
                        </div>

                        <div class="absolute top-0 mt-12 right-0 w-48 bg-white py-2 shadow-md border border-gray-100 rounded-lg z-40"
                            v-show="isShowavatar">
                            <a class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600">Đăng xuất</a>
                        </div>

                    </div>
                </div>
            </div>

            <div class="md:max-w-6xl md:mx-auto px-4 py-8">
                <banner v-if="showbanner" />
                <router-view />


            </div>
        </div>
    </div>
</template>

<script>
import banner from '../components/admin/banner.vue'
export default
    {
        data() {
            return {
                isShow: true,
                isShowavatar: false,
                showbanner: false,

            };
        },
        components: {
            banner
        },
        methods:
        {
            SidebarShow() {
                this.isShow = !this.isShow
            },
            openavatar() {
                this.isShowavatar = !this.isShowavatar
            }
        }
    }
</script>
<template>
    <div class="max-w-xl w-full mx-auto rounded-md shadow-md overflow-hidden mt-6"
        v-for="post in posts.filter(item => item.type === type)">
        <!-- Header -->
        <editpost :postId="post.id"/>
        <div class="flex items-center px-4 py-2 bg-white border-b">
            <img class="w-10 h-10 rounded-full mr-2" :src="post.User.avatar" alt="Avatar">
            <div class="flex-grow">
                <h3 @click="goIn4(post.User.username, post.User.id)" class="text-gray-900 font-medium cursor-pointer">{{
                    post.User.username }}</h3>
                <p class="text-gray-500 text-sm">{{ getTimeFromCreatedAt(post.createdAt) }}</p>
            </div>
            <div class="ml-auto" :class="getclass(post.User.id)">
                <i class="uil-align-justify cursor-pointer" @click="toggleDropdown(post)"></i>
                <div :id="'dropdownHover_' + post.id"
                    class="z-10 absolute bg-white divide-y divide-gray-100 mt-1 mr-1 rounded-lg shadow w-50 dark:bg-gray-700"
                    v-show="isDropdownOpen(post.id)" @click="closeDropdown(post.id)">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                        <li class="py-2 px-1 flex items-center  hover:bg-gray-100" @click="openShowdelete(post.id)">
                            <i class=" text-violet-500 uil-times-square md:text-xl"></i>
                            <a class="block px-4 py-2 ">Xóa bài đăng</a>
                        </li>
                        <li class="py-2 px-1  flex items-center hover:bg-gray-100">
                            <i class=" text-violet-500   uil-edit-alt md:text-xl"></i>
                            <a class="block px-4 py-2 ">Cập nhập bài đăng</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="px-4 py-2 bg-white">
            <div class="block md:flex">
                <p class="text-blue-700 font-bold text-xs mr-2"
                    v-for="city in citys.filter(item => item.code == post.citycode)">#{{ city.name }}</p>
                <p class="text-blue-700 font-bold text-xs mr-2"
                    v-for="district in districts.filter(item => item.code == post.districtcode)">#{{ district.name }}</p>
                <p class="text-blue-700 font-bold text-xs mr-2"
                    v-for="commune in communes.filter(item => item.code == post.communecode)">#{{ commune.name }}</p>

            </div>
            <p class="text-blue-700 font-bold text-xs">#{{ post.type }}</p>
            <p class="text-slate-700 font-bold md:text-sm lg:text-base text-xs">
                {{ post.title }}
            </p>
            <p class="text-slate-700 md:text-sm lg:text-base text-xs">
                {{ post.post_content }}
            </p>
            <p class="text-blue-700 font-bold text-xs">Giá: {{ formatCurrency(post.price) }}</p>
        </div>
        <!-- Image -->
        <div class="flex items-center mt-4 py-2 px-4">
            <swiper :pagination="true" :modules="modules" class="mySwiper" :autoplay="{ delay: 1000 }">
                <swiper-slide v-for="img in post.Imgs">
                    <img class="max-w-sm w-full mx-auto" :src="img.url" alt="Bài đăng">
                </swiper-slide>
                <swiper-slide v-for="video in post.Videos">
                    <video loop controls class="max-w-sm w-full mx-auto ">
                        <source :src="video.url" type="video/mp4" />
                    </video>
                </swiper-slide>
            </swiper>
        </div>

        <!-- Footer -->
        <div class="px-4 py-2 bg-white">
            <div class="flex items-center mb-2">
                <button class="mr-3">
                    <span><i class="uil uil-heart"></i></span>
                </button>
                <button class="mr-3">
                    <span><i class="uil uil-comment"></i></span>
                </button>
                <button>
                    <span><i class="uil uil-share"></i></span>
                </button>
            </div>
            <p class="text-gray-900 font-medium mb-2">100 lượt thích</p>

            <div class="flex items-center mt-2">
                <img class="w-6 h-6 rounded-full mr-2" src="../../assets/login.gif" alt="Avatar">
                <input class="w-full px-4 py-2 border rounded-full text-gray-700 focus:outline-none" type="text"
                    placeholder="Thêm bình luận...">
            </div>

        </div>
    </div>
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowdelete">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="onclosedelete"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Xóa bài đăng</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclosedelete"></i>
            </div>
            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Bạn có muốn xóa ? </label>

                </div>
            </div>
            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="deleteImg()">Xóa</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclosedelete()">Đóng</button>
            </div>
        </div>
    </div>
    
</template>

<script>
import toast from '../toast/toast.vue';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

import "swiper/swiper-bundle.min.css";
// import required modules
import { Pagination } from 'swiper';

import userService from '../../plugins/userService';
import addressService from '../../plugins/addressService';
import  editpost from '../post/editpost.vue'
export default {
    components: {
        Swiper,
        SwiperSlide,
        editpost
    },
    props: ['type'],
    data() {
        return {
            posts: [],
            hidden: false,
            user: '',
            isShowdelete: false,
            id: '',
            result: '',
            citys: [],
            districts: [],
            communes: [],
            dropdownStates: {},
        }
    },

    setup() {
        return {
            modules: [Pagination],
        };
    },
    mounted() {
        this.user = userService.getUserToken();
        this.renderPost();
        addressService.getCountry().then(data => {
            this.citys = data;
        });
        addressService.getAllDistricts().then(data => {
            this.districts = data;
        });
        addressService.getAllCommune().then(data => {
            this.communes = data;
        });
    },
    
    methods:
    {
        async renderPost() {
            try {
                const result = await this.$axios.get(
                    `post/render`
                );
                this.posts = result.data;

            } catch (e) {
                console.log(e);
            }
        },

        formatCurrency(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đồng'
        },

        getTimeFromCreatedAt(createdAt) {
            const now = dayjs();
            const diffInSeconds = now.diff(createdAt, 'second');

            if (diffInSeconds < 60) {
                return `${diffInSeconds} giây`;
            } else if (diffInSeconds < 3600) {
                const diffInMinutes = Math.floor(diffInSeconds / 60);
                return `${diffInMinutes} phút`;
            } else if (diffInSeconds < 86400) {
                const diffInHours = Math.floor(diffInSeconds / 3600);
                return `${diffInHours} giờ`;
            } else {
                const diffInDays = Math.floor(diffInSeconds / 86400);
                return `${diffInDays} ngày`;
            }
        },

        goIn4(username, id) {
            window.location.href = `http://localhost:5173/information/${username}/${id}`;
        },

        getclass(id) {
            if (id !== this.user.id) {
                return 'hidden'
            }
            else {
                return ''
            }
        },

        toggleDropdown(post) {
            if (this.isDropdownOpen(post.id)) {
                this.closeDropdown(post.id);
            } else {
                this.openDropdown(post.id);
            }
        },

        openDropdown(postId) {
            this.dropdownStates[postId] = true
        },

        closeDropdown(postId) {
            this.dropdownStates[postId] = false
        },

        isDropdownOpen(postId) {
            return this.dropdownStates[postId] || false;
        },
        
        async deleteImg() {
            try {
                const result = await this.$axios.delete(`post/deleteimgbypost/` + this.id);
                if (result.status === 200) {
                    await Promise.all([
                        this.deletePost(this.id),
                        this.deleteVideo(this.id)
                    ]);
                }
                this.onclosedelete()
                location.reload()
            } catch (e) {
                console.log(e);
            }
        },

        async deleteVideo(id) {
            try {
                const result = await this.$axios.delete(`post/deleteVideobypost/` + id);
            } catch (e) {
                console.log(e);
            }
        },

        async deletePost(id) {
            try {
                const result = await this.$axios.delete(`post/delete/` + id);
            } catch (e) {
                console.log(e);
            }
        },

        openShowdelete(id) {
            this.id = id
            this.isShowdelete = !this.isShowdelete
        },

        onclosedelete() {
            this.isShowdelete = !this.isShowdelete
        },
    }
};
</script>
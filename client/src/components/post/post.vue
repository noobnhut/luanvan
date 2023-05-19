<template>
    <div class="max-w-xl w-full mx-auto rounded-md shadow-md overflow-hidden mt-6 "
        v-for="post in posts.filter(item => item.type === type)">
        <!-- Header -->
        <menupost v-if="isShowModel" @cancel="onShow" :postId="post.id" :citycode="post.citycode"
            :districtcode="post.districtcode" :communecode="post.communecode" />
        <div class="flex items-center px-4 py-2 bg-white border-b">
            <img class="w-10 h-10 rounded-full mr-2" :src="post.User.avatar" alt="Avatar">

            <div class="flex-grow">
                <h3 @click="goIn4(post.User.username, post.User.id)" class="text-gray-900 font-medium cursor-pointer">{{
                    post.User.username }}</h3>
                <p class="text-gray-500 text-sm">{{ getTimeFromCreatedAt(post.createdAt) }}</p>
            </div>

            <div class=" ml-auto" :class="getclass(post.User.id)">
                <i class="uil-align-justify cursor-pointer" @click="toggleDropdown(post)"></i>
                <div :id="'dropdownHover_' + post.id" class="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg"
                    v-show="isDropdownOpen(post.id)" @click="closeDropdown(post.id)">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                        <li class="py-2 px-1 flex items-center hover:bg-gray-100" @click="openShowdelete(post.id)">
                            <i class="text-violet-500 uil-times-square md:text-xl"></i>
                            <a class="md:block px-4 py-2 hidden">Xóa bài đăng</a>
                        </li>
                        <li class="py-2 px-1 flex items-center hover:bg-gray-100" @click="onShow">
                            <i class="text-violet-500 uil-edit-alt md:text-xl"></i>
                            <a class="md:block px-4 py-2 hidden">Cập nhập bài đăng</a>
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
            <div class="flex">
                <p class="text-blue-700 font-bold text-xs mr-2">#{{ post.Category.cat_name }}</p>
                <p class="text-blue-700 font-bold text-xs">#{{ post.type }}</p>
            </div>
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

        <!-- Footer action  -->
        <div class="px-4 py-2 bg-white">
            <div class="flex items-center mb-2">
                <!--like handle-->
                <div class="action mr-3">
                    <!-- Sử dụng v-if để kiểm tra xem sản phẩm có trong danh sách thích hay không -->
                    <span v-if="likes.some(item => item.id_post === post.id && item.id_user === user.id)">
                        <!-- Sử dụng v-for để lặp lại các sản phẩm trong danh sách thích -->
                        <span v-for="like in likes.filter(item => item.id_post === post.id && item.id_user === user.id)">
                            <!-- Kiểm tra trạng thái của sản phẩm và sử dụng màu đỏ hoặc #ccc tương ứng -->
                            <i class="fa fa-heart" :style="{ color: like.status ? 'red' : '#ccc' }"
                                @click="unlike(like, post.id)"></i>
                        </span>
                    </span>
                    <!-- Nếu không có sản phẩm nào trong danh sách thích, hiển thị chữ màu #ccc -->
                    <span v-else>
                        <i class="fa fa-heart" style="color: #ccc" @click="addlike(post.id)"></i>
                    </span>
                </div>
                <!--post comment-->
                <button class="mr-3" @click="focusComment">
                    <span><i class="uil uil-comment"></i></span>
                </button>

                <button>
                    <span><i class="uil uil-share"></i></span>
                </button>
            </div>
            <div>
                <p class="text-gray-900 font-medium mb-2">{{ resultLike(post.id) }} lượt thích</p>
            </div>
            <div class="text-gray-900 text-sm font-bold mb-2 cursor-pointer" @click="opencomment">Xem tất cả bình luận</div>

            <!--post comment-->
            <div class="flex items-center mt-2">
                <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                <input class="w-full px-4 py-2 border rounded-full text-gray-700 focus:outline-none" type="text"
                    ref="comment" placeholder="Thêm bình luận...">
            </div>

        </div>
        <view_comment v-if="isShowcomment" @cancel="opencomment" :postId="post.id"></view_comment>
    </div>

    <!--delete-->
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
import menupost from '../post/menupost.vue';
import view_comment from '../post/view_comment.vue';
export default {
    components: {
        Swiper,
        SwiperSlide,
        menupost,
        view_comment
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
            isShowModel: false,
            likes: [],
            isShowcomment: false

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
        this.getLike()
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

        async getLike() {
            try {
                const result = await this.$axios.get(`like/getlike`);
                this.likes = result.data
            } catch (error) {
                console.log(error)
            }
        },

        async unlike(like, postid) {
            try {
                const result = await this.$axios.post(`like/addlike`,
                    {
                        id_user: like.id_user,
                        id_post: postid,
                        id: like.id
                    });
                this.getLike()
            } catch (error) {
                console.log(error)
            }
        },

        async addlike(postid) {
            try {
                const result = await this.$axios.post(`like/addlike`,
                    {
                        id_user: this.user.id,
                        id_post: postid,
                        status: 'true'
                    });
                this.getLike()

            } catch (error) {
                console.log(error)
            }
        },

        resultLike(id) {
            return this.likes.filter(like => like.id_post === id).length;
        },

        openShowdelete(id) {
            this.id = id
            this.isShowdelete = !this.isShowdelete
        },

        onclosedelete() {
            this.isShowdelete = !this.isShowdelete
        },

        onShow() {
            this.isShowModel = !this.isShowModel
        },

        focusComment() {
            this.$refs['comment'][0].focus()
        },

        opencomment() {
            this.isShowcomment = !this.isShowcomment
        }


    }
};
</script>
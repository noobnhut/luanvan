<template>
    <div class="max-w-xl w-full mx-auto rounded-md shadow-md overflow-hidden mt-6 " v-for="(post,index) in posts" :key="index">
        <!-- Header -->
        <menupost v-if="isShowModel" @cancel="onShow" :postId="postId" :citycode="post.citycode"
            :districtcode="post.districtcode" :communecode="post.communecode" />

        <div class="flex items-center px-4 py-2 bg-white border-b">
            <img class="w-10 h-10 rounded-full mr-2" :src="post.User.avatar" alt="Avatar">

            <div class="flex-grow">
                <h3 @click="goIn4(post.User.username, post.User.id)" class="text-gray-900 font-medium cursor-pointer">{{
                    post.User.username }}</h3>
                <p class="text-gray-500 text-sm">{{ getTimeFromCreatedAt(post.createdAt) }}</p>
            </div>
            <div class="ml-auto">
                <span class="bg-blue-200  font-bold py-2 px-1 rounded-md"
                    :class="{ ' text-blue-500': post.status, 'text-red-500': !post.status }">
                    {{ post.status ? 'Đã bán' : 'Chưa bán' }}
                </span>
            </div>
            <div class="ml-auto" :class="getclass(post.User.id)">
                <i class="uil-align-justify cursor-pointer" @click="toggleDropdown(post)"></i>
                <div :id="'dropdownHover_' + post.id"
                    class="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg mr-2" v-show="isDropdownOpen(post.id)"
                    @click="closeDropdown(post.id)">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                        <li class="py-2 px-1 flex items-center hover:bg-gray-100" @click="openShowdelete(post.id)">
                            <i class="text-violet-500 uil-times-square md:text-xl"></i>
                            <a class="md:block px-4 py-2 hidden">Xóa bài đăng</a>
                        </li>
                        <li class="py-2 px-1 flex items-center hover:bg-gray-100" @click="onShow(post.id)">
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
                    {{ resultLike(post.id) }}
                </div>
                <!--post comment-->
                <button class="mr-3" @click="focusComment(index)">
                    <span><i class="uil uil-comment"></i></span>
                </button>

                <button>
                    <span><i class="uil uil-share" @click="share(post)"></i></span>
                </button>

                <div class="ml-auto" :class="getclass2(post.User.id)">
                    <span v-if="follows.some(item => item.id_post === post.id && item.id_user === user.id)">
                        <!-- Sử dụng v-for để lặp lại các sản phẩm trong danh sách thích -->
                        <span
                            v-for="follow in follows.filter(item => item.id_post === post.id && item.id_user === user.id)">
                            <!-- Kiểm tra trạng thái của sản phẩm và sử dụng màu đỏ hoặc #ccc tương ứng -->
                            <i class="fa-solid fa-bookmark text-xl" :style="{ color: follow.status ? 'black' : '#ccc' }"
                                @click="unfollow(follow, post.id)"></i>
                        </span>
                    </span>
                    <!-- Nếu không có sản phẩm nào trong danh sách thích, hiển thị chữ màu #ccc -->
                    <span v-else>
                        <i class="fa-solid fa-bookmark text-xl" style="color: #ccc" @click="addfollow(post.id)"></i>
                    </span>
                </div>
            </div>


            <div class="text-gray-900 text-sm font-bold mb-2 cursor-pointer" @click="opencomment(post.id)">Xem tất cả bình
                luận</div>

            <!--post comment-->
            <div class="flex items-center mt-2">
                <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm" type="text"
                    v-model="comments" placeholder="Thêm bình luận..." :ref="'input_' + index" v-on:keyup.enter="comment(post.id)"></textarea>
            </div>

        </div>

        <view_comment v-if="isShowcomment" @cancel="opencomment" :postId="postId"></view_comment>
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
                    @click="deletePost()">Xóa</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclosedelete()">Đóng</button>
            </div>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>

<script>

import dayjs from 'dayjs';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/swiper-bundle.min.css";
import { Pagination } from 'swiper';

import userService from '../../plugins/userService';
import postService from '../../plugins/postService';
import addressService from '../../plugins/addressService';

import toast from '../toast/toast.vue';
import menupost from '../post/menupost.vue';
import view_comment from '../post/view_comment.vue';

export default {
    components: {
        Swiper,
        SwiperSlide,
        menupost,
        view_comment,
        toast
    },
    props: ['type','filter'],

    data() {
        return {
            posts: [], citys: [], districts: [], communes: [],
            follows: [], likes: [],
            hidden: false, isShowdelete: false, isShowModel: false, isShowcomment: false,
            user: '', id: '', result: '', comments: '', postId: ''
            , dropdownStates: {},
        }
    },

    setup() {
        return {
            modules: [Pagination],
        };
    },

    mounted() {
        this.user = userService.getUserToken();

        postService.renderPost().then((data) => {
            
            if (this.type === '' && this.filter === '') {
                this.posts = data.filter(item => item.User.id == this.$route.params.id);
            }
            if(this.filter !== '' && this.type === '')
            {
                this.posts = data.filter(item=>item.id == this.filter)
            }
            if(this.type !== '' && this.filter === '' )
            {
                this.posts = data.filter(item=>item.type == this.type)
            }
            
        });

        postService.getLike().then((data) => { this.likes = data });
        postService.getfollow().then((data) => { this.follows = data })

        addressService.getCountry().then(data => { this.citys = data; });
        addressService.getAllDistricts().then(data => { this.districts = data; });
        addressService.getAllCommune().then(data => { this.communes = data; });

    },
    methods:
    {
        // các method format và goin4
        formatCurrency(value) {
            return postService.formatCurrency(value)
        },
        getTimeFromCreatedAt(createdAt) {
            return postService.getTimeFromCreatedAt(createdAt)
        },
        goIn4(username, id) {
            window.location.href = `http://localhost:5173/information/${username}/${id}`;
        },

        //delete post
        async deletePost() {
            if (this.id) {
                const id = this.id
                await postService.deletePostAll(id)
            }
        },
        
        //handle like
        async addlike(postid) {
            const id_user = this.user.id
            await postService.addlike(id_user, postid)
            postService.getLike().then((data) => { this.likes = data });

        },
        async unlike(like, postid) {
            const id_user = like.id_user;
            const id = like.id
            await postService.unlike(id_user, id, postid)
            postService.getLike().then((data) => { this.likes = data });
        },
        resultLike(id) {
            return postService.resultLike(id, this.likes)
        },

        //handle comments
        async comment(id) {
            const id_user = this.user.id;
            const result = await postService.addcomment(id, id_user, this.comments);
            if (result.status === 200) {
                this.comments = ''
                this.opencomment()
            }
        },

        // handle share
        share(post) {
            postService.share(post, this.$refs)
        },
        // handle follow
        async unfollow(follow, postid) {
            const id_user = follow.id_user
            const id = follow.id;
            const result = await postService.unfollow(id_user, id, postid)
            if (result.status == 200) {
                postService.getfollow().then((data) => { this.follows = data })
            }
        },
        async addfollow(postid) {
            const id_user = this.user.id;
            const result = await postService.addfollow(id_user, postid)
            if (result.status == 200) {
                postService.getfollow().then((data) => { this.follows = data })
            }
        },

        // đóng mở các component con 
        getclass(id) {
            if (id !== this.user.id) {
                return 'hidden'
            }
            else {
                return ''
            }
        },
        getclass2(id) {
            if (id !== this.user.id) {
                return ''
            }
            else {
                return 'hidden'
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
        openShowdelete(id) {
            this.id = id
            this.isShowdelete = !this.isShowdelete
        },
        onclosedelete() {
            this.isShowdelete = !this.isShowdelete
        },
        onShow(id) {
            this.postId = id
            this.isShowModel = !this.isShowModel
        },
        focusComment(index) {
            this.$refs['input_' + index][0].focus();
        },
        opencomment(id) {
            this.postId = id
            this.isShowcomment = !this.isShowcomment
        },
    }
};
</script>
<template>
    <div class="shadow-md mt-2">       
       
        <span class="font-bold text-xl px-8">Mọi người</span>
        <div v-for="search in searchs">
            <div class="max-w-xl w-full ml-6 overflow-hidden mt-6 "
                v-for="user in users.filter(item => item.id == search.id_user)">
                <!-- Header -->
                <div class="flex items-center px-4 py-2">
                    <img class="w-12 h-12 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                    <div class="flex-grow">
                        <h3 @click="goIn4(user.username, user.id)" class="text-gray-900 font-medium cursor-pointer">{{
                            user.username }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-for="search in searchs" >
    <div class="max-w-xl w-full mx-auto rounded-md shadow-md overflow-hidden mt-6 " v-for="post in posts.filter(item=>item.id==search.id)">
        <!-- Header -->
        <div class="flex items-center px-4 py-2 bg-white border-b">
            <img class="w-10 h-10 rounded-full mr-2" :src="post.User.avatar" alt="Avatar">

            <div class="flex-grow">
                <h3 @click="goIn4(post.User.username, post.User.id)" class="text-gray-900 font-medium cursor-pointer">{{
                    post.User.username }}</h3>
                <p class="text-gray-500 text-sm">{{ getTimeFromCreatedAt(post.createdAt) }}</p>
            </div>
            <div class="ml-auto">
                <span class="bg-blue-200  font-bold py-2 px-1 rounded-md" :class="{' text-blue-500': post.status, 'text-red-500': !post.status}">
                    {{ post.status ? 'Đã bán' : 'Chưa bán' }}
                  </span>
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
                <button class="mr-3" @click="focusComment">
                    <span><i class="uil uil-comment"></i></span>
                </button>

                <button>
                    <span><i class="uil uil-share" @click="share(post)"></i></span>
                </button>

                <div class="ml-auto" :class="getclass2(post.User.id)">
                    <span v-if="follows.some(item => item.id_post === post.id && item.id_user === user.id)">
                        <!-- Sử dụng v-for để lặp lại các sản phẩm trong danh sách thích -->
                        <span v-for="follow in follows.filter(item => item.id_post === post.id && item.id_user === user.id)">
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

            <div class="text-gray-900 text-sm font-bold mb-2 cursor-pointer" @click="opencomment(post.id)">Xem tất cả bình luận</div>

            <!--post comment-->
            <div class="flex items-center mt-2">
                <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm" type="text"
                    v-model="comments" placeholder="Thêm bình luận..." v-on:keyup.enter="comment(post.id)"></textarea>
            </div>

        </div>

        <view_comment v-if="isShowcomment" @cancel="opencomment" :postId="postId"></view_comment>
    </div> 
</div>
    <toast ref="toast"></toast>
</template>

<script>
import toast from '../toast/toast.vue';
import dayjs from 'dayjs';

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
import view_comment from '../post/view_comment.vue';
export default {
    components: {
        Swiper,
        SwiperSlide,
        view_comment,
        toast
    },
    props: ['type'],
    data() {
        return {
            posts: [],
            hidden: false,
            user: '',
            id: '',
            result: '',
            citys: [],
            districts: [],
            communes: [],
            likes: [],
            isShowcomment: false,
            comments: '',
            follows:[],
            postId:'',
            searchs:[],
            users: []

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
        this.getLike();
        this.getfollow();
        this.searchList();
        this.renderUser();

    },
    methods:
    {
        async renderPost() {
            try {
                const result = await this.$axios.get(
                    `post/render`)
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
        async renderUser() {
            try {
                const result = await this.$axios.get('user/get');
                this.users = result.data;
            } catch (error) {
                console.log(error)
            }
        },
        goIn4(username, id) {
            window.location.href = `http://localhost:5173/information/${username}/${id}`;
        },

        getclass2(id) {
            if (id !== this.user.id) {
                return ''
            }
            else {
                return 'hidden'
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

        focusComment() {
            this.$refs['comment'][0].focus()
        },

        opencomment(id) {
            this.postId=id
            this.isShowcomment = !this.isShowcomment
        },

        async comment(id) {
            try {
                const result = await this.$axios.post(`comment/create`,
                    {
                        id_user: this.user.id,
                        id_post: id,
                        comment_content: this.comments
                    })

                this.comments = '';
                this.opencomment()
            } catch (error) {
                console.log(error)
            }
        },

        share(post) {
            const path = `${import.meta.env.VITE_API_BASE_URL_API}detailpost/${post.title}/${post.id}`;
            const tempInput = document.createElement('input');
            tempInput.value = path;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            this.$refs.toast.showToast('Đường dẫn đã lưu');

        },

        async getfollow() {
            try {
                const result = await this.$axios.get(`follow/getfollow`);
                this.follows = result.data
            } catch (error) {
                console.log(error)
            }
        },

        async unfollow(follow, postid) {
            try {
                const result = await this.$axios.post(`follow/addfollow`,
                    {
                        id_user: follow.id_user,
                        id_post: postid,
                        id: follow.id
                    });
                this.getfollow()
            } catch (error) {
                console.log(error)
            }
        },

        async addfollow(postid) {
            try {
                const result = await this.$axios.post(`follow/addfollow`,
                    {
                        id_user: this.user.id,
                        id_post: postid,
                        status: 'true'
                    });
                this.getfollow()

            } catch (error) {
                console.log(error)
            }
        },

        async searchList()
        {
            try {
                const result = await this.$axios.get(`post/search?q=${this.$route.query.q}`);
                this.searchs = result.data;
            } catch (error) {
                console.log(error)
            }
        }



    }
};
</script>
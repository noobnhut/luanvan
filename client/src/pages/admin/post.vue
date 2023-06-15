<template>
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-800">Quản lý bài đăng</h2>
    </div>

    <!-- Dropdown menu -->
    <div class="md:flex mb-2 block">
        <div class=" relative md:mr-2 mt-5">
            <label>Chọn người dùng:</label>
            <select v-model="userid"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.username }}
                </option>
            </select>
        </div>

        <div class=" relative md:mr-2 mt-5">
            <label>Chọn danh mục sản phẩm:</label>
            <select v-model="catid"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option v-for="cat in cats" :key="cat.id" :value="cat.id">
                    {{ cat.cat_name }}
                </option>
            </select>
        </div>

        <div class=" relative md:mr-2 mt-5">
            <label>Chọn loại bài đăng:</label>
            <select id="select" name="select" v-model="type"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                <option value="Tìm kiếm">Tìm kiếm</option>
                <option value="Trao tặng">Trao tặng</option>
            </select>

        </div>
    </div>
    <div class=" rounded-md bg-white ">
        <span @click="filterPost()"
            class="px-2 py-2 rounded-sm text-sm uppercase tracking-wide font-semibold bg-blue-200 text-blue-800 cursor-pointer">Lọc
            bài đăng</span>
    </div>
    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped cursor-pointer">
            <thead>
                <tr class="text-left ">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tiêu đề</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Nội dung bài đăng</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Địa chỉ</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Hình ảnh và video</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tổng bình luận</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tổng lượt thích</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tổng lưu bài đăng</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Ngày tạo</th>
                </tr>
            </thead>
            <tbody class="text-sm">

                <tr class="focus-within:bg-gray-200 overflow-hidden"
                    v-for="(post, index) in posts.filter(items => items.User.isUser == 1)" :key="index">
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{ post.title }}
                        </span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{ post.post_content }}
                        </span>
                    </td>

                    <td class="border-t">
                        <div class="flex items-center text-gray-700">
                            <div v-for="city in citys.filter(items => items.code == post.citycode)">
                                <span v-for="district in city.districts.filter(items => items.code == post.districtcode)">
                                    <span v-for="commune in district.wards.filter(items => items.code == post.communecode)">
                                        <span>{{ commune.name + ', ' + district.name + ', ' +
                                            city.name
                                        }}</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </td>

                    <td class="border-t">
                        <span class="text-blue-700 px-6 py-4 flex items-center " @click="oncloseIMGID(post.id)">Xem ảnh và
                            video</span>
                    </td>

                    <td class="border-t flex items-center">
                        <span class="text-gray-700 px-6 py-4 ">{{ sumcomment(post.id) }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ sumlike(post.id) }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ sumfollow(post.id) }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ formattedDate(post.createdAt) }}</span>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>

    <!-- Image -->

    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowIMG">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="oncloseIMG"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Danh sách ảnh và video</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="oncloseIMG"></i>
            </div>
            <div class="px-4" v-for="post in posts.filter(items => items.id === idPost)">
                <div class="flex items-center mt-4 py-2 px-4">
                    <swiper :pagination="true" :modules="modules" class="mySwiper" :autoplay="{ delay: 1000 }">
                        <swiper-slide v-for="img in post.Imgs">
                            <img style="width:100px;" class=" mx-auto" :src="img.url" alt="Bài đăng">
                        </swiper-slide>
                        <swiper-slide v-for="video in post.Videos">
                            <video style="width:100px;" loop controls class=" mx-auto ">
                                <source :src="video.url" type="video/mp4" />
                            </video>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="py-3 px-4">

                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="oncloseIMG()">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>
import addressService from '../../plugins/addressService';
import userService from '../../plugins/userService';
import postService from '../../plugins/postService';
import dayjs from 'dayjs';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/swiper-bundle.min.css";
import { Pagination } from 'swiper';
export default {
    data() {
        return {
            citys: [],
            posts: [],
            likes: [],
            comments: [],
            follows: [],
            isShowIMG: false,
            idPost: '',
            userid: '',
            users: [],
            cats: [],
            type: '',
            catid: ''
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Pagination],
        };
    },
    mounted() {
        addressService.getCountry().then(data => {
            this.citys = data;
        });
        postService.renderPost().then((data) => {
            this.posts = data
        });
        postService.getLike().then((data) => { this.likes = data })
        postService.getcomment().then((data) => { this.comments = data })
        postService.getfollow().then((data) => { this.follows = data })
        userService.renderUser().then((data) => { this.users = data });
        this.getCat()
    },
    methods:
    {
        formattedDate(time) {
            return dayjs(time).format('DD-MM-YYYY HH:mm:ss');
        },
        oncloseIMG() {
            this.isShowIMG = !this.isShowIMG
        },
        oncloseIMGID(id) {
            this.idPost = id
            this.isShowIMG = !this.isShowIMG
        },
        sumlike(postID) {
            let sum = 0;
            for (let i = 0; i < this.likes.length; i++) {
                if (this.likes[i].id_post === postID) {
                    sum++;
                }
            }
            return sum;
        },
        sumcomment(postID) {
            let sum = 0;
            for (let i = 0; i < this.comments.length; i++) {
                if (this.comments[i].id_post === postID) {
                    sum++;
                }
            }
            return sum;
        },
        sumfollow(postID) {
            let sum = 0;
            for (let i = 0; i < this.follows.length; i++) {
                if (this.follows[i].id_post === postID) {
                    sum++;
                }
            }
            return sum;
        },

        async getCat() {
            try {
                const result = await this.$axios.get(
                    `getcat`
                );
                this.cats = result.data;


            } catch (e) {
                console.log(e);
            }
        },
        resetFilter() {
            this.type = ''
            this.userid = ''
            this.catid = ''
        },
        filterPost() {
           
            if (!this.userid && !this.catid && this.type) {
                postService.renderPost().then((data) => {
                    this.posts = data.filter(items => items.type === this.type)
                });

            } else if (this.userid && !this.catid && !this.type) {
                postService.renderPost().then((data) => {
                    this.posts = data.filter(items => items.User.id === this.userid)
                });

            } else if (!this.userid && this.catid && !this.type) {
                postService.renderPost().then((data) => {
                    this.posts = data.filter(items => items.Category.id === this.catid)
                });

            }
            else if (!this.userid) {
                postService.renderPost().then((data) => {
                    this.posts = data.filter(items => items.type === this.type && items.Category.id === this.catid)
                });

            } else if (!this.catid) {

                postService.renderPost().then((data) => {
                    this.posts = data.filter(items => items.type === this.type && items.User.id === this.userid)
                });

            } else if (!this.type) {

                postService.renderPost().then((data) => {
                    this.posts = data.filter(items => items.Category.id === this.catid && items.User.id === this.userid)

                });

            } else {
                postService.renderPost().then((data) => {
                this.posts = data.filter(items => items.type === this.type && items.User.id === this.userid && items.Category.id === this.catid)
            });
            }
        }

    }
}
</script>
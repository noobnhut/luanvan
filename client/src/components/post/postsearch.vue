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
    
    <div v-for="search in searchs">
        <post :filter="search.id" type=""/>
    </div>
    <toast ref="toast"></toast>
</template>

<script>
import toast from '../toast/toast.vue';
import dayjs from 'dayjs';
import post from './post.vue';
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
import postService from '../../plugins/postService';
import view_comment from '../post/view_comment.vue';
export default {
    components: {
        Swiper,
        SwiperSlide,
        view_comment,
        toast,
        post
    },
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
            follows: [],
            postId: '',
            searchs: [],
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

        postService.renderPost().then((data) => {
           this.posts = data;

        });

        postService.getLike().then((data) => { this.likes = data });
        postService.getfollow().then((data) => { this.follows = data })

        addressService.getCountry().then(data => { this.citys = data; });
        addressService.getAllDistricts().then(data => { this.districts = data; });
        addressService.getAllCommune().then(data => { this.communes = data; });
        this.searchList();
        this.renderUser();

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
            if (result.status === 200) {
                postService.getfollow().then((data) => { this.follows = data })
            }
        },
        async addfollow(postid) {
            const id_user = this.user.id;
            const result = await postService.addfollow(id_user, postid)
            if (result.status === 200) {
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
        focusComment() {
            this.$refs['comment'][0].focus()
        },
        opencomment(id) {
            this.postId = id
            this.isShowcomment = !this.isShowcomment
        },
        async searchList() {
            try {
                const result = await this.$axios.get(`post/search?q=${this.$route.query.q}`);
                this.searchs = result.data;
            } catch (error) {
                console.log(error)
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


    }
};
</script>
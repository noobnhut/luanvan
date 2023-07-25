<template>
    <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="onclose"></div>

        <div class="fixed inset-0 flex items-center justify-center">
            <div
                class=" flex flex-col bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-hidden md:max-h-[75%] h-full">
                <div class="top-cover flex flex-row items-center py-3 px-4 border-b-4 border-gray-100 ">
                    <h5 class=" text-sm md:text-lg font-semibold flex-grow"
                        v-for="post in posts.filter(item => item.id == postId)">
                        Bài viết của {{ post.user.username }} - <span
                            class="bg-blue-200 text-blue-800 font-bold py-2 px-1 rounded-md1 text-sm md:text-base">{{
                                post.title }}</span>
                    </h5>
                    <button type="button" @click="onclose"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-hide="defaultModal">
                        <i class="uil-multiply"></i>
                    </button>
                </div>
                <div class="flex-grow overflow-auto ">
                    <!-- Nội dung cuộn -->
                    <div class="py-4 px-2 ">
                        <div class="flex items-center mt-1"
                            v-for="comment in comments.filter(item => item.Post.id == postId)">
                            <img @click="goIn4(comment.user.username, comment.user.id)" class="w-6 h-6 rounded-full mr-2"
                                :src="comment.user.avatar" alt="Avatar" />
                            <div class="px-2 py-2 border rounded-md text-gray-700 text-sm bg-gray-100"
                                v-if="(showedit, idcomment != comment.id)">
                                <p class="font-bold text-base">{{ comment.U=user.username }}</p>
                                <p class="text-xs">{{ getTimeFromCreatedAt(comment.createdAt) }}</p>
                                <p>{{ comment.comment_content }}</p>
                            </div>
                            
                            <div class="px-2 py-2 w-full text-gray-700 text-sm"
                                v-if="(!showedit, idcomment === comment.id)">
                                <textarea
                                    class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm"
                                    type="text" v-model="comment_content" placeholder="Thêm bình luận..."
                                    v-on:keyup.enter="updateComment(comment.id)"></textarea>
                            </div>

                            <div class="ml-2" :class="getclass(comment.user.id)" v-if="(showedit, idcomment != comment.id)">
                                <i class="fa-solid fa-ellipsis cursor-pointer" @click="toggleDropdown(comment)"></i>
                                <div id="dropdownHover"
                                    class="z-10 absolute bg-white divide-y divide-gray-100 mt-1 mr-1 rounded-lg shadow w-50 dark:bg-gray-700"
                                    v-show="isDropdownOpen(comment.id)" @click="closeDropdown(comment.id)">
                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                                        <li class="py-2 px-1 flex items-center hover:bg-gray-100">
                                            <i class="text-violet-500 uil-exit md:text-xl"></i>
                                            <a @click="deletecomment(comment.id)" class="block px-4 py-2">Xóa</a>
                                        </li>
                                        <li class="py-2 px-1 flex items-center hover:bg-gray-100"
                                            @click="openEditComment(comment)">
                                            <i class="text-violet-500 uil-edit-alt md:text-xl"></i>
                                            <a class="block px-4 py-2">Chỉnh sửa</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                           
                        </div>
                    </div>
                </div>
                <div class="modal-footer py-3 px-4 ">
                    <div class="flex items-center mt-2">
                        <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar"
                            v-if="this.user.length > 0" />
                        <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm"
                            ttype="text" ref="comment" placeholder="Thêm bình luận..."
                            v-on:keyup.enter="comment"></textarea>

                    </div>
                </div>
            </div>
        </div>

    </div>
    <toast ref="toast"></toast>
</template>

<script>
import dayjs from "dayjs";
import userService from "../../plugins/userService";
import postService from "../../plugins/postService";
import toast from "../toast/toast.vue";
export default {
    emits: ["cancel"],
    props: ["postId"],
    data() {
        return {
            user: "",
            username: "",
            posts: [],
            comments: [],
            dropdownStates: {},
            showedit: true,
            comment_content: "",
            idcomment: "",
            title: ''
        };
    },
    components: { toast },
    mounted() {
        this.user = userService.getUserToken();
        if (this.user == false) {
            this.user = []
        }
        postService.renderPost().then((data) => { this.posts = data });
        postService.getcomment().then((data) => { this.comments = data });
    },


    methods: {
        onclose() {
            this.$emit("cancel");
        },
        getTimeFromCreatedAt(createdAt) {
            return postService.getTimeFromCreatedAt(createdAt)
        },

        //handle comment
        async comment(event) {
            if (this.user.length === 0) {
                this.$refs.toast.showToast("Vui lòng đăng nhập để sử dụng tính năng này");
            } if (event.target.value.trim() === ''
            ) {
                this.$refs.toast.showToast('Vui lòng nhập bình luận');
            }

            else {
                const id_user = this.user.id;
                const result = await postService.addcomment(this.postId, id_user, event.target.value);
                if (result.status === 200) {
                    event.target.value = ''
                    this.$refs.toast.showToast(result.data.message);
                     postService.getcomment().then((data) => { this.comments = data });
                }
            }

        },
        async deletecomment(id) {
            const id_comment = id
            const result = await postService.deletecommentByid(id_comment);
            if (result.status == 200) {
                this.$refs.toast.showToast(result.data.message);
                postService.getcomment().then((data) => { this.comments = data });
            }

        },
        async updateComment(id) {
            const id_comment = id
            if(this.comment_content.trim() ==='')
            {
                this.$refs.toast.showToast('Vui lòng nhập bình luận');
                return;
            }
            else
            {
               const result = await postService.updateComment(id_comment, this.comment_content);
            if (result.status == 200) {
                this.showedit = !this.showedit
                this.idcomment = ''
                this.$refs.toast.showToast(result.data.message);
                postService.getcomment().then((data) => { this.comments = data });
            } 
            }
            
        },

        getclass(id) {
            if (this.user.id == id) {
                return "";
            } else {
                return "hidden";
            }
        },
        goIn4(username, id) {
            window.location.href = `http://localhost:5173/information/${username}/${id}`;
        },
        openEditComment(comment) {
            this.comment_content = comment.comment_content;
            this.showedit = !this.showedit;
            this.idcomment = comment.id;
        },
        toggleDropdown(post) {
            if (this.isDropdownOpen(post.id)) {
                this.closeDropdown(post.id);
            } else {
                this.openDropdown(post.id);
            }
        },
        openDropdown(postId) {
            this.dropdownStates[postId] = true;
        },
        closeDropdown(postId) {
            this.dropdownStates[postId] = false;
        },
        isDropdownOpen(postId) {
            return this.dropdownStates[postId] || false;
        },
    },
};
</script>

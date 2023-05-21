<template>
    <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="onclose"></div>

        <div
            class="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-auto md:max-h-[75%] h-full relative">
            <div
                class="top-cover flex flex-row items-center py-3 px-4 border-b-4 border-gray-100 absolute top-0 left-0 right-0">
                <h5 class="text-lg font-semibold flex-grow">
                    Bài viết của {{ username }}
                </h5>
                <button type="button" @click="onclose"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-hide="defaultModal">
                    <i class="uil-multiply"></i>
                </button>
            </div>

            <div class="py-4 px-2 mt-12">
                <div class="flex items-center mt-1" v-for="comment in comments.filter(item => item.Post.id == postId)">
                    <img @click="goIn4(comment.User.username, comment.User.id)" class="w-6 h-6 rounded-full mr-2"
                        :src="comment.User.avatar" alt="Avatar" />
                    <div class="px-2 py-2 border rounded-md text-gray-700 text-sm bg-gray-100"
                        v-if="(showedit, idcomment != comment.id)">
                        <p class="font-bold text-base">{{ comment.User.username }}</p>
                        <p class="text-xs">{{ getTimeFromCreatedAt(comment.createdAt) }}</p>
                        <p>{{ comment.comment_content }}</p>
                    </div>

                    <div class="px-2 py-2 w-full text-gray-700 text-sm" v-if="(!showedit, idcomment === comment.id)">
                        <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm"
                            type="text" v-model="comment_content" placeholder="Thêm bình luận..."
                            v-on:keyup.enter="updateComment(comment.id)"></textarea>
                    </div>
                    
                    <div class="ml-2" :class="getclass(comment.User.id)" v-if="(showedit, idcomment != comment.id)">
                        <i class="fa-solid fa-ellipsis cursor-pointer" @click="toggleDropdown(comment)"></i>
                        <div id="dropdownHover"
                            class="z-10 absolute bg-white divide-y divide-gray-100 mt-1 mr-1 rounded-lg shadow w-50 dark:bg-gray-700"
                            v-show="isDropdownOpen(comment.id)" @click="closeDropdown(comment.id)">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                                <li class="py-2 px-1 flex items-center hover:bg-gray-100">
                                    <i class="text-violet-500 uil-exit md:text-xl"></i>
                                    <a @click="deletecomment(comment.id)" class="block px-4 py-2">Xóa</a>
                                </li>
                                <li class="py-2 px-1 flex items-center hover:bg-gray-100" @click="openEditComment(comment)">
                                    <i class="text-violet-500 uil-edit-alt md:text-xl"></i>
                                    <a class="block px-4 py-2">Chỉnh sửa</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer py-3 px-4 absolute bottom-0 left-0 right-0">
                <div class="flex items-center mt-2">
                    <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar" />
                    <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm"
                        ttype="text" ref="comment" placeholder="Thêm bình luận..." v-on:keyup.enter="comment"></textarea>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";

import userService from "../../plugins/userService";

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
        };
    },
    components: {},
    mounted() {
        this.user = userService.getUserToken();
        this.getcomment();
        this.renderPost();
        console.log(this.postId)
    },
    methods: {

        onclose() {
            this.$emit("cancel");
        },

        getTimeFromCreatedAt(createdAt) {
            const now = dayjs();
            const diffInSeconds = now.diff(createdAt, "second");

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

        getclass(id) {
            if (this.user.id === id) {
                return "";
            } else {
                return "hidden";
            }
        },

        goIn4(username, id) {
            window.location.href = `http://localhost:5173/information/${username}/${id}`;
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

        async renderPost() {
            try {
                const result = await this.$axios.get(`post/render`);
                this.posts = result.data.filter((post) => post.id === this.postId);
                this.username = this.posts[0].User.username;
            } catch (e) {
                console.log(e);
            }
        },

        async comment(event) {
            try {
                const result = await this.$axios.post(`comment/create`, {
                    id_user: this.user.id,
                    id_post: this.postId,
                    comment_content: event.target.value,
                });
                this.getcomment();
                event.target.value = "";
            } catch (error) {
                console.log(error);
            }
        },

        async getcomment() {
            try {
                const result = await this.$axios.get("comment/get");
                this.comments = result.data;
            } catch (error) {
                console.log(error);
            }
        },

        async deletecomment(id) {
            try {
                const result = await this.$axios.delete("comment/delete/" + id);
                this.getcomment();
            } catch (error) {
                console.log(error);
            }
        },

        async updateComment(id) {
            try {
                const result = await this.$axios.put("comment/edit/" + id, {
                    comment_content: this.comment_content,
                });
                this.showedit = !this.showedit
                this.idcomment = ''
                this.getcomment();
            } catch (error) {
                console.log(error);
            }


        },

        openEditComment(comment) {
            this.comment_content = comment.comment_content;
            this.showedit = !this.showedit;
            this.idcomment = comment.id;
        },
    },
};
</script>

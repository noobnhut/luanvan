<template>
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div class=" bg-white w-11/12 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-full">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Kết quả tìm kiếm</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
            </div>
            <div class=" py-4 px-2 overflow-y-auto ">
                <div v-for="search in searchs">
                    <post :filter="search.id" type=""  />
                </div>

            </div>

            <div class="modal-footer py-3 px-4">
                <button
                    class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclose()">
                    Đóng
                </button>
            </div>
        </div>
    </div>

    <toast ref="toast"></toast>
</template>

<script>
import toast from '../toast/toast.vue';
import post from './post.vue';
import userService from '../../plugins/userService';

export default {
    components: {
        toast,
        post
    },
    emits: ["cancel"],

    data() {
        return {
            user: '',
            searchs: [],
            users: []
        }
    },
    mounted() {
        this.user = userService.getUserToken();
        this.renderUser();
    },
    methods:
    {
        goIn4(username, id) {
            window.location.href = `http://localhost:5173/information/${username}/${id}`;
        },
        async renderUser() {
            try {
                const result = await this.$axios.get('user/get');
                this.users = result.data;
            } catch (error) {
                console.log(error)
            }
        },
        onclose() {
            this.$emit("cancel");
        },


    }
};
</script>
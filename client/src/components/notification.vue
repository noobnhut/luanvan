<template>
    <div class="w-full h-full bg-gray-800 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0 z-10"
        id="chec-div">
        <div class="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
            id="notification">

            <div class="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Thông báo</p>
                    <button  @click="onclose"
                        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer"
                       >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#4B5563" stroke-width="1.25" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M6 6L18 18" stroke="#4B5563" stroke-width="1.25" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                <!--nội dung thông báo-->
                <div class="w-full p-3 mt-8 bg-white rounded flex" v-for="noti in notis">
                    <div tabindex="0" aria-label="heart icon" role="img"
                        class="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z"
                                fill="#EF4444" />
                        </svg>
                    </div>
                    <div class="pl-3">
                        <p tabindex="0" class="focus:outline-none text-sm leading-none"><span
                                class="text-indigo-700">{{ noti.notification_content }}</span></p>
                        <p tabindex="0" class="focus:outline-none text-xs leading-3 pt-1 text-gray-500">
                            {{ getTimeFromCreatedAt(noti.createdAt) }}</p>

                    </div>
                    <p class="pl-3">
                        <span
                            class="px-2 rounded-full text-sm uppercase tracking-wide font-semibold bg-red-200 text-red-800 cursor-pointer"
                            @click="onclosedelete(); sendNoti(noti)">Xóa</span>

                    </p>
                </div>
                

            </div>
        </div>
    </div>
    <!--modal xóa-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-if="isShowdelete">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="onclosedelete"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Xóa thông báo</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclosedelete"></i>
            </div>
            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Bạn có muốn xóa <span
                            class="font-bold ">thông báo này ?</span> </label>

                </div>
            </div>
            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="deleteNoti()">Xóa</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclosedelete()">Đóng</button>
            </div>
        </div>
    </div>
    
    <toast ref="toast"></toast>

</template>
<script>

import socketService from "../plugins/socketService";
import userService from "../plugins/userService";
import postService from "../plugins/postService";
import toast from '../components/toast/toast.vue'
export default {
    emits: ["cancel"],
    data() {
        return {
            user: "",
            notis: [],
            notisend:'',
            isShowdelete:false
        };
    },
    components: {toast},
    mounted() {
        this.user = userService.getUserToken();
        socketService.getNotification((data) => {
            if (data.id_user == this.user.id) {
                this.notis.push(data)

            }
        });
        this.getNotification()
    },
    methods: {
        onclose() {
            this.$emit("cancel");
        },
        getTimeFromCreatedAt(createdAt) {
            return postService.getTimeFromCreatedAt(createdAt)
        },
        async getNotification() {
            try {
                const result = await this.$axios.get('notification/getbyid/' + this.user.id)
                this.notis = result.data
            } catch (error) {
                console.log(error)
            }
        },
        sendNoti(noti)
        {
            this.notisend = noti
            console.log(noti)
        },
        onclosedelete()
        {
            this.isShowdelete = !this.isShowdelete
        },
        async deleteNoti()
        {
            try {
                const id = this.notisend.id
              const result = await this.$axios.delete('notification/delete/'+id) 
               this.$refs.toast.showToast(result.data.message);
               this.isShowdelete = false
               this.getNotification()
            } catch (error) {
                console.log(error)
            }
        }
    },
};
</script>
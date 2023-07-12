<template>
    <div class="w-full h-full bg-gray-800 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0 z-10" id="chec-div">
        <div class="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="notification" @click="onclose">

            <div class="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Thông báo</p>
                    <button role="button" aria-label="close modal" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer" onclick="notificationHandler(false)">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#4B5563" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 6L18 18" stroke="#4B5563" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                <!--nội dung thông báo--> 
                <div class="w-full p-3 mt-8 bg-white rounded flex" v-for="noti in notis">
                    <div tabindex="0" aria-label="heart icon" role="img" class="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z" fill="#EF4444" />
                        </svg>
                    </div>
                    <div class="pl-3" >
                        <p tabindex="0" class="focus:outline-none text-sm leading-none"><span class="text-indigo-700">{{noti.notification_content}}</span></p>
                        <p tabindex="0" class="focus:outline-none text-xs leading-3 pt-1 text-gray-500">{{getTimeFromCreatedAt(noti.createdAt)}}</p>
                    </div>
                </div>
                <!--nội dung thông báo-->

            </div>
        </div>
    </div>
</template>
<script>
import dayjs from "dayjs";
import socketService from "../plugins/socketService";
import userService from "../plugins/userService";
import postService from "../plugins/postService";
export default {
    emits: ["cancel"],
    data() {
        return {
            user: "",
            notis:[]
        };
    },
    components: {},
    mounted() {
        this.user = userService.getUserToken();
        socketService.getNotification((data) => {
            if(data.id_user == this.user.id)
            {
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
        async getNotification()
        {
            try {
                const result = await this.$axios.get('notification/getbyid/'+this.user.id)
                this.notis= result.data
            } catch (error) {
                console.log(error)
            }
        }
    },
};
</script>
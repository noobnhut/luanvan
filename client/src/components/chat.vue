<template>
    <!--view list chat-->
    <div class="py-10 fixed bottom-0" v-if="checkLogin">
        <div class="relative rounded-lg border border-gray-100 bg-white shadow-lg">
            <div class="bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white py-2 px-4">
                <h2 class="text-xl font-semibold text-gray-800">
                    Danh sách tin nhắn
                </h2>
            </div>
            <div
                class="absolute left-14 bottom-0 h-4 w-4 -translate-x-1/2 translate-y-1/2 rotate-45 transform border-r border-b border-gray-100 bg-white">
            </div>
            <div class="max-h-60 overflow-y-auto" v-for="user in usersocket.filter((item) => item.id != user.id)">
                <div class="px-2 py-2">
                    <div class="flex items-center" @click="openChat(); getchat(user.id)">
                        <div class="relative" v-for="us in usersocket.filter(item => item.id == user.id)">
                            <div class="flex items-center justify-center  overflow-hidden rounded-full">
                                <span class="mr-1 text-rose-300 cursor-pointer" @click="deleteChat()">X</span>
                                <img class="w-12 h-12  rounded-full mr-2" :src="user.avatar" alt="Avatar">
                            </div>
                            <div
                                :class="['absolute bottom-0 right-0 w-4 h-4 mr-1 rounded-full border-2 border-white', user.online ? 'bg-green-500' : 'bg-red-500']">
                            </div>
                        </div>
                        <h3
                            class="text-gray-900 font-semibold md:text-xs lg:text-base ml-2 text-xs md:block hidden cursor-pointer">
                            {{ user.username }}</h3>

                    </div>
                </div>
            </div>
        </div>
        <img class="mt-4 w-16 rounded-full" src="../assets/login.gif" alt="" />
    </div>


    <!--chat-->
    <div >
    <div class="fixed md:right-20 right-0 bottom-0 z-30 w-80 h-96 flex flex-col border shadow-md bg-white" v-if="showChat" >
        <div class="flex items-center justify-between border-b p-2">
            <!-- user info -->
            <div class="flex items-center" v-for="user in users.filter(item => item.id == this.user_receive)">
                <img class="rounded-full w-10 h-10" :src="user.avatar" />
                <div class="pl-2">
                    <div class="font-semibold">
                        <a class="hover:underline">{{ user.username }}</a>
                    </div>
                    <div v-for="us in usersocket.filter(item => item.id == this.user_receive)">
                        <div class="text-xs text-gray-600">{{ us.online ? "Hoạt động" : "Không hoạt động" }}</div>
                    </div>
                </div>
            </div>

            <!-- end user info -->

            <!-- chat box action -->
            <div>
                <button @click="openChat" class="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <!-- end chat box action -->
        </div>

        <!--noi dung cuoc tro chuyen-->
        <div class="flex flex-col h-full mb-4  overflow-x-auto overflow-y-auto" ref="chatContainer">
            <div class="flex flex-col h-full">
                <div class="grid grid-cols-12 gap-y-2" v-for="chat in chats.filter(item => item.deleted !== user.id)">

                    <!--nguoi gui-->
                    <div class="col-start-1 col-end-8 p-3 rounded-lg" v-if="chat.sender_id !== user.id">
                        <div class="flex flex-row items-center">
                            <div class="flex items-center justify-center"
                                v-for="user in users.filter(items => items.id == this.user_receive)">
                                <img :src=user.avatar alt="" class="h-10 w-10 rounded-full">
                            </div>
                            <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                <div>{{ chat.messager }}</div>
                                <div class="pl-4 flex items-center justify-center"><small class="text-gray-500 ">{{
                                    formatTime(chat.createdAt) }}</small></div>
                            </div>
                        </div>
                    </div>

                    <!--người nhận-->
                    <div class="col-start-6 col-end-13 p-3 rounded-lg" v-else>
                        <div class="flex items-center justify-start flex-row-reverse">
                            <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                <div>{{ chat.messager }}</div>
                                <div class="pl-4 flex items-center justify-center"><small class="text-gray-500 ">{{
                                    formatTime(chat.createdAt) }}</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!--noi dung cuoc tro chuyen-->

        <!--footer chat-->
        <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 mb-2">
            <!--input thêm tin nhắn-->
            <div class="flex-grow ml-4">
                <div class="relative w-full">
                    <textarea type="text" v-model="messager" v-on:keyup.enter="sendmess()"
                        class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 text-xs"></textarea>
                </div>
            </div>
            <!--button send tin nhắn-->
            <div class="ml-4 ">
                <button @click="sendmess()"
                    class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                    <span>Gửi</span>
                    <span class="ml-2">
                        <svg class="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
        <!--footer chat-->
    </div></div>
</template>


<script>

import userService from "../plugins/userService";
import socketService from "../plugins/socketService";
import dayjs from 'dayjs';
export default {
    data() {
        return {
            isShow: false,
            user: "",
            users: [],
            showBanner: true,
            user_receive: "",
            showChat: false,
            usersocket: [],
            chats: [],
            messager: '',
            checkLogin:true


        };
    },

    mounted() {

        this.user = userService.getUserToken();
        if(this.user == false)
        {
            this.checkLogin = false
        }
        else
        {
        socketService.userConnect(this.user.id)
        }
      
        userService.renderUser().then((data) => {
            this.users = data
        })
        socketService.getListOnline((data) => {
            this.updateUserStatus(data)
        });
        socketService.getchat((data) => {
            if ((data.sender_id == this.user_receive && data.receiver_id == this.user.id) || (data.sender_id == this.user.id && data.receiver_id == this.user_receive)) {
                this.chats.push(data);
                if (this.showChat == false) {
                    if (this.user.id == data.receiver_id) {
                        this.showChat = true
                        this.user_receive = data.sender_id
                        this.user.id = data.receiver_id
                        this.getchat(data.sender_id);
                    }
                }
                this.$nextTick(() => {

                    const chatContainer = this.$refs.chatContainer
                    chatContainer.scrollTop = chatContainer.scrollHeight
                })
            }
        })
    },
    components: {
    },
    methods: {
        openChat() {
            this.showChat = !this.showChat;
        },
        formatTime(timeString) {
            return dayjs(timeString).format('HH:mm');
        },
        updateUserStatus(data) {
            this.usersocket = this.users.map((user) => {
                return {
                    id: user.id,
                    username: user.username,
                    online: data[user.id],
                    avatar: user.avatar,
                };
            });
        },
        test() {
            console.log(this.user_receive)
        },
        async getchat(id) {
            this.user_receive = id
            try {
                const result = await this.$axios.post('message/get',
                    {
                        send: this.user_receive,
                        receiver: this.user.id
                    });

                this.chats = result.data;
                this.$nextTick(() => {
                    const chatContainer = this.$refs.chatContainer
                    chatContainer.scrollTop = chatContainer.scrollHeight
                })
            } catch (error) {
                console.log(error)
            }
        },
        async sendmess() {
            try {
                const result = await this.$axios.post('message/create',
                    {
                        receiver: this.user_receive,
                        send: this.user.id,
                        messager: this.messager
                    });
                this.$nextTick(() => {
                    const chatContainer = this.$refs.chatContainer
                    chatContainer.scrollTop = chatContainer.scrollHeight
                })

                this.messager = " "
            } catch (error) {
                console.log(error)
            }

        },
        async deleteChat() {
            try {
                const delete2 = await this.$axios.post(`message/delete`,
                    {
                        send: this.user.id,
                        receiver: this.user_receive
                    })
                console.log(delete2.data)
                this.getchat(this.user_receive);
            } catch (error) {
                console.log(error)
            }
        },
    },
};
</script>

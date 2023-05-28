<template>
    <div class="chat-area flex-1 flex flex-col" >
        <!--name chat -->
        <div class="flex items-center py-2 mb-4 border-b"  v-for="user in users.filter(item => item.id == iduser)">
            <img class="w-10 h-10 rounded-full mr-2" :src="user.avatar" alt="Avatar">
            <div>
                <h3 class="text-gray-900 font-medium">{{user.username}}</h3>
                <p class="text-gray-500 text-xs">trạng thái hoạt động</p>
            </div>
        </div>

        <div class="messages flex-1 overflow-auto">
            <div v-for="message in chats" :key="message.id"
                :class="{ 'me': message.sender_id === user.id, 'you': message.sender_id !== user.id }">
                <div class="message mb-4 flex" v-if="message.sender_id !== user.id">
                    <div class="flex-2" >
                        <div class="w-8 h-8 relative">
                            <img v-for="user in users.filter(item => item.id == iduser)" class="w-8 h-8 rounded-full mx-auto" :src="user.avatar"
                                alt="chat-user" />
                        </div>
                    </div>
                    <div class="flex-1 px-2">
                        <div
                            class="inline-block bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 rounded-full p-2 px-6 text-gray-700">
                            <span>{{ message.messenger_content }}</span>
                        </div>
                        <div class="pl-4"><small class="text-gray-500">{{
                            formatTime(message.createdAt) }}</small></div>
                    </div>
                </div>
                <div class="message me mb-4 flex text-right" v-else>
                    <div class="flex-1 px-2">
                        <div
                            class="inline-block bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-200 rounded-full p-2 px-6 ">
                            <span>{{ message.messenger_content }}</span>
                        </div>
                        <div class="pr-4"><small class="text-gray-500">{{
                            formatTime(message.createdAt) }}</small></div>
                    </div>
                </div>
            </div>
        </div>

        <!--bottom center-->
        <div class="flex-2 pt-4 pb-10">
            <div class="write bg-white shadow flex rounded-lg">

                <div class="flex-1">
                    <textarea name="message"
                        class="w-full block outline-none py-4 px-4 bg-transparent" rows="1"
                        v-model="message" placeholder="Nhập nội dung chat..." autofocus
                        v-on:keyup.enter="sendChat()"></textarea>
                </div>
                <div class="flex-2 w-32 p-2 flex content-center items-center">
                    <div class="flex-1 text-center">
                        <span class="text-gray-400 hover:text-gray-800">
                            <span class="inline-block align-text-bottom">
                                <svg fill="none" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"
                                    class="w-6 h-6">
                                    <path
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13">
                                    </path>
                                </svg>
                            </span>
                        </span>
                    </div>
                    <div class="flex-1">
                        <button class="bg-blue-400 w-10 h-10 rounded-full inline-block">
                            <span class="inline-block align-text-bottom">
                                <i class="w-4 h-4 text-white  uil-heart-alt"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>



<script>
import UserService from '../../plugins/userService'
import dayjs from 'dayjs';
import socket from '../../plugins/socket'
export default
    {
        data() {
            return {
                user: '',
                message: '',
                chats: [],
                hidden: true,
                historys: [],
                users: [],
                idroom:'',
                iduser:'',
                idroom:''
            }
        },
        mounted() {

            this.user = UserService.getUserToken();
            socket.connect();
            this.getChat();
            socket.on('chat', (chat) => {
                console.log('Tin nhắn mới', chat);
                this.chats.push(chat)
            });
            this.getUsers();
            this.iduser= this.$route.params.id_user;
            this.idroom = this.$route.params.id_room;
        },
        methods:
        {
            openMenu() {
                this.hidden = !this.hidden;
            },
            formatTime(timeString) {
                return dayjs(timeString).format('HH:mm');
            },
            result() {
                if (this.user.id == 1) {
                    return 2;
                }
                else {
                    return 1;
                }
            },

            async sendChat() {
                try {
                    const result = await this.$axios.post('chat/send', {
                        userSender: this.user.id, userReceiver: this.result(), messenger_content: this.message
                    });
                    this.message = ''
                } catch (error) {
                    console.log(error)
                }
            },

            async getChat() {
                try {
                    const result = await this.$axios.get(`chat/get/4`);
                    this.chats = result.data
                } catch (error) {
                    console.log(error)
                }
            },

            async getUsers() {
                try {
                    const result = await this.$axios.get(
                        `user/get`
                    );
                    this.users = result.data;
                } catch (e) {
                    console.log(e);
                }
            },
        }
    }
</script>
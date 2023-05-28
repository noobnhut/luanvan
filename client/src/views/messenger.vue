<template>
    <div>
        <input type="text" v-model="message">
        <button @click="sendChat">nhan vo</button>
         <div v-for="chat in chats">{{chat}}</div>
    </div>
</template>

<script>
import UserService from '../plugins/userService'
import dayjs from 'dayjs';
import socket from '../plugins/socket'
export default
    {
        data() {
            return {
                user: '',
                message: '',
                chats: [],

            }
        },
        mounted() {

            this.user = UserService.getUserToken();
            socket.connect();
            socket.on('chat', (chat) => {
                console.log('Tin nhắn mới', chat);
               this.chats.push(chat)
            });
        },
        methods:
        {
            openMenu() {
                this.hidden = !this.hidden;
            },
            async sendChat() {
                try {
                    const result = await this.$axios.post('chat/send', {
                        userSender: 1, userReceiver: 2, messenger_content: this.message
                    });
                } catch (error) {
                    console.log(error)
                }


            },

        }
    }
</script>


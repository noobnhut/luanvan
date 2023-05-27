<template>
    <button @click="sendChat">s</button>
</template>

<script>
import UserService from '../plugins/userService'
import dayjs from 'dayjs';
import socket from '../plugins/socket'
export default
    {
        data() {
            return {
                hidden: true,
                chats: [],
                user: ''
            }
        },
        mounted() {
            this.getChat();
            this.user = UserService.getUserToken();

        },
        methods:
        {
            openMenu() {
                this.hidden = !this.hidden;
            },
            async getChat() {
                try {
                    const result = await this.$axios.get(`chat/get/4`);
                    this.chats = result.data
                } catch (error) {
                    console.log(error)
                }
            },
            formatTime(timeString) {
                return dayjs(timeString).format('HH:mm');
            },
            sendChat() {
                const userSender = '1';
                const userReceiver = '2';
                const messenger_content = 'Hello!';

                // Gửi tin nhắn qua Socket.io
                socket.emit('chat', {
                    userSender,
                    userReceiver,
                    messenger_content
                });
            },

    }
    }
</script>


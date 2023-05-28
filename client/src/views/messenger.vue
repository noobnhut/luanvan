<template>
    <div class="w-full h-screen">
        <div class="flex h-full">
            <div class="flex-1 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 w-full h-full">
                <div class="main-body container m-auto w-11/12 h-full flex flex-col">
                    <!--mobile top-->
                    <div class="py-4 flex-2 flex flex-row">
                        <div class="flex-1">
                            <span class="min-[1024px]:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom">
                                <span class="block h-6 w-6 p-1 rounded-full hover:bg-gray-400" @click="openMenu">
                                    <svg class="w-4 h-4" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </span>
                            </span>

                        </div>

                    </div>

                    <div class="main flex-1 flex flex-col">
                        <div class=" lg:block heading flex-2" :class="{ hidden: hidden }">
                            <h1 class="text-3xl text-gray-700 mb-4">Chat</h1>
                        </div>

                        <div class="flex-1 flex h-full">
                            <!--left nav-->
                            <div class="sidebar lg:flex  flex-col pr-6" :class="{ hidden: hidden }">
                                <!--chat search-->
                                <div class="search flex-2 pb-6 px-2">
                                    <input type="text"
                                        class="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
                                        placeholder="Tìm kiếm tin nhắn">
                                </div>

                                <!--left chat avatar-->
                                <div class="flex-1 h-full overflow-auto px-2" v-for="history in historys">
                                    <div class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md"
                                        v-for="user in users.filter(item => item.id === history.id_user)"
                                        @click="gochat(user.id, history.id_conversation)">
                                        <div class="flex-2">
                                            <div class="w-12 h-12 relative">
                                                <img class="w-12 h-12 rounded-full mx-auto" :src="user.avatar"
                                                    alt="chat-user" />
                                            </div>
                                        </div>
                                        <div class="flex-1 px-2">
                                            <div class="truncate w-32"><span class="text-gray-800 text-sm">{{ user.username
                                            }}</span></div>
                                        </div>
                                        <div class="flex-2 text-right">
                                            <!--Tune-->
                                            <div><small class="text-gray-500">1p</small></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--center chat-->
                            <router-view :class="{ hidden: !hidden }" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import UserService from '../plugins/userService'
export default
    {
        data() {
            return {
                user: '',
                hidden: true,
                historys: [],
                users: []
            }
        },
        mounted() {

            this.user = UserService.getUserToken();
            this.getHistory();
            this.getUsers();
        },
        methods:
        {
            openMenu() {
                this.hidden = !this.hidden;
            },
            async getHistory() {
                try {
                    const result = await this.$axios.get(`http://localhost:3000/api/chat/getHistory/` + this.user.id);
                    this.historys = result.data
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
            gochat(id_user, id_room) {
                window.location.href = `${import.meta.env.VITE_API_BASE_URL_API}messenger/chat/${id_user}/${id_room}`;
            }
        }
    }
</script>


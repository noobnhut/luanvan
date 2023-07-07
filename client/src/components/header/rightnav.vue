<template>
    <div class=" fixed" >
        <div class="relative h-40 w-80 rounded-lg border border-gray-100 bg-white shadow-lg">
            <div
                class="absolute left-14 bottom-0 h-4 w-4 -translate-x-1/2 translate-y-1/2 rotate-45 transform border-r border-b border-gray-100 bg-white">
            </div>
            <div class="px-8">
                <h1 class="mt-6 text-2xl font-bold text-orange-600">Wellcome</h1>
                <p class="text-gray-600">Chào mừng bạn đến với mạng xã hội chia sẽ đồ cũ <span
                        class="font-bold">404Social</span>.</p>      
            </div>
        </div>
        <img class="mt-4 w-16 rounded-full" src="../../assets/login.gif" alt="" />

    </div>


    <div class="py-10 fixed  bottom-0">
        <div class="relative  rounded-lg border border-gray-100 bg-white shadow-lg">
            <div class="bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white py-2 px-4">
                <h2 class="text-xl font-semibold text-gray-800">Danh sách tin nhắn</h2>
            </div>
            <div
                class="absolute left-14 bottom-0 h-4 w-4 -translate-x-1/2 translate-y-1/2 rotate-45 transform border-r border-b border-gray-100 bg-white">
            </div>
            <div class="max-h-60 overflow-y-auto" v-for="user in users.filter(item=>item.id != user.id)">
                <div class="px-8 py-2" >
                    <div class="flex items-center">
                        <img class="w-12 h-12 rounded-full object-cover mr-4" :src="user.avatar" alt="User avatar">
                        <div class="flex-1">
                            <h3 class="text-lg font-medium text-gray-800">{{ user.username }}</h3>
                            <p class="text-gray-600 text-base">Hoạt động</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <img class="w-12 h-12 rounded-full object-cover mr-4" :src="user.avatar" alt="User avatar">
                        <div class="flex-1">
                            <h3 class="text-lg font-medium text-gray-800">{{ user.username }}</h3>
                            <p class="text-gray-600 text-base">Hoạt động</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <img class="w-12 h-12 rounded-full object-cover mr-4" :src="user.avatar" alt="User avatar">
                        <div class="flex-1">
                            <h3 class="text-lg font-medium text-gray-800">{{ user.username }}</h3>
                            <p class="text-gray-600 text-base">Hoạt động</p>
                        </div>
                    </div><div class="flex items-center">
                        <img class="w-12 h-12 rounded-full object-cover mr-4" :src="user.avatar" alt="User avatar">
                        <div class="flex-1">
                            <h3 class="text-lg font-medium text-gray-800">{{ user.username }}</h3>
                            <p class="text-gray-600 text-base">Hoạt động</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <img class="mt-4 w-16 rounded-full" src="../../assets/login.gif" alt="" />
    </div>
</template>


<script>

import userService from '../../plugins/userService'

export default {
    data() {
        return {
            user: '',
            ranks: [],
            users: [],
            showBanner: true
        }
    },
    mounted() {
        this.user = userService.getUserToken()
        if (this.user) {
            this.showBanner = false
        }
        this.getUser()
    },
    methods:
    {

        async getUser() {
            try {
                const result = await this.$axios.get('user/get');
                this.users = result.data
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
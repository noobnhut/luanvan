<template>
    <div class="shadow-md mt-2">
    <div v-for="followuser in followusers"> 
        <div class="max-w-xl w-full ml-6 overflow-hidden mt-6 " v-for="user in users.filter(item => item.id == followuser.User.id)">
            <!-- Header -->
            <div class="flex items-center px-4 py-2">
                <img class="w-12 h-12 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                <div class="flex-grow">
                    <h3 @click="goIn4(user.username, user.id)" class="text-gray-900 font-medium cursor-pointer">{{
                        user.username }}</h3>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import userService from '../../plugins/userService';
export default {
    data() {
        return {
            user: '',
            followusers: '',
            users: []
        }
    },
    mounted() {
        this.user = userService.getUserToken();
        userService.renderUser().then((data) => { this.users = data });
        userService.getfollow(this.user.id).then((data) => { this.followusers = data })
    },
    methods:
    {
        goIn4(username, id) {
            window.location.href = `http://localhost:5173/information/${username}/${id}`;
        },
    }
}
</script>
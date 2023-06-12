<template>
    <navbar />
    <div class="min-[900px]:grid grid-cols-4 gap-4  ">
        <div class="py-2 col-span-1 mx-2 md:mx-4 lg:mx-8 ">
            <information />
        </div>
        <div class=" p-4 lg:col-span-2 md:col-span-2 col-span-3 ">
            <inputform v-if="showin4" />
            <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 rounded-md shadow-md"
                v-if="showNotUser">
                <div class="flex flex-wrap px-2 py-2">
                    <span v-if="followusers.some(item => item.userfollowed == this.$route.params.id)">
                        <span v-for="followuser in followusers.filter(item => item.userfollowed == this.$route.params.id)">
                            <button @click="handlefollowuser()"
                                class=" mt-4 mr-2 py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer">
                                Đang theo dõi</button>
                        </span>
                    </span>

                    <span v-else>
                        <button @click="handlefollowuser()"
                            class=" mt-4 mr-2 py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer">
                            Theo dõi</button>
                    </span>

                    <button @click="onShowReport"
                        class=" mt-4 py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer">Báo
                        cáo người dùng</button>

                </div>
            </div>

            <div
                class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul class="flex flex-wrap">
                    <li class="mr-2 cursor-pointer ">
                        <a @click="isUserBtn"
                            :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'user' }]"
                            class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Bài
                            đăng</a>
                    </li>
                    <li class="mr-2 cursor-pointer" v-if="showOnlyUser">
                        <a @click="isFollowBtn"
                            :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'follow' }]"
                            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Bài
                            đăng đã lưu</a>
                    </li>
                    <li class="mr-2 cursor-pointer" v-if="showOnlyUser">
                        <a @click="isFollowUserBtn"
                            :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'followuser' }]"
                            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Theo
                            dõi người dùng</a>
                    </li>
                </ul>
            </div>
            <post type="" filter="" v-if="isUser" />
            <postfollow v-if="isFollow" />
            <followuser v-if="isFollowUser" />
        </div>
        <div class=" p-4 hidden  lg:block md:col-span-1 lg:col-span-1">
            <rightnav />
        </div>
    </div>
    <reportuser v-if="isShowReport" @cancel="onShowReport"/>
    <gototop />
</template>
  
<script>

import navbar from '../components/header/navbar.vue';
import post from '../components/post/post.vue';
import postfollow from '../components/post/postfollow.vue'
import gototop from '../components/header/gototop.vue';
import inputform from '../components/post/inputform.vue';
import rightnav from '../components/header/rightnav.vue';
import userService from '../plugins/userService';
import information from '../components/information/information.vue'
import followuser from '../components/information/followuser.vue';
import reportuser from '../components/information/reportuser.vue';
export default
    {
        data() {
            return {
                showin4: false,
                user: '',
                isUser: true,
                isFollow: false,
                activeTab: 'user',
                showOnlyUser: true,
                isFollowUser: false,
                showNotUser: false,
                followText: '',
                isShowReport:false,
                followusers: []
            }
        },
        components:
        {
            navbar,
            post,
            gototop,
            inputform,
            rightnav,
            information,
            postfollow,
            followuser,
            reportuser
        },
        mounted() {
            this.user = userService.getUserToken();
            if (this.$route.params.id == this.user.id) {
                this.showin4 = true
                this.showOnlyUser = true
                this.showNotUser = false
            }
            else {
                this.showIn4 = true
                this.showOnlyUser = false
                this.showNotUser = true
            }
            this.getfollow()
        },
        methods:
        {
            async getfollow() {
                const id = this.user.id;
                try {
                    const result = await this.$axios.get(`userfollow/getfollow/${id}`);
                    this.followusers = result.data;
                } catch (error) {
                    console.log(error)
                }
            },
            async handlefollowuser()
            {
                try {
                    const result = await this.$axios.post(`userfollow/addfollow/`,
                    {
                        userfollow:this.user.id,
                        userfollowed:this.$route.params.id
                    });
                   this.getfollow()
                } catch (error) {
                    console.log(error)     
            }},
            isUserBtn() {
                this.isUser = true
                this.isFollow = false
                this.activeTab = 'user'
                this.isFollowUser = false
            },
            isFollowBtn() {
                this.isUser = false
                this.activeTab = 'follow'
                this.isFollow = true
                this.isFollowUser = false
            },
            isFollowUserBtn() {
                this.isFollowUser = true
                this.activeTab = 'followuser'
                this.isUser = false
                this.isFollow = false
            },
            onShowReport()
            {
                this.isShowReport = !this.isShowReport
            },
        }
    }
</script>
  
  
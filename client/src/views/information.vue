<template>
    <navbar />
    
    <div class="flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-white w-full" v-if="!isShowUser">
        <div class="text-center">
          <div class="inline-flex rounded-full bg-yellow-100 p-4">
            <div class="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
              <svg class="w-16 h-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
          </div>
          <h1 class="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">404 - Page not found</h1>
          <p class="text-slate-600 mt-5 lg:text-lg">{{ viewText }}</p>
        </div>
      </div>
    <div class="min-[900px]:grid grid-cols-4 gap-4" v-if="isShowUser">
        
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
                followusers: [],
                isShowUser:true,
                viewText:''
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
            this.getfollow();
            this.getUsers()
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
            async getUsers() {
                try {
                    const result = await this.$axios.get(
                        `user/getbyid/` + this.$route.params.id
                    );
                    this.users = result.data;
                    if(this.users.isUser == false)
                    {
                        this.isShowUser = false
                        this.viewText = "Tài khoản này không tồn tại."
                    }
                } catch (e) {
                    console.log(e);
                }
            },
        }
    }
</script>
  
  
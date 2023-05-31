<template>
    <navbar />
    <div class="min-[900px]:grid grid-cols-4 gap-4  ">
        <div class="py-2 col-span-1 mx-2 md:mx-4 lg:mx-8 ">
            <information />
        </div>
        <div class=" p-4 lg:col-span-2 md:col-span-2 col-span-3 ">
            <inputform v-if="showin4" />
           
            <div
                class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul class="flex flex-wrap -mb-px">
                    <li class="mr-2 cursor-pointer ">
                        <a @click="isUserBtn"
                        :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', {'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'user'}]"
                         class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Bài
                            đăng của bạn</a>
                    </li>
                    <li class="mr-2 cursor-pointer" v-if="showfollow">
                        <a @click="isFollowBtn"
                        :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', {'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'follow'}]"
                            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Bài
                            đăng đã lưu</a>
                    </li>
                </ul>  
            </div>
            <post type="" filter="" v-if="isUser"/>
            <postfollow v-if="isFollow"/>
        </div>
        <div class=" p-4 hidden  lg:block md:col-span-1 lg:col-span-1">
            <rightnav />
        </div>
    </div>
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
export default
    {
        data() {
            return {
                showin4: false,
                user: '',
                isUser:true,
                isFollow:false,
                activeTab:'user',
                showfollow:true
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
            postfollow
        },
        mounted() {
            this.user = userService.getUserToken();
            if (this.$route.params.id == this.user.id) {
                this.showin4 = true
                this.showfollow=true
            }
            else {
                this.showIn4 = true
                this.showfollow=false
            }
            
        },
       methods:
        {
            isUserBtn()
            {
                this.isUser = true
                this.isFollow=false
                this.activeTab='user'
            },
            isFollowBtn()
            {
                this.isUser = false
                this.activeTab='follow'
                this.isFollow=true
            }
        }
    }
</script>
  
  
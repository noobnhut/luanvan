<template>
    <navbar />
    <div class="grid grid-cols-4 gap-4  ">
        <div class="py-2 col-span-1 mx-2 md:mx-4 lg:mx-8 ">
            <leftnav />
        </div>
        <div class=" p-4 lg:col-span-2 md:col-span-2 col-span-3 ">
            <post :filter="this.$route.params.id" type=""/>
        </div>
        <div class=" p-4 hidden md:block lg:block md:col-span-1 lg:col-span-1">
            <rightnav />
        </div>
    </div>
    <toast ref="toast"></toast>

</template>

<script>

import toast from '../components/toast/toast.vue';
import navbar from '../components/header/navbar.vue';
import leftnav from '../components/header/leftnav.vue';
import rightnav from '../components/header/rightnav.vue';
import userService from '../plugins/userService';
import post from '../components/post/post.vue';
export default
    {
        data() {
            return {           
                user: '',
                id: '',
            }
        },
        components: {      
            navbar,
            leftnav,
            rightnav,
            toast,
            post
        },
        
        mounted() {
            this.user = userService.getUserToken();
        },
    }
</script>
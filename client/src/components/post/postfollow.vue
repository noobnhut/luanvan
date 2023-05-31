<template>
    <div v-for="follow in follows.filter(item=>item.id_user==this.$route.params.id)">   
        <post :filter="follow.id_post" type=""/>
</div>
</template>

<script>
import post from '../post/post.vue'
import postService from '../../plugins/postService';
export default {
    components: {
        post
    },
    data() {
        return {
            follows:[],
        }
    },
    mounted() {    
        postService.getfollow().then((data) => { this.follows = data })
    },
};
</script>
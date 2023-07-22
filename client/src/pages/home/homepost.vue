<template>
    <div v-if="user === false">
        <div v-for="i in posts.filter(item => item.priority == 1  )">
          <post  :filter="i.id" />
        </div>
      </div>

      <div v-if="user != false">
        <div v-for="i in posts.filter(item => (item.priority <= user.priority || user.id == item.user.id) )">
          <post :filter="i.id" />
        </div>
      </div>
</template>

<script>
import post from '../../components/post/post.vue';
import postService from '../../plugins/postService';
import userService from '../../plugins/userService';
export default {
components:
{
    post
},
data() {
        return {
            posts:[],
            user:''
        }
    },
    mounted() {    
        postService.renderPost().then((data) => { this.posts = data })
        this.user = userService.getUserToken();

    },
}
</script>
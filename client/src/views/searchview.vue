<template>
    <navbar />
    <div class="grid grid-cols-4 gap-4 ">
        <div class="py-2 col-span-1 mx-2 md:mx-4 lg:mx-8 ">
            <leftnav/>
        </div>
        <div class="  p-4 lg:col-span-2 md:col-span-2 col-span-3">
          
            <postsearch/>
        </div>
    </div>
</template>

<script>
import navbar from '../components/header/navbar.vue';
import post from '../components/post/post.vue';
import rightnav from '../components/header/rightnav.vue';
import leftnav from '../components/header/leftnav.vue';
import postsearch from '../components/post/postsearch.vue';

export default {
  data() {
    return {   
        searchQuery:''
    };
  },
  components:
        {
            navbar,
            post,
            rightnav,     
            leftnav ,
            postsearch,
        },
  mounted()
  {
    this.searchQuery = this.$route.query.q;
  }

}
</script>
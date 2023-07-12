<template>
  <navbar />
  <div class="grid grid-cols-4 gap-4">
    <div class="py-2 col-span-1 mx-2 md:mx-4 lg:mx-8">
      <leftnav />
    </div>
    <div class="p-4 lg:col-span-2 md:col-span-2 col-span-3">
      <div v-for="i in searchs">
        <post :filter="i.id" type="" />
      </div>
    </div>
    <div class="p-4 hidden md:block lg:block md:col-span-1 lg:col-span-1">
      <rightnav />
      <chatVue></chatVue>
    </div>
  </div>
</template>
  
<script>
import post from '../components/post/post.vue';
import navbar from '../components/header/navbar.vue'
import leftnav from '../components/header/leftnav.vue'
import rightnav from "../components/header/rightnav.vue";
import chatVue from "../components/chat.vue";

export default {
  props: ['data'],
  data() {
    return {
      searchs: [],
      obj: ''
    }
  },
  components: { post, navbar ,leftnav,rightnav,chatVue},
  mounted() {
    var data = this.$route.query.data;
    this.obj = JSON.parse(decodeURIComponent(data));
    this.search()
  },
  methods: {
    async search() {
      try {
        const result = await this.$axios.post('post/search',
          {
            citycode: this.obj.citycode, districtcode: this.obj.districtcode,
            communecode: this.obj.communecode, keyword: this.obj.keyword, type: this.obj.type,
            catid: this.obj.catid, radius: this.obj.radius
          });
        this.searchs = result.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
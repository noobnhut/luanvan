<template>
  <navbar />
  <div class="grid grid-cols-4 gap-4">
    <div class="py-2 col-span-1 mx-2 md:mx-4 lg:mx-8">
      <leftnav />
    </div>
    <div class="p-4 lg:col-span-2 md:col-span-2 col-span-3">
      <div
                class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul class="flex flex-wrap">
                    <li class="mr-2 cursor-pointer ">
                        <a @click="SearchBTN"
                            :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'search' }]"
                            class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Kết quả tìm kiếm</a>
                    </li>
                    <li class="mr-2 cursor-pointer ">
                        <a @click="SearchSameBTN"
                            :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'searchsame' }]"
                            class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Kết quả tương tự</a>
                    </li>
                    
                </ul>
            </div>
      <div v-if="issearch">
      <div v-if="user === false">
        <div v-for="i in searchs.filter(item => item.priority == 1)">
          <post  :filter="i.id" />
        </div>
      </div>

      <div v-if="user != false">
        <div v-for="i in searchs.filter(item => item.priority <= user.priority)">
          <post  :filter="i.id" />
        </div>
      </div>
     </div>

     <div v-if="isSame">
      <div v-if="user === false">
        <div v-for="i in searchsames.filter(item => item.priority == 1)">
          <post  :filter="i.id" />
        </div>
      </div>

      <div v-if="user != false">
        <div v-for="i in searchsames.filter(item => item.priority <= user.priority)">
          <post  :filter="i.id" />
        </div>
      </div>
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
import userService from '../plugins/userService';
export default {
  props: ['data'],
  data() {
    return {
      searchs: [],
      obj: '',
      user: '',
      issearch:true,
      isSame:false,
      activeTab:"search",
      searchsames:[]
    }
  },
  components: { post, navbar, leftnav, rightnav, chatVue },
  mounted() {
    var data = this.$route.query.data;
    this.obj = JSON.parse(decodeURIComponent(data));
    this.search()
    this.user = userService.getUserToken();
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
        this.searchs = result.data.resultunlocation
        this.searchsames = result.data.postlocation
      } catch (error) {
        console.log(error)
      }
    },
    SearchBTN()
    {
      this.issearch = true
      this.isSame = false
      this.activeTab = "search"
    },
    SearchSameBTN()
    { 
      this.issearch = false
      this.isSame = true
      this.activeTab = "searchsame"
    }
  }
}
</script>
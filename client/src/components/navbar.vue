<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto  flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
     <router-link to="/home"><h2 class="logo text-xl font-bold text-gray-900">404Social</h2></router-link> 
      <div class="search-bar flex items-center bg-gray-100 md:w-92">
        <i class="uil uil-search text-gray-600 mx-2"></i>
        <input type="search" class="bg-transparent text-sm rounded-md px-4 py-3 pr-10 focus:outline-none w-full md:w-72"
          placeholder="Tìm kiếm" />
      </div>
      <div class="lg:flex hidden items-center">
        <button
          class="bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white font-bold py-2 px-4 rounded flex-shrink-0 mx-2 flex items-center " @click="onShow">
          <i class=" uil-plus-square  lg:text-3xl md:text-xl"></i>
          <p class="px-2">Tạo bài đăng</p>
        </button>
        <div class="profile-pic ml-2">
          <img src="../assets/login.gif" alt="pic 1" class="rounded-full w-10 h-10 object-cover" />
        </div>

        <div class="profile-pic ml-2">
          <div
            class="rounded-full w-10 h-10 object-cover bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 flex items-center justify-center">
            <i class="uil-github text-3xl md:text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  </nav>


  <toast ref="toast"></toast>
  <post_content v-if="isShowModel" @cancel="onShow"></post_content>
</template>
  
<script>
import toast from './toast.vue';
import post_content from './post_content.vue';

export default {
  name: "NavigationBar",
  data() {
    return {
      screenWidth: window.innerWidth,
      isShowModel: false,

    };
  },
  components:
  {
    toast,
    post_content

  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.$refs.toast.showToast('Bạn chưa đăng nhập hãy đăng nhập!')
      setTimeout(() => {
        this.$router.push({ name: "login" });
      }, 3000);
    }
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    onShow() {
      this.isShowModel = !this.isShowModel
    },
  },
};
</script>
  
<style scoped>
@media (max-width: 767px) {
  .search-bar {
    display: none;
  }

  .logo {
    margin-left: 1rem;
  }
}
</style>
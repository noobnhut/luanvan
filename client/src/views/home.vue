<template>
  <navbar />
  <div class="grid grid-cols-4 gap-4">
    <div class="py-2 col-span-1 mx-2 md:mx-4 lg:mx-8">
      <leftnav />
    </div>
    <div class="p-4 lg:col-span-2 md:col-span-2 col-span-3">
      <inputform />
      <router-view></router-view>
    </div>
    <div class="p-4 hidden md:block lg:block md:col-span-1 lg:col-span-1">
      <rightnav />
      <chatVue></chatVue>
    </div>

  </div>

  

</template>

<script>
import navbar from "../components/header/navbar.vue";
import leftnav from "../components/header/leftnav.vue";
import post from "../components/post/post.vue";
import rightnav from "../components/header/rightnav.vue";
import userService from "../plugins/userService";
import inputform from "../components/post/inputform.vue";
import chatVue from "../components/chat.vue";
import socketService from "../plugins/socketService";
export default {
  data() {
    return {
      isShow: false,
      user: "",
      users: [],
    };
  },

  mounted() {
    // Xử lý sự kiện trạng thái
    this.user = userService.getUserToken();
    if(this.user.id)
    {
      socketService.userConnect(this.user.id)
    }
  },
  components: {
    navbar,
    post,
    leftnav,
    rightnav,
    inputform,
    chatVue
  },
  methods: {
    openChat() {
      this.showChat = !this.showChat;
    },
  },
};
</script>

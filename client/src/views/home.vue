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
      <div class="py-10 fixed bottom-0">
        <div
          class="relative rounded-lg border border-gray-100 bg-white shadow-lg"
        >
          <div
            class="bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white py-2 px-4"
          >
            <h2 class="text-xl font-semibold text-gray-800">
              Danh sách tin nhắn
            </h2>
          </div>
          <div
            class="absolute left-14 bottom-0 h-4 w-4 -translate-x-1/2 translate-y-1/2 rotate-45 transform border-r border-b border-gray-100 bg-white"
          ></div>
          <div
            class="max-h-60 overflow-y-auto"
            v-for="user in users.filter((item) => item.id != user.id)"
          >
            <div class="px-8 py-2">
              <div class="flex items-center" @click="openChat();sendUser(user.id)">
                <img
                  class="w-12 h-12 rounded-full object-cover mr-4"
                  :src="user.avatar"
                  alt="User avatar"
                />
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-800">
                    {{ user.username }}
                  </h3>
                  <p class="text-gray-600 text-base">Hoạt động</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          class="mt-4 w-16 rounded-full"
          src="../../assets/login.gif"
          alt=""
        />
      </div>
    </div>
    
  </div>
  <chatVue @cancel="openChat()" :user_receive="user_receive" v-if="showChat" />
</template>

<script>
import navbar from "../components/header/navbar.vue";
import leftnav from "../components/header/leftnav.vue";
import post from "../components/post/post.vue";
import rightnav from "../components/header/rightnav.vue";
import userService from "../plugins/userService";
import inputform from "../components/post/inputform.vue";
import chatVue from "../components/chat.vue";
export default {
  data() {
    return {
      isShow: false,
      user: "",
      users: [],
      showBanner: true,
      user_receive: "",
      showChat: false,
    };
  },

  mounted() {
    // Xử lý sự kiện trạng thái
    this.user = userService.getUserToken();
    if (this.user) {
      this.showBanner = false;
    }
    this.getUser();
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
    async getUser() {
      try {
        const result = await this.$axios.get("user/get");
        this.users = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    openChat() {
      this.showChat = !this.showChat;
    },
    sendUser(id)
    {
      this.user_receive= id
    }
  },
};
</script>

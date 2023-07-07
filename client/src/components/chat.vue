<template>
  <div
    class="fixed md:right-20 right-0 bottom-0 z-30 w-80 h-96 flex flex-col border shadow-md bg-white"
  >
    <div class="flex items-center justify-between border-b p-2">
      <!-- user info -->
      <div class="flex items-center" v-for="user in usersocket.filter(item=>item.id == this.user_receive)">
        <img
          class="rounded-full w-10 h-10" :src="user.avatar"
        />
        <div class="pl-2">
          <div class="font-semibold">
            <a class="hover:underline" href="#">John Doe</a>
          </div>
          <div class="text-xs text-gray-600">Online</div>
        </div>
      </div>
      <!-- end user info -->

      <!-- chat box action -->
      <div>
        <button
          @click="onclose"
          class="inline-flex hover:bg-indigo-50 rounded-full p-2"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <!-- end chat box action -->
    </div>

    <div class="flex-1 px-4 py-4 overflow-y-auto">
      <!-- người đang nhắn -->

      <div class="flex items-center mb-4">
        <div class="flex-none flex flex-col items-center space-y-1 mr-4">
          <img
            class="rounded-full w-10 h-10"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <a href="#" class="block text-xs hover:underline">John Doe</a>
        </div>
        <div
          class="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative"
        >
          <div class="text-xs md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </div>

          <!-- arrow -->
          <div
            class="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"
          ></div>
          <!-- end arrow -->
        </div>
      </div>

      <!-- end người đang nhắn -->

      <!-- chat bản thân người nhắn -->

      <div class="flex items-center flex-row-reverse mb-4">
        <div
          class="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative"
        >
          <div class="text-xs md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </div>

          <!-- arrow -->
          <div
            class="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"
          ></div>
          <!-- end arrow -->
        </div>
      </div>

      <!-- end chat bản thân người nhắn -->
    </div>

    <div class="flex items-center border-t p-2">
      <div class="w-full mx-2">
        <input
          class="w-full rounded-full border border-gray-200"
          type="text"
          value=""
          placeholder="Aa"
          autofocus
        />
      </div>
    </div>
  </div>

  <!-- end chat box -->
</template>

<script>
import userService from "../plugins/userService";
import io from 'socket.io-client';

export default {
  emits: ["cancel"],
  props: ["user_receive"],
  data() {
    return {
      users: [],
      user: "",
      usersocket:[]
    };
  },
  components: {},
  mounted() {
    console.log(this.user_receive);
    this.user = userService.getUserToken();
    userService.renderUser().then((data) => {
      this.users = data;
    });
    const socket = io('http://localhost:3000');
    const userId = this.user.id;
    socket.emit("userConnected", userId);
    socket.on("UpdateUserStatus", (data) => {
      this.updateUserStatus(data);
      console.log(this.usersocket);
    });
    socket.on("Updatedisconnect", (data) => {
      this.updateUserStatus(data);
    });

  },
  methods: {
    onclose() {
      this.$emit("cancel");
    },
    updateUserStatus(data) {
      this.usersocket = this.users.map((user) => {
        return {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          online: data[user.id],
        };
      });
    },
  },
};
</script>

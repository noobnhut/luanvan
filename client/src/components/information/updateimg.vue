<template>
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto"
  >
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div
      class="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Cập nhập ảnh</h5>
        <i
          class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl"
          @click="onclose"
        ></i>
      </div>

      <div class="py-4 px-4">
        <!--bắt đầu img-->
        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            v-if="showimg"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold"
                  >Nhấn để tải ảnh hoặc video lên</span
                >
              </p>
              <!-- <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> -->
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              accept=".png, .jpeg, .gif, .jpg"
              @change="onFileSelected"
            />
          </label>
          <img
            class="max-w-sm w-full mx-auto h-32 md:h-64 mt-1"
            :src="imageUrl"
            alt=""
            v-if="!showimg"
          />
        </div>
        <p class="text-red-500 text-sm ml-1" v-if="!avatar && avatarFocusted">
          Vui lòng chọn ảnh.
        </p>
        <!--kết thúc img-->
      </div>

      <div class="modal-footer py-3 px-4">
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
          @click="updateImg"
        >
          Cập nhập
        </button>
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
          @click="onclose()"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
  <toast ref="toast"></toast>
</template>

<script>
import userService from "../../plugins/userService";
import toast from "../toast/toast.vue";
export default {
  emits: ["cancel"],
  data() {
    return {
      user: "",
      avatar: null,
      showimg: true,
      imageUrl: "",
      avatarFocusted: false,
    };
  },
  components: { toast },
  mounted() {
    this.user = userService.getUserToken();
  },
  methods: {
    onclose() {
      this.$emit("cancel");
    },
    onFileSelected(event) {
      const maxFileSizeInBytes = 10 * 1024 * 1024;
      const file = event.target.files[0];
      if (file.size <= maxFileSizeInBytes) {
        this.avatar = file;
        this.imageUrl = URL.createObjectURL(this.avatar);
        this.showimg = false;
      } else {
        this.$refs.toast.showToast("Ảnh nhỏ hơn hoặc bằng 10mb");
      }
    },
    async updateImg() {
      this.avatarFocusted = true;
      if (this.avatar) {
        const formData = new FormData();
        formData.append("avatar", this.avatar);
        try {
          const response = await this.$axios.put(
            `user/updateimg/${this.user.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status == 200) {
            localStorage.setItem("user", JSON.stringify(response.data.img));
            this.$refs.toast.showToast(response.data.message);
            setTimeout(() => {
              this.onclose();
              location.reload();
            }, 2000);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>

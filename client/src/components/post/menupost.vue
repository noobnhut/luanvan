<template>
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
  >
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div
      class="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto md:h-auto"
    >
      <div class="flex flex-row py-2 px-2">
        <h5 class="text-lg font-semibold flex-grow">Menu cập nhập bài đăng</h5>
        <button
          @click="onclose"
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="staticModal"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div class="py-4 px-2 flex flex-col justify-center items-center">
        <button
          @click="onShow"
          class="w-full py-2 mt-5 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
        >
          Cập nhập nội dung
        </button>

        <button @click="onMedia"
          class="w-full py-2 mt-5 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
        >
          Thêm hình ảnh
        </button>

        <button @click="onMedia2"
          class="w-full py-2 mt-5 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
        >
          Thêm video
    </button>

        <button
          @click="deletevideo()"
          class="w-full py-2 mt-5 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
        >
          Xóa video
        </button>

        <button
          @click="deleteimg()"
          class="w-full py-2 mt-5 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
        >
          Xóa hình ảnh
        </button>

        <button
          class="w-full py-2 mt-5 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
        >
          Cập nhập trạng thái
        </button>
      </div>
    </div>
  </div>
  <editpostVue
    v-if="isShowModel"
    @cancel="onShow"
    :postId="postId"
    :citycode="citycode"
    :districtcode="districtcode"
    :communecode="communecode"
  />
  <addmedia
    v-if="isShowModelMedia"
    @cancel="onMedia"
    :postId="postId"
  />
  <addmedia2
    v-if="isShowModelMedia2"
    @cancel="onMedia2"
    :postId="postId"
  />
</template>

<script>
import addmedia from './addmedia.vue'
import addmedia2 from './addmedia2.vue'

import editpostVue from "./editpost.vue";
export default {
  emits: ["cancel"],
  props: ["postId", "citycode", "districtcode", "communecode"], // Khai báo prop postId
  data() {
    return {
      isShowModel: false,
      isShowModelMedia:false,
      isShowModelMedia2:false
    };
  },
  components: {
    editpostVue,
    addmedia,
    addmedia2
  },
  methods: {
    onclose() {
      this.$emit("cancel");
    },

    onShow() {
      this.isShowModel = !this.isShowModel;
    },
    onMedia() {
      this.isShowModelMedia = !this.isShowModelMedia;
    },
    onMedia2() {
      this.isShowModelMedia2 = !this.isShowModelMedia2;
    },
    async deleteimg() {
      try {
        const result = await this.$axios.delete(
          `post/deleteimgbypost/` + this.postId
        );
        if (result.status === 200) {
          console.log("xóa thành công");
          location.reload();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async deletevideo() {
      try {
        const result = await this.$axios.delete(
          `post/deleteVideobypost/` + this.postId
        );
        console.log(result.status);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

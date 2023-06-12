<template>
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Báo cáo người dùng</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
            </div>

            <div class="py-4 px-4">
                <div class=" w-full">
                    <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                        placeholder="Nhập nội dung ..." v-model="report_content"></textarea>
                </div>
            </div>

            <div class="modal-footer py-3 px-4 ">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="report">Báo cáo</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclose()">Đóng</button>
            </div>
        </div>
    </div>
    <toast ref="toast" />
</template>

<script>

import userService from '../../plugins/userService';
import toast from '../toast/toast.vue';
export default {
    emits: ["cancel"],
    data() {
        return {
            user: '',
            report_content: ''
        };
    },
    components: { toast },
    mounted() {
        this.user = userService.getUserToken();

    },
    methods: {
        onclose() {
            this.$emit('cancel')
        },
        async report() {
            try {
                const result = await this.$axios.post(
                    `report/add`,
                    {
                        user_report: this.user.id,
                        user_reported: this.$route.params.id,
                        report_content: this.report_content
                    }
                )
                this.$refs.toast.showToast(result.data.message);
            } catch (error) {
                console.log(error)
            }
        }
    },
}

</script>

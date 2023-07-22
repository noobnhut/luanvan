<template>
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div class=" bg-white w-11/12 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-full">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cài đặt thông báo</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
            </div>
            <label class="relative inline-flex items-center mr-5 ml-5 cursor-pointer">
                <input type="checkbox" class="sr-only peer" :checked="user.notification_status" @click="openStatus()">
                <div
                    class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600">
                </div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Trạng thái nhận thông báo</span>
            </label>

            <div class=" py-4 px-2 overflow-y-auto ">
                <button
                    class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="openadd()">
                    Thêm
                </button>
                <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
                    <thead>
                        <tr class="text-left">
                            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT:</th>
                            <th class=" text-gray-500 font-bold tracking-wider uppercase text-xs">
                                <input id="checked-checkbox" type="checkbox" disabled
                                    class=" w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded">
                            </th>
                            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Loại bài đăng:
                            </th>
                            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Bán kính</th>
                            <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Chức năng:</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(noti, index) in notis" :key="index">
                            <td class="border-t">
                                <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                            </td>

                            <td class="border-t ">
                                <input id="checked-checkbox" type="checkbox" :checked="noti.status"
                                    @click="openChoice(); sendNoti(noti)"
                                    class="w-4 h-4  text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500">
                            </td>

                            <td class="border-t">
                                <span class="text-gray-700 px-6 py-4 flex items-center">{{ noti.type_post }}</span>
                            </td>

                            <td class="border-t">
                                <span class="text-gray-700 px-6 py-4 flex items-center">{{ noti.location_radius }} km</span>
                            </td>

                            <td class="border-t">
                                <span class="px-6 py-4 flex items-center">
                                    <span
                                        class="px-2 rounded-full text-sm uppercase tracking-wide font-semibold bg-green-200 text-green-800 cursor-pointer mr-2"
                                        @click="openupdate(); sendNoti(noti)">Cập
                                        nhập</span>
                                    <span
                                        class="px-2 rounded-full text-sm uppercase tracking-wide font-semibold bg-red-200 text-red-800 cursor-pointer"
                                        @click="onclosedelete(); sendNoti(noti)">Xóa</span>
                                </span>
                            </td>

                        </tr>

                    </tbody>
                </table>

            </div>

            <div class="modal-footer py-3 px-4">
                <button
                    class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclose()">
                    Đóng
                </button>
            </div>
        </div>
    </div>
    <!--modal add-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowAdd">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click=" openadd()"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Thêm cài đặt thông báo</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click=" openadd()"></i>
            </div>

            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Loại danh mục</label>
                    <select id="select" name="select" v-model="type_post"
                        class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                        <option disabled selected>Chọn loại bài đăng</option>
                        <option value="Tìm kiếm">Tìm kiếm</option>
                        <option value="Trao tặng">Trao tặng</option>
                        <option value='Trao đổi'>Trao đổi</option>

                    </select>
                    <p class="text-red-500 text-sm ml-1" v-if="!type_post && typeFocused">Không được để trống.</p>
                </div>
            </div>

            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Bán kinh (km)</label>
                    <input type="text"
                        class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                        v-model="location_radius" required>
                    <p class="text-red-500 text-sm ml-1" v-if="!location_radius && radiusFocused">Không được để trống.</p>
                    <p class="text-red-500 text-sm ml-1" v-else-if="!validNumber(location_radius) && radiusFocused">Chỉ
                        nhập số và số bán kính từ 0.</p>

                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="addSetting">Thêm</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="openadd()()">Đóng</button>
            </div>
        </div>
    </div>

    <!--modal update-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowUpdate">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click=" openupdate()"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Thêm cài đặt thông báo</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click=" openupdate()"></i>
            </div>


            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Loại danh mục</label>
                    <select id="select" name="select" v-model="type_post"
                        class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                        <option disabled selected>Chọn loại bài đăng</option>
                        <option value="Tìm kiếm">Tìm kiếm</option>
                        <option value="Trao tặng">Trao tặng</option>
                        <option value='Trao đổi'>Trao đổi</option>

                    </select>
                    <p class="text-red-500 text-sm ml-1" v-if="!type_post && typeFocused">Không được để trống.</p>
                </div>
            </div>

            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Bán kinh (km)</label>
                    <input type="text"
                        class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                        v-model="location_radius" required>
                    <p class="text-red-500 text-sm ml-1" v-if="!location_radius && radiusFocused">Không được để trống.</p>
                    <p class="text-red-500 text-sm ml-1" v-else-if="!validNumber(location_radius) && radiusFocused">Chỉ
                        nhập số và số bán kính từ 0.</p>

                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="updateSetting">Cập nhập</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="openupdate()">Đóng</button>
            </div>
        </div>
    </div>

    <!--modal xóa-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowdelete">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="onclosedelete"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Xóa cài đặt</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclosedelete"></i>
            </div>
            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Bạn có muốn xóa <span
                            class="font-bold ">cài đặt này ?</span> </label>

                </div>
            </div>
            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="deleteSetting()">Xóa</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclosedelete()">Đóng</button>
            </div>
        </div>
    </div>

    <!--model choice-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowChoice">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="openChoice()"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Xác nhận</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="openChoice()"></i>
            </div>
            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Bạn có muốn chọn <span
                            class="font-bold ">cài đặt này ?</span> </label>

                </div>
            </div>
            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="choice()">Xác nhận</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="openChoice()">Đóng</button>
            </div>
        </div>
    </div>

    <!--model status-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowStatus">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="openStatus()"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Xác nhận</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="openStatus()"></i>
            </div>
            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Bạn có muốn chuyển <span
                            class="font-bold ">trạng thái ?</span> </label>

                </div>
            </div>
            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="changeStatus()">Xác nhận</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="openStatus()">Đóng</button>
            </div>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>

<script>
import userService from '../../plugins/userService';
import toast from "../toast/toast.vue";
export default {
    emits: ["cancel"],
    data() {
        return {
            user: "",
            notis: [],
            status: '',
            type_post: '',
            location_radius: 0,
            isShowAdd: false,
            isShowdelete: false,
            send: '',
            isShowChoice: false,
            isShowStatus: false,
            isShowUpdate: false,
            id: '',
            typeFocused: false,
            radiusFocused: false
        };
    },
    components: {
        toast,
    },
    mounted() {
        this.user = userService.getUserToken();
        this.getNoti()
    },
    methods: {
        onclose() {
            this.$emit("cancel");
        },
        async getNoti() {
            try {
                const result = await this.$axios.get(`notiSetting/get/` + this.user.id);
                this.notis = result.data

            } catch (error) {
                console.log(error)
            }
        },

        async choice() {
            try {
                const result = await this.$axios.put(`notiSetting/choice/` + this.send.id,
                    {
                        "id_user": this.user.id
                    });
                this.isShowChoice = false
                this.getNoti()
                this.$refs.toast.showToast(result.data.message);
            } catch (error) {
                console.log(error)
            }
        },
        async addSetting() {
            this.typeFocused = true
            this.radiusFocused = true
            if (this.type_post && this.location_radius && this.validNumber(this.location_radius)) {
                try {
                    const result = await this.$axios.post(`notiSetting/create`,
                        {
                            id_user: this.user.id,
                            location_radius: this.location_radius,
                            type_post: this.type_post
                        })
                    if (result.status == 200) {
                        this.$refs.toast.showToast(result.data.message);
                        this.isShowAdd = false
                        this.typeFocused = false
                        this.radiusFocused = false
                        this.getNoti()
                    }
                    else {
                        this.$refs.toast.showToast(result.data.message);
                    }
                } catch (error) {
                    console.log(
                        error
                    )
                }
            }

        },
        async deleteSetting() {
            try {
                const result = await this.$axios.delete(`notiSetting/delete/` + this.send.id)
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message);
                    this.isShowdelete = false
                    this.getNoti()
                }
                else {
                    this.$refs.toast.showToast(result.data.message);
                }
            } catch (error) {
                console.log(error)
            }
        },
        sendNoti(noti) {
            this.send = noti
            this.type_post = noti.type_post;
            this.status = noti.status;
            this.location_radius = noti.location_radius
            this.id = noti.id
        },
        async changeStatus() {
            try {
                const id = this.user.id
                const result = await this.$axios.put(`user/updatenoti/` + id);
                if (result.status == 200) {
                    localStorage.setItem('user', JSON.stringify(result.data))

                    this.$refs.toast.showToast('Chuyển trạng thái thành công');
                    this.isShowStatus = false
                }
                else {
                    this.$refs.toast.showToast(result.data.message);
                }
            } catch (error) {

            }
        },
        async updateSetting() {
            this.typeFocused = true
            this.radiusFocused = true
            if (this.type_post && this.location_radius && this.validNumber(this.location_radius)) {
                try {
                    const result = await this.$axios.put(`notiSetting/update/`,
                        {
                            id_user: this.user.id, location_radius: this.location_radius, type_post: this.type_post, id: this.id
                        })
                    if (result.status == 200) {
                        this.$refs.toast.showToast(result.data.message);
                        this.isShowUpdate = false
                        this.typeFocused = false
                        this.radiusFocused = false
                        this.getNoti()
                    }
                    else {
                        this.$refs.toast.showToast(result.data.message);
                    }
                } catch (error) {
                    console.log(error)
                }
            }

        },
        openStatus() {
            this.isShowStatus = !this.isShowStatus
        },
        openadd() {
            this.location_radius = ''
            this.type_post = ''
            this.isShowAdd = !this.isShowAdd
        },
        onclosedelete() {
            this.isShowdelete = !this.isShowdelete
        },
        openChoice() {
            this.isShowChoice = !this.isShowChoice
        },
        openupdate() {
            this.isShowUpdate = !this.isShowUpdate
        },
        validNumber(number) {
            // Kiểm tra số không âm và không chứa chữ cái
            const re = /^[0-9]+$/;
            return re.test(number);
        },



    },
};
</script>
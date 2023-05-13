<template>
    <div class="absolute right-10">
        <button @click="openShowAdd"
            class="shadow inline-flex items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-5 h-5" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Thêm
        </button>
    </div>

    <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-800">Quản lý danh mục</h2>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <thead>
                <tr class="text-left">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên danh mục:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Chức năng:</th>

                </tr>
            </thead>
            <tbody>

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(cat, index) in cats" :key="index">
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ cat.cat_name }}</span>
                    </td>

                    <td class="border-t">
                        <span class="px-6 py-4 flex items-center">
                            <span
                                class="px-2 rounded-full text-sm uppercase tracking-wide font-semibold bg-green-200 text-green-800 cursor-pointer" @click="openShowUpdate();select(cat)">Sửa</span>
                            <span
                                class="px-2 rounded-full text-sm uppercase tracking-wide font-semibold bg-red-200 text-red-800 cursor-pointer"
                                @click="openShowdelete();select(cat)">Xóa</span>
                        </span>
                    </td>

                </tr>

            </tbody>
        </table>
    </div>

    <!--modal add-->

    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowAdd">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="onclose"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto " >
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Thêm danh mục</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
            </div>
        
            <div class="px-4">
                <div>
                    <label  class="block mb-2 text-sm font-medium text-gray-900 ">Tên danh mục</label>
                    <input type="text" class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none " v-model="cat_name" required>
                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4" @click="addCat">Thêm</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclose()">Đóng</button>
            </div>
        </div>
    </div>

    <!--modal sửa-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowUpdate">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="oncloseUpdate"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto " >
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập danh mục</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="oncloseUpdate"></i>
            </div>
        
            <div class="px-4">
                <div>
                    <label  class="block mb-2 text-sm font-medium text-gray-900 ">Tên danh mục</label>
                    <input type="text" class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none " v-model="cat_name" required>
                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4" @click="updateCat">Cập nhập</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="oncloseUpdate()">Đóng</button>
            </div>
        </div>
    </div>

    <!--modal xóa-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowdelete">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="onclosedelete"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto " >
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Xóa danh mục</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclosedelete"></i>
            </div>    
            <div class="px-4">
                <div>
                    <label  class="block mb-2 text-sm font-medium text-gray-900 ">Bạn có muốn xóa danh mục: <span class="font-bold ">{{ cat_name }}</span> </label>
                    
                </div>
            </div>
            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4" @click="deleteCat">Xóa</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclosedelete()">Đóng</button>
            </div>
        </div>
    </div>
    
    <toast ref="toast"></toast>
</template>

<script>
import toast from '../../components/toast/toast.vue';

export default
    {
        data() {
            return {
                cats: [],
                cat_name: '',
                id: '',
                isShowAdd:false,
                isShowUpdate:false,
                isShowdelete:false
            }
        },
        components: {
            toast
        },
        mounted() {
            this.getCat();

        },
        methods: {
            select(cat) {
                this.cat_name = cat.cat_name,
                this.id = cat.id
                console.log(this.id)
            },
            async addCat() {
               
                const catadd = await this.$axios.post(
                    'addcat',
                    {
                        cat_name: this.cat_name
                    }
                )
                this.$refs.toast.showToast(catadd.data.message)
                setTimeout(() => {
                    location.reload()
                }, 1000);
                this.getCat()
            },
            async getCat() {
                try {
                    const result = await this.$axios.get(
                        `getcat`
                    );
                    this.cats = result.data;
                    console.log(result);

                } catch (e) {
                    console.log(e);
                }
            },
            async updateCat() {
                const catupdate = await this.$axios.put(
                    `updatecat/` + this.id,
                    {
                        cat_name: this.cat_name
                    }
                )
                console.log(catupdate)
                this.$refs.toast.showToast(catupdate.data.message)
                this.getCat()

            },
            async deleteCat() {
                const catdelete = await this.$axios.delete(
                    `deletecat/` + this.id,
                )
                this.$refs.toast.showToast(catdelete.data.message)
                this.onclosedelete()
                this.getCat()

            },
            openShowAdd()
            {
                this.isShowAdd=!this.isShowAdd
            },
            onclose()
            {
                this.isShowAdd=!this.isShowAdd
            },
            openShowUpdate()
            {
                this.isShowUpdate=!this.isShowUpdate
            },
            oncloseUpdate()
            {
                this.isShowUpdate=!this.isShowUpdate
            },
            openShowdelete()
            {
                this.isShowdelete=!this.isShowdelete
            },
            onclosedelete()
            {
                this.isShowdelete=!this.isShowdelete
            }
        }
    }
</script>
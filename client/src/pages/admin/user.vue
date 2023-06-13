<template>
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-800">Quản lý người dùng</h2>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow cursor-pointer">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <thead>
                <tr class="text-left ">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên người dùng</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Địa chỉ:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Ngày tạo:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Số lần bị báo cáo:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tổng số bài đăng:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Trạng thái tài khoản: </th>
              
                </tr>
            </thead>
            <tbody class="text-sm">

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(user, index) in users" :key="index">
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            <img class="w-10 h-10 md:w-10 md:h-10  mr-2" :src="user.avatar" alt="Avatar" />
                            {{ user.username }}
                        </span>
                    </td>

                    <td class="border-t">
                        <div class="flex items-center text-gray-700">
                            <div v-for="city in citys.filter(items => items.code == user.citycode)">
                                <span v-for="district in city.districts.filter(items => items.code == user.districtcode)">
                                    <span v-for="commune in district.wards.filter(items => items.code == user.communecode)">
                                        <span>{{ user.address + ', ' + commune.name + ',' }}</span>
                                        <br> <span>{{ district.name + ', ' + city.name }}</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ formattedDate(user.createdAt) }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ sumreport(user.id) }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ sumPost(user.id) }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            <span v-if="user.isUser == 1" class=" text-blue-900">Hoạt động</span>
                            <span v-if="user.isUser == 0" class=" text-red-800">Đã khóa
                            </span>
                        </span>
                    </td>
                    
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
import userService from '../../plugins/userService';
import addressService from '../../plugins/addressService';
import postService from '../../plugins/postService';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            users: [],
            citys: [],
            reports: [],
            posts: []
        }
    },
    mounted() {
        userService.renderUser().then((data) => { this.users = data });
        addressService.getCountry().then(data => {
            this.citys = data;
        });
        userService.getreport().then((data) => { this.reports = data })

        postService.renderPost().then((data) => {
            this.posts = data
        });
    },
    methods:
    {
        formattedDate(time) {
            return dayjs(time).format('DD-MM-YYYY HH:mm:ss');
        },
        sumreport(userId) {
            let sum = 0;
            for (let i = 0; i < this.reports.length; i++) {
                if (this.reports[i].user_reported === userId) {
                    sum++;
                }
            }
            return sum;
        },
        sumPost(userId) {
            let sum = 0;
            for (let i = 0; i < this.posts.length; i++) {
                if (this.posts[i].User.id == userId) {
                    sum++;
                }
            }
            return sum;
        }
    }
}
</script>
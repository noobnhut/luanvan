<template>
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-800">Quản lý báo cáo</h2>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow">

        <div class=" md:mr-2 mt-5 py-2 px-2">
            <label>Chọn người dùng:</label>
            <select v-model="userid" @change="selectUser()"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">

                <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.username }}
                </option>
            </select>
        </div>
        <div class=" m-2 rounded-md bg-white ">
                <span class="font-bold">Hình thức xử lý: </span>
                <span class="px-2 py-2 mr-2 rounded-sm text-sm uppercase tracking-wide font-semibold bg-green-200 text-green-800 cursor-pointer">Nhắc nhở</span>
                <span class="px-2 py-2 rounded-sm text-sm uppercase tracking-wide font-semibold bg-red-200 text-red-800 cursor-pointer">Khóa tài khoản</span>
        </div>
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <thead>
                <tr class="text-left ">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Người dùng báo cáo</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Nội dung báo cáo</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Ngày báo cáo:</th>

                </tr>
            </thead>
            <tbody class="text-sm">

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(report, index) in reports" :key="index">
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>

                    <td class="border-t" v-for="user in users.filter(items => items.id === report.user_report)">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            <img class="w-10 h-10 md:w-10 md:h-10  mr-2" :src="user.avatar" alt="Avatar" />
                            {{ user.username }}
                        </span>
                    </td>
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ report.report_content }}</span>
                    </td>
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ formattedDate(report.createdAt) }}</span>
                    </td>

                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
import userService from '../../plugins/userService';
import addressService from '../../plugins/addressService';

import dayjs from 'dayjs';
export default {
    data() {
        return {
            users: [],
            citys: [],
            reports: [],
            userid: ''
        }
    },
    mounted() {
        userService.renderUser().then((data) => { this.users = data });
        addressService.getCountry().then(data => {
            this.citys = data;
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
        selectUser() {
            userService.getreport().then((data) => { this.reports = data.filter(item => item.user_reported === this.userid) })
        }

    }
}
</script>
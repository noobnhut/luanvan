<template>
    <div class="w-full px-6 mx-auto mb-10">
        <div class="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl" style="background-image: url('https://haycafe.vn/wp-content/uploads/2022/01/Hinh-nen-Macbook-3D-moi-nhat.jpg'); background-position-y: 50%">
            <span class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
          </div>
        <div class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
          <div class="flex flex-wrap -mx-3">
            <div class="flex-none w-auto max-w-full px-3">
              
            </div>
            <div class="flex-none w-auto max-w-full px-3 my-auto">
              <div class="h-full">
                <h5 class="mb-1">Quản lý báo cáo</h5>
              </div>
            </div>
            <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
              <div class="relative right-0">
                <ul class="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl flex-col on-resize h-20" >
                 
               </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
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

        <div class=" m-2 rounded-md bg-white " v-if="showIsUser">
            <span class="font-bold">Hình thức xử lý: </span>
           
            <span @click=" getMail(), sendbanned()"
                class="px-2 py-2 rounded-sm text-sm uppercase tracking-wide font-semibold bg-red-200 text-red-800 cursor-pointer">Khóa
                tài khoản</span>
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
        <div> <p class="sr-only mt-2">aaa</p></div>

    </div>
    <toast ref="toast"></toast>
</template>

<script>
import userService from '../../plugins/userService';
import addressService from '../../plugins/addressService';
import toast from '../../components/toast/toast.vue';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            users: [],
            citys: [],
            reports: [],
            userid: '',
            showIsUser: false
        }
    },
    components:
    {
        toast
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
            this.showIsUser = true
            userService.getreport().then((data) => { this.reports = data.filter(item => item.user_reported === this.userid) })
        },

        getMail() {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === this.userid) {
                    return this.users[i].email
                }
            }
        },
        async sendbanned() {
            const mail = this.getMail()
            try {
                const result = await this.$axios.post(`sendmail/banned`,
                    {
                        to: mail
                    });

                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message);
                }

            } catch (error) {
                console.log(error)
            }
        }

    }
}
</script>
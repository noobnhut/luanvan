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
                <h5 class="mb-1">Quản lý người dùng</h5>
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
        <h2 class="text-xl font-bold text-gray-800">Quản lý người dùng</h2>
    </div>
    <div class=" md:mr-2 mt-5 py-2 px-2">
        <select id="select" name="select" v-model="is_active" @change="getUser()"
            class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
            <option disabled selected>Chọn loại bài đăng</option>
            <option value="1">Hoạt động</option>
            <option value="0">Bị khóa</option>
        </select>
    </div>
    <div class="overflow-x-auto bg-white rounded-lg shadow cursor-pointer">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <thead>
                <tr class="text-left ">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên người dùng</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Địa chỉ</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Ngày tạo</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Số lần bị báo cáo</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tổng số bài đăng</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs" v-if="showIsUser">Hành
                        động</th>

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

                   
                    <td class="border-t" v-if="showIsUser">
                        <span @click=" send_unbanned(user.email)"
                            class="px-2 py-2 mr-2 rounded-sm text-sm uppercase tracking-wide font-semibold bg-green-200 text-green-800 cursor-pointer">Mở khóa</span>

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
import postService from '../../plugins/postService';
import dayjs from 'dayjs';
import toast from '../../components/toast/toast.vue';

export default {
    data() {
        return {
            users: [],
            citys: [],
            reports: [],
            posts: [],
            is_active: '',
            showIsUser: false
        }
    },
    components:
    {
        toast
    },
    mounted() {
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
                if (this.posts[i].user.id == userId) {
                    sum++;
                }
            }
            return sum;
        },
        getUser() {
           
            userService.renderUser().then((data) => { this.users = data.filter(items => items.is_active == this.is_active) });
            if(this.is_active == 0)
            {
                this.showIsUser = true
            }
            else
            {
                this.showIsUser = false

            }
        },
       async send_unbanned(email)
        {
           
            try {
               const result = await this.$axios.post(`sendmail/unbanned`,
               {
                    to:email
               });
            
              if(result.status == 200)
              {
                this.$refs.toast.showToast(result.data.message);
                setTimeout(() => {
                   
                   this.is_active =1
                   this.getUser()
                }, 1000)
              }
               
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
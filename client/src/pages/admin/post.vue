<template>
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-800">Quản lý bài đăng</h2>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped cursor-pointer">
            <thead>
                <tr class="text-left ">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tiêu đề</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Nội dung bài đăng</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Địa chỉ</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Hình ảnh và video</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tổng bình luận</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tổng lượt thích</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tổng lưu bài đăng</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Ngày tạo</th>
                </tr>
            </thead>
            <tbody class="text-sm">

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(post, index) in posts" :key="index">
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{post.title }}
                        </span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{post.post_content }}
                        </span>
                    </td>

                    <td class="border-t">
                        <div class="flex items-center text-gray-700">
                            <div v-for="city in citys.filter(items => items.code == post.citycode)">
                                <span v-for="district in city.districts.filter(items => items.code == post.districtcode)">
                                    <span v-for="commune in district.wards.filter(items => items.code == post.communecode)">
                                        <span>{{ commune.name + ', ' + district.name + ', ' +
                                            city.name
                                        }}</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </td>

                    <td class="border-t">
                        <span class="text-blue-700 px-6 py-4 flex items-center ">Xem ảnh và video</span>
                    </td>

                    <td class="border-t flex items-center">
                        <span class="text-gray-700 px-6 py-4 ">{{ sumcomment(post.id) }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ sumlike(post.id) }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ sumfollow(post.id) }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ formattedDate(post.createdAt) }}</span>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
import addressService from '../../plugins/addressService';
import postService from '../../plugins/postService';
import dayjs from 'dayjs';
export default {
    data() {
        return {
            citys: [],
            posts:[],
            likes:[],
            comments:[],
            follows:[]
        }
    },
    mounted() {
        addressService.getCountry().then(data => {
            this.citys = data;
        });
        postService.renderPost().then((data) => {
                this.posts = data    
        });
        postService.getLike().then((data)=>{this.likes = data})
        postService.getcomment().then((data)=>{this.comments = data})
        postService.getfollow().then((data)=>{this.follows = data})
    },
    methods:
    {
        formattedDate(time) {
            return dayjs(time).format('DD-MM-YYYY HH:mm:ss');
        },
        sumlike(postID) {
            let sum = 0;
            for (let i = 0; i < this.likes.length; i++) {
                if (this.likes[i].id_post === postID) {
                    sum++;
                }
            }
            return sum;
        },
        sumcomment(postID) {
            let sum = 0;
            for (let i = 0; i < this.comments.length; i++) {
                if (this.comments[i].id_post === postID) {
                    sum++;
                }
            }
            return sum;
        },
        sumfollow(postID) {
            let sum = 0;
            for (let i = 0; i < this.follows.length; i++) {
                if (this.follows[i].id_post === postID) {
                    sum++;
                }
            }
            return sum;
        },
    }
}
</script>
<template>
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto ">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" ></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto " >
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Đánh giá người dùng</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
            </div>

            <div class="py-4 px-4">
                <StarRating  
                :star-size="30"
                :increment="0.1"
                :star-color="'text-yellow-500'" 
                :empty-star-color="'text-gray-300'"
                v-model:rating="rating"/> 
                <p class="text-red-500 text-sm ml-1" v-if="!rating && ratingFocused">Không được để trống.</p>
                 
            </div>
            <div class="py-4 px-4">
                <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                placeholder="Nhập nội dung ..." v-model="content"></textarea>
                <p class="text-red-500 text-sm ml-1" v-if="!content && contentFocused">Không được để trống.</p>

            </div>
            <div class="modal-footer py-3 px-4 ">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4" @click="ratingUser()">Đánh giá</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclose()">Đóng</button>
            </div>
        </div>
    </div>
  <toast ref="toast"></toast>
    
</template>


<script>
import StarRating from 'vue-star-rating'
import toast from '../toast/toast.vue'
import userService from '../../plugins/userService'
export default {
    emits: ["cancel"],
    data() {
        return {
            rating:0,
           content:'',
           user:'',
           ratingFocused:false,
           contentFocused:false
        }
    },
    components:{StarRating,toast},
    mounted()
    {
        this.user = userService.getUserToken()
    },
    methods:
    {
        
        onclose() {
            this.$emit('cancel')
        },
        async ratingUser()
        {
            this.ratingFocused=true;
            this.contentFocused=true;  
           if(this.rating && this.content)
           {
            try {
                const result = await this.$axios.post('rating/add',
                {
                    to_user:this.$route.params.id ,
                    from_user:this.user.id,
                    score:this.rating,
                    content:this.content
                })

                this.$refs.toast.showToast(result.data.message);
               if(result.status === 200)
               {
                this.ratingFocused=false;
            this.contentFocused=false;  
                this.onclose()
               }
            } catch (error) {
                console.log(error)
            }
           } 
                  
        }
    }
}
</script>

<template>
    <section class=" py-2 bg-blueGray-100 rounded-t-10xl overflow-hidden">
        <div class="container px-4 mx-auto" v-for="rating in ratings.filter(item=>item.to_user == id)">
          <a class="inline-block mb-14 text-xl font-heading font-medium  hover:text-darkBlueGray-700">{{ sumrating() }} đánh giá</a>

          <div class="mb-2 shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden" v-if="sumrating()>0">
            <div class="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
              <div class="flex flex-wrap items-center">
                <img class="mr-6 rounded-full h-10 w-10" :src="rating.user.avatar" alt="">
                <h4 class="w-full md:w-auto text-xl font-heading font-medium">{{rating.user.username}}</h4>
                <div class="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
                <div class="inline-flex">
                 <StarRating 
                 :star-size="30"
                 :read-only="true"
                 :rating=parseFloat(rating.rating_score)
                 :increment="0.1"
                 :star-color="'text-yellow-500'" 
                 :empty-star-color="'text-gray-300'"/>
                </div>
              </div>
            </div>
            <div class="px-4 overflow-hidden md:px-16 pt-8  bg-white">
              <div class="flex flex-wrap">
                <div class="w-full md:w-2/3 mb-6 md:mb-0">
                  <p class="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">{{rating.rating_content}}</p>
                </div>
                <div class="w-full md:w-1/3 text-right">
                  <p class="mb-8 text-sm text-gray-300">{{formatTime(rating.createdAt)}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>

<script>
import StarRating from 'vue-star-rating'
import userService from '../../plugins/userService'
import dayjs from 'dayjs';

export default {
    data() {
        return {
           
            user:'',
            ratings:[],
            id:''
        }
    },
    components:{StarRating},
    mounted()
    {
        this.user = userService.getUserToken()
        this.getRating()
        this.id = this.$route.params.id
      
    },
    methods:
    {
      async getRating()
      {
        try {
          const result = await this.$axios.get('rating/get');
          this.ratings = result.data
        } catch (error) {
          console.log(error)
        }
      },
      formatTime(timeString) {
        return dayjs(timeString).format('MM-DD-YYYY');
      },
      sumrating() {
      return this.ratings.filter(item => item.to_user == this.id).length;
  },
    }
}
</script>
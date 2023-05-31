<div class="max-w-xl w-full mx-auto rounded-md shadow-md overflow-hidden mt-6 "
            v-for="post in posts.filter(item => item.id === search.id)">
            <!-- Header -->
            <div class="flex items-center px-4 py-2 bg-white border-b">
                <img class="w-10 h-10 rounded-full mr-2" :src="post.User.avatar" alt="Avatar">

                <div class="flex-grow">
                    <h3 @click="goIn4(post.User.username, post.User.id)" class="text-gray-900 font-medium cursor-pointer">{{
                        post.User.username }}</h3>
                    <p class="text-gray-500 text-sm">{{ getTimeFromCreatedAt(post.createdAt) }}</p>
                </div>
                <div class="ml-auto">
                    <span class="bg-blue-200  font-bold py-2 px-1 rounded-md"
                        :class="{ ' text-blue-500': post.status, 'text-red-500': !post.status }">
                        {{ post.status ? 'Đã bán' : 'Chưa bán' }}
                    </span>
                </div>
            </div>

            <div class="px-4 py-2 bg-white">
                <div class="block md:flex">
                    <p class="text-blue-700 font-bold text-xs mr-2"
                        v-for="city in citys.filter(item => item.code == post.citycode)">#{{ city.name }}</p>
                    <p class="text-blue-700 font-bold text-xs mr-2"
                        v-for="district in districts.filter(item => item.code == post.districtcode)">#{{ district.name }}
                    </p>
                    <p class="text-blue-700 font-bold text-xs mr-2"
                        v-for="commune in communes.filter(item => item.code == post.communecode)">#{{ commune.name }}</p>

                </div>
                <div class="flex">
                    <p class="text-blue-700 font-bold text-xs mr-2">#{{ post.Category.cat_name }}</p>
                    <p class="text-blue-700 font-bold text-xs">#{{ post.type }}</p>
                </div>
                <p class="text-slate-700 font-bold md:text-sm lg:text-base text-xs">
                    {{ post.title }}
                </p>
                <p class="text-slate-700 md:text-sm lg:text-base text-xs">
                    {{ post.post_content }}
                </p>
                <p class="text-blue-700 font-bold text-xs">Giá: {{ formatCurrency(post.price) }}</p>
            </div>

            <!-- Image -->
            <div class="flex items-center mt-4 py-2 px-4">

                <swiper :pagination="true" :modules="modules" class="mySwiper" :autoplay="{ delay: 1000 }">
                    <swiper-slide v-for="img in post.Imgs">
                        <img class="max-w-sm w-full mx-auto" :src="img.url" alt="Bài đăng">
                    </swiper-slide>
                    <swiper-slide v-for="video in post.Videos">
                        <video loop controls class="max-w-sm w-full mx-auto ">
                            <source :src="video.url" type="video/mp4" />
                        </video>
                    </swiper-slide>
                </swiper>
            </div>

            <!-- Footer action  -->
            <div class="px-4 py-2 bg-white">
                <div class="flex items-center mb-2">
                    <!--like handle-->
                    <div class="action mr-3">
                        <!-- Sử dụng v-if để kiểm tra xem sản phẩm có trong danh sách thích hay không -->
                        <span v-if="likes.some(item => item.id_post === post.id && item.id_user === user.id)">
                            <!-- Sử dụng v-for để lặp lại các sản phẩm trong danh sách thích -->
                            <span
                                v-for="like in likes.filter(item => item.id_post === post.id && item.id_user === user.id)">
                                <!-- Kiểm tra trạng thái của sản phẩm và sử dụng màu đỏ hoặc #ccc tương ứng -->
                                <i class="fa fa-heart" :style="{ color: like.status ? 'red' : '#ccc' }"
                                    @click="unlike(like, post.id)"></i>
                            </span>
                        </span>
                        <!-- Nếu không có sản phẩm nào trong danh sách thích, hiển thị chữ màu #ccc -->
                        <span v-else>
                            <i class="fa fa-heart" style="color: #ccc" @click="addlike(post.id)"></i>
                        </span>
                        {{ resultLike(post.id) }}
                    </div>
                    <!--post comment-->
                    <button class="mr-3" @click="focusComment">
                        <span><i class="uil uil-comment"></i></span>
                    </button>

                    <button>
                        <span><i class="uil uil-share" @click="share(post)"></i></span>
                    </button>

                    <div class="ml-auto" :class="getclass2(post.User.id)">
                        <span v-if="follows.some(item => item.id_post === post.id && item.id_user === user.id)">
                            <!-- Sử dụng v-for để lặp lại các sản phẩm trong danh sách thích -->
                            <span
                                v-for="follow in follows.filter(item => item.id_post === post.id && item.id_user === user.id)">
                                <!-- Kiểm tra trạng thái của sản phẩm và sử dụng màu đỏ hoặc #ccc tương ứng -->
                                <i class="fa-solid fa-bookmark text-xl" :style="{ color: follow.status ? 'black' : '#ccc' }"
                                    @click="unfollow(follow, post.id)"></i>
                            </span>
                        </span>
                        <!-- Nếu không có sản phẩm nào trong danh sách thích, hiển thị chữ màu #ccc -->
                        <span v-else>
                            <i class="fa-solid fa-bookmark text-xl" style="color: #ccc" @click="addfollow(post.id)"></i>
                        </span>
                    </div>
                </div>

                <div class="text-gray-900 text-sm font-bold mb-2 cursor-pointer" @click="opencomment(post.id)">Xem tất cả
                    bình luận</div>

                <!--post comment-->
                <div class="flex items-center mt-2">
                    <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                    <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm"
                        type="text" v-model="comments" placeholder="Thêm bình luận..."
                        v-on:keyup.enter="comment(post.id)"></textarea>
                </div>

            </div>

            <view_comment v-if="isShowcomment" @cancel="opencomment" :postId="postId"></view_comment>
        </div>
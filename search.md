Hàm buildInvertedIndex được định nghĩa là một hàm bất đồng bộ mà không có tham số.

Trong hàm, gọi phương thức Post.findAll(), giả sử nó truy vấn tất cả các bài viết từ một nguồn dữ liệu. Hàm chờ cho hoàn tất thao tác này và gán kết quả vào biến allPosts.

Tiếp theo, hàm lặp qua từng post trong mảng allPosts sử dụng vòng lặp for...of.

Đối với mỗi bài viết, tiêu đề của bài viết (post.title) và nội dung của bài viết (post.post_content) được chuẩn hóa và chuyển thành chữ thường bằng hàm unidecode và toLowerCase(). Kết quả được gán vào biến normalizedTitle và normalizedContent.

Tất cả các từ khóa được tạo ra bằng cách tách các từ trong normalizedTitle và normalizedContent bằng khoảng trắng (' '). Toàn bộ các từ khóa này được gom lại thành một mảng duy nhất sử dụng Set để loại bỏ các từ trùng lặp và gán vào biến allKeywords.

Tiếp theo, vòng lặp for...of tiếp tục lặp qua từng từ khóa trong allKeywords.

Đối với mỗi từ khóa, kiểm tra xem từ khóa đó đã tồn tại trong invertedIndex chưa. Nếu chưa tồn tại, tạo một mảng rỗng trong invertedIndex cho từ khóa đó.

Sau đó, đẩy post.id vào mảng tương ứng với từ khóa trong invertedIndex. Điều này cho phép ta lưu trữ danh sách các bài viết có chứa từ khóa đó.

Sau khi xử lý xong tất cả các bài viết, inverted index sẽ được xây dựng và chứa thông tin về các từ khóa và danh sách các bài viết chứa từ khóa đó.

Cuối cùng, gọi hàm buildInvertedIndex để thực hiện quá trình xây dựng inverted index.


 <div class="shadow-md mt-2">

        <span class="font-bold text-xl px-8">Mọi người</span>
        <div v-for="search in searchs">
            <div class="max-w-xl w-full ml-6 overflow-hidden mt-6 "
                v-for="user in users.filter(item => item.id == search.id_user && item.isUser == true)">
                <!-- Header -->
                <div class="flex items-center px-4 py-2">
                    <img class="w-12 h-12 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                    <div class="flex-grow">
                        <h3 @click="goIn4(user.username, user.id)" class="text-gray-900 font-medium cursor-pointer">{{
                            user.username }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div> 


    // const { id_post } = req.body;
    // const post = await Post.findOne({ 
    //   where: { id: id_post },
    //   include: { model: User } 
    // });
    // const users = await User.findAll({ where: { priority: post.priority } });
    // const exitsNoti = await Notification.findAll();
    // const notificationPromises = users.map(async (user) => {
    //   const existingNotification = exitsNoti.find((noti) => noti.id_user === user.id && noti.id_post === id_post);
    //   if (!existingNotification && post.user.id !== user.id) {
    //     const notification = await Notification.create({
    //       id_user: user.id,
    //       id_post: id_post,
    //       notification_content: `Có một bài đăng mới từ ${post.user.username} với tiêu đề ${post.title}`
    //     });
    //     res.io.emit('notification', notification);
    //   }
    // });
    // await Promise.all(notificationPromises);



     <div class="grid grid-cols-2 ">
          <!--left update-->
          <div class="py-2 px-2">
            <div class="relative mb-2">
              <select id="select" name="select" v-model="type"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                <option disabled selected>Chọn loại bài đăng</option>
                <option value="Tìm kiếm">Tìm kiếm</option>
                <option value="Trao tặng">Trao tặng</option>
                <option value="Trao đổi">Trao đổi</option>
                <p class="text-red-500 text-sm ml-1" v-if="!type && typeFocused">Không được để trống.</p>

              </select>
            </div>

            <div class="relative mt-5">
              <label>Loại sản phẩm</label>
              <select v-model="catid"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                <option disabled selected>Loại sản phẩm</option>
                <option v-for="cat in cats" :key="cat.id" :value="cat.id">
                  {{ cat.cat_name }}
                </option>
              </select>
              <p class="text-red-500 text-sm ml-1" v-if="!catid && catFocused">Không được để trống.</p>

            </div>
            <div class="mt-1">
              <label class="block text-base ml-2 font-medium text-gray-900 dark:text-white">Tiêu đề :</label>
              <input type="text" placeholder="Tiêu đề"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                v-model="title" />
              <p class="text-red-500 text-sm ml-1" v-if="!title && titleFocused">Không được để trống.</p>

            </div>

            <div class="mt-2">
              <label class="block text-base ml-2 font-medium text-gray-900 dark:text-white">Nội dung bài đăng :</label>
              <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                placeholder="Nhập nội dung ..." v-model="post_content"></textarea>
              <p class="text-red-500 text-sm ml-1" v-if="!post_content && contentFocused">Không được để trống.</p>

            </div>

            <div class=" mb-2 block">
              <div class="relative md:mr-2 mt-5">
                <label class="ml-2">Thành phố :</label>
                <select v-model="city_id" required @change="onCitySelected()"
                  class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                  <option disabled>Thành phố</option>
                  <option v-for="city in citys" :key="city.code" :value="city.code">
                    {{ city.name }}
                  </option>
                </select>
                <p class="text-red-500 text-sm ml-1" v-if="!city_id && cityFocused">Không được để trống.</p>

              </div>
              <div class="relative md:mr-2 mt-5">
                <label class="ml-2">Quận huyện :</label>
                <select v-model="districts_code" @change="onDistrictSelected()"
                  class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                  <option disabled selected>Quận/Huyện</option>
                  <option v-for="district in districts" :key="district.code" :value="district.code">
                    {{ district.name }}
                  </option>
                </select>
                <p class="text-red-500 text-sm ml-1" v-if="!districts_code && districtFocused">Không được để trống.</p>

              </div>
              <div class="relative mt-5">
                <label class="ml-2">Xã phường :</label>
                <select v-model="commune_id"
                  class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none text-sm">
                  <option disabled selected>Xã/Phường</option>
                  <option v-for="commune in communes" :key="commune.code" :value="commune.code">
                    {{ commune.name }}
                  </option>
                </select>
                <p class="text-red-500 text-sm ml-1" v-if="!commune_id && communeFocused">Không được để trống.</p>

              </div>
            </div>
          </div>
          <!--right update-->
          <div class="py-2">

            <!-- Image -->
            <div class="flex items-center mt-4 py-2 px-4">

              <swiper :pagination="true" :modules="modules" class="mySwiper" :autoplay="{ delay: 1000 }">
                <swiper-slide v-for="img in imgs">
                  <img class="max-w-sm w-full mx-auto h-32 md:h-64" :src="img.url" alt="Bài đăng">
                </swiper-slide>

                <swiper-slide v-for="img in imgs_new">
                
                  <img class="max-w-sm w-full mx-auto h-32 md:h-64" :src="img.url" alt="Bài đăng">
                </swiper-slide>

                <swiper-slide v-for="video in videos">
                  <video loop controls class="max-w-sm w-full mx-auto h-32 md:h-64 ">
                    <source :src="video.url" type="video/mp4" />
                  </video>
                </swiper-slide>


                <swiper-slide v-for="video in videos_new">
                  <video loop controls class="max-w-sm w-full mx-auto h-32 md:h-64 ">
                    <source :src="video.url" type="video/mp4" />
                  </video>
                </swiper-slide>
              </swiper>
              
             
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4 shrink-0">
              <button @click="deleteimg()"
                class=" text-xs border  bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                Xóa ảnh
              </button>

              <button @click="deletevideo()"
                class=" text-xs border  bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                Xóa video
              </button>

              <label for="video-file" class="cursor-pointer ">
                <div
                  class="text-xs border bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                  Thêm video
                </div>
                <input id="video-file" type="file" accept=".mp4" @change="onFileSelectedVideo" multiple hidden />
              </label>

              <label for="img-file">
                <div
                  class="text-xs border  bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white font-medium rounded-lg px-4 py-2.5 duration-300 transition-colors focus:outline-none ">
                  Thêm ảnh
                </div>
                <input id="img-file" type="file" @change="onFileSelected" multiple hidden
                  accept=".png, .jpeg, .gif, .jpg" />
              </label>

            </div>
          

          </div>
        </div>
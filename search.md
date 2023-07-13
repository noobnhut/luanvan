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



    
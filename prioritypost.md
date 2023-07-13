
 # setInterval(async () => {
  try {
    // Lấy tất cả các bài đăng có độ ưu tiên lớn hơn 1
    const postsToUpdate = await Post.findAll({
      where: { priority: { [Op.gt]: 1 } },
    });
    // Cập nhật độ ưu tiên của các bài đăng này
    const updatePromises = postsToUpdate.map(async (post) => {
      const timeSinceCreation = Date.now() - post.createdAt.getTime();
      const minutesSinceCreation = timeSinceCreation / (1000 * 60);
      const newPriority = Math.max(1, post.priority - Math.floor(minutesSinceCreation / 10));
      await post.update({ priority: newPriority });
    });
    await Promise.all(updatePromises);
  } catch (error) {
    console.log(error);
  }
}, 10 * 60 * 1000); // 10 phút
# setInterval(async () => {...}, 10 * 60 * 1000) 
- Thiết lập hàm async được gọi sau mỗi khoảng thời gian là 10 phút.

# try {...} catch (error) {...} 
- Sử dụng try-catch để bắt các lỗi trong quá trình thực hiện hàm.

# const postsToUpdate = await Post.findAll({...}) 
- Lấy tất cả các bài đăng có độ ưu tiên lớn hơn 1 bằng cách sử dụng phương thức findAll của Sequelize, với điều kiện là priority lớn hơn 1.

# const updatePromises = postsToUpdate.map(async (post) => {...})
 - Tạo một mảng các promise để cập nhật độ ưu tiên của các bài đăng. Đối với mỗi bài đăng trong postsToUpdate, ta sử dụng phương thức map để tạo ra một promise với hàm async trả về.


# const timeSinceCreation = Date.now() - post.createdAt.getTime();
# const minutesSinceCreation = timeSinceCreation / (1000 * 60);
# const newPriority = Math.max(1, post.priority - Math.floor(minutesSinceCreation / 10));
# await post.update({ priority: newPriority });
# const timeSinceCreation = Date.now() - post.createdAt.getTime() 
- Tính thời gian kể từ khi bài đăng được tạo ra bằng cách lấy thời gian hiện tại trừ đi thời gian tạo bài đăng.
# const minutesSinceCreation = timeSinceCreation / (1000 * 60) 
- Chuyển đổi thời gian kể từ khi bài đăng được tạo ra từ đơn vị miliseconds sang đơn vị phút.
# const newPriority = Math.max(1, post.priority - Math.floor(minutesSinceCreation / 10)) 
- Tính toán độ ưu tiên mới của bài đăng dựa trên thời gian kể từ khi bài đăng được tạo ra. Độ ưu tiên mới sẽ được tính dựa trên công thức newPriority = max(1, oldPriority - floor(minutesSinceCreation / 10)), với minutesSinceCreation là số phút kể từ khi bài đăng được tạo ra. Chúng ta sử dụng hàm Math.max để đảm bảo rằng độ ưu tiên mới sẽ không nhỏ hơn 1.
# await post.update({ priority: newPriority }) 
- Cập nhật độ ưu tiên mới của bài đăng dựa trên giá trị của biến newPriority, sử dụng phương thức update của Sequelize.
# const updatePromises = ... 
- Gán mảng các promise đã tạo ra vào biến updatePromises.

# await Promise.all(updatePromises)
 - Sử dụng Promise.all để đợi cho tất cả các promise trong mảng updatePromises được giải quyết trước khi tiếp tục thực hiện.

# console.log(error) 
- Nếu có lỗi trong quá trình thực hiện hàm, in ra lỗi đó bằng phương thức console.log.
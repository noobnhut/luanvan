const invertedIndex = {};

const buildInvertedIndex = async () => {
  const allPosts = await Post.findAll();
  for (const post of allPosts) {
    const normalizedTitle = unidecode(post.title.toLowerCase());
    const normalizedContent = unidecode(post.post_content.toLowerCase());
    const allKeywords = [...new Set([...normalizedTitle.split(' '), ...normalizedContent.split(' ')])];

    for (const keyword of allKeywords) {
      if (!invertedIndex[keyword]) {
        invertedIndex[keyword] = [];
      }
      invertedIndex[keyword].push(post.id);
    }
  }
};

# Giái thích code :
1. Trong đoạn mã trên, const invertedIndex = {}; khởi tạo một đối tượng rỗng có tên invertedIndex. Đối tượng này sẽ được sử dụng để lưu trữ inverted index, trong đó các từ khóa sẽ được liên kết với danh sách các ID bài đăng tương ứng.

2. Hàm buildInvertedIndex có nhiệm vụ xây dựng inverted index từ tất cả các bài đăng có sẵn trong cơ sở dữ liệu. Các bước trong hàm này là:

3. const allPosts = await Post.findAll();: Truy vấn tất cả các bài đăng từ mô hình Post sử dụng phương thức findAll(). Kết quả truy vấn được gán cho biến allPosts.

4. for (const post of allPosts) { ... }: Với mỗi bài đăng trong allPosts, tiến hành xử lý các bước sau đây

5. const normalizedTitle = unidecode(post.title.toLowerCase());: Chuẩn hóa tiêu đề của bài đăng bằng cách chuyển thành chữ thường và loại bỏ các dấu tiếng Việt sử dụng hàm unidecode. Kết quả được gán cho biến normalizedTitle.

6. const normalizedContent = unidecode(post.post_content.toLowerCase());: Tương tự như bước trên, chuẩn hóa nội dung bài đăng và gán kết quả cho biến normalizedContent.

7. const allKeywords = [...new Set([...normalizedTitle.split(' '), ...normalizedContent.split(' ')])];: Tạo một mảng allKeywords chứa tất cả các từ khóa trong tiêu đề và nội dung bài đăng. Bước này chia các chuỗi thành mảng các từ khóa bằng cách tách chúng dựa trên khoảng trắng và loại bỏ các từ khóa trùng lặp sử dụng Set.

8. for (const keyword of allKeywords) { ... }: Với mỗi từ khóa trong allKeywords, tiến hành xử lý các bước sau đây.

9. if (!invertedIndex[keyword]) { invertedIndex[keyword] = []; }: Kiểm tra xem từ khóa đã tồn tại trong inverted index (invertedIndex) chưa. Nếu chưa tồn tại, thì tạo một mảng rỗng để lưu trữ danh sách các ID bài đăng tương ứng.

10. invertedIndex[keyword].push(post.id);: Thêm ID bài đăng vào danh sách ID bài đăng tương ứng với từ khóa trong inverted index.

11. Sau khi hàm buildInvertedIndex được gọi, biến invertedIndex sẽ chứa inverted index hoàn chỉnh, trong đó các từ khóa được liên kết với danh sách các ID bài đăng tương ứng


# Hàm search post

const searchPost = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({
        message: "Missing query parameter 'q'",
      });
    }

    const normalizedQuery = unidecode(query.toLowerCase());
    const searchKeywords = normalizedQuery.split(' ');

    const matchedPostIds = [];
    for (const keyword of searchKeywords) {
      if (invertedIndex[keyword]) {
        matchedPostIds.push(...invertedIndex[keyword]);
      }
    }

    const uniqueMatchedPostIds = [...new Set(matchedPostIds)];

    const posts = await Post.findAll({
      where: {
        id: uniqueMatchedPostIds,
      },
      attributes: [
        "id",
        "id_user",
        "id_cat",
        "type",
        "post_content",
        "title",
        "status",
        "citycode",
        "districtcode",
        "communecode",
        "price",
        "createdAt",
        "updatedAt",
      ],
    });

    if (posts.length === 0) {
      return res.status(404).json({
        message: "Không có bài đăng phù hợp",
      });
    }

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
};

1. const query = req.query.q;: Lấy giá trị của tham số truy vấn q từ request. Đây là truy vấn tìm kiếm mà người dùng nhập vào.

2. if (!query) { ... }: Kiểm tra xem truy vấn có tồn tại hay không. Nếu không tồn tại, trả về mã lỗi 400 và thông báo lỗi.

3. const normalizedQuery = unidecode(query.toLowerCase());: Chuẩn hóa và loại bỏ dấu tiếng Việt từ truy vấn bằng cách chuyển thành chữ thường và loại bỏ dấu sử dụng hàm unidecode. Kết quả được gán vào biến normalizedQuery.

4. const searchKeywords = normalizedQuery.split(' ');: Tách truy vấn thành các từ khóa bằng cách tách chuỗi dựa trên khoảng trắng. Kết quả được lưu trữ trong mảng searchKeywords.

5. const matchedPostIds = [];: Khởi tạo một mảng rỗng matchedPostIds để lưu trữ các ID bài đăng phù hợp.

6. for (const keyword of searchKeywords) { ... }: Duyệt qua từng từ khóa trong mảng searchKeywords.

if (invertedIndex[keyword]) { matchedPostIds.push(...invertedIndex[keyword]); }: Kiểm tra xem từ khóa có tồn tại trong inverted index (invertedIndex) hay không. Nếu tồn tại, thêm danh sách các ID bài đăng tương ứng vào mảng matchedPostIds.

7. const uniqueMatchedPostIds = [...new Set(matchedPostIds)];: Loại bỏ các ID bài đăng trùng lặp từ mảng matchedPostIds bằng cách chuyển nó thành một Set và sau đó chuyển lại thành một mảng.

8. Truy vấn tất cả các bài đăng từ mô hình Post sử dụng phương thức findAll. Câu truy vấn sử dụng where để chỉ định rằng chỉ lấy các bài đăng có ID nằm trong mảng uniqueMatchedPostIds.

attributes: [...]: Xác định các thuộc tính của bài đăng mà bạn muốn truy vấn trả về.

9. Kiểm tra xem có bài đăng phù hợp nào hay không. Nếu không có bài đăng, trả về mã lỗi 404 và thông báo lỗi.

10. Trả về kết quả truy vấn dưới dạng JSON.


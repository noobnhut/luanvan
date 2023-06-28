const db = require('../models');
const Post = db.Post;
const User = db.user;
const Cat = db.Category;
const Img = db.Img;
const Video = db.Video;
const Like = db.Post_Like;
const Save = db.Save_Post;
const Comment = db.Post_Comment;
const sequelize = require('sequelize');
const createPost = async (req, res) => {
  const { id_user, id_cat, type, post_content, title, citycode, districtcode, communecode } = req.body;

  try {
    const existingUser = await User.findOne({ where: { id: id_user } });
    if (!existingUser) { return res.status(200).json('Không tồn tại khách hàng'); }

    const existingCat = await Cat.findOne({ where: { id: id_cat } });
    if (!existingCat) { return res.status(200).json('Không tồn tại loại sản phẩm'); }

    else if (id_cat == '' || type == '' || post_content == '' || title == '' || citycode == '' || districtcode == '' || communecode == '') {
      return res.status(200).json('Thông tin nhập bị thiếu');
    }
    else {
      const post = await Post.create({ id_user, id_cat, type, post_content, title, citycode, districtcode, communecode ,status_gift:false, priority:4});
      if (post) {
        const id_post = post.id;
        return res.status(200).json(id_post)
      }
    }
  } catch (error) {
    return res.status(404).json({ error })
  }
}

const renderPost = async (req, res) => {
  try {
    const post = await Post.findAll(
      {
        attributes: [
          'id', 'type', 'post_content', 'title', 'citycode', 'districtcode', 'communecode', 'createdAt', 'status_gift','priority'
        ],
        include:
          [
            {
              model: User,
              attributes: ['id', 'username', 'avatar', 'is_active'],
              where: {
                is_active: true // Filter out users with isUser == false
              },
              raw: true,
              nest: true,
            },
            {
              model: Cat,
              attributes: ['id', 'cat_name'],
              raw: true,
              nest: true,
            },
            {
              model: Img,
              attributes: ['id', 'image_name', 'url'],
              raw: true,
              nest: true,
            },
            {
              model: Video,
              attributes: ['id', 'video_name', 'url'],
              raw: true,
              nest: true,
            }
          ]
      }

    )
    return res.status(200).json(post)

  } catch (error) {
    return res.status(404).json('Server error' + error);
  }
}

const getPostCountByCategory = async (req, res) => {
  try {
    const result = await Post.findAll(
      {
        attributes: ['id_cat', [sequelize.fn('COUNT', 'Category.id'), 'PostCount']],
        include:[
          {
            model:Cat,
            attributes:['cat_name']
          }
        ],
        group: ['id_cat']
      }
    );
    res.json(result);
  } catch (error) {
    return res.status(404).json('Server error' + error);
  }

};

const getPostByType = async (req, res) => {
  try {
    const sumPost = await Post.count();
    const TradeCount = await Post.count({ where: { type: "Trao đổi" } });
    const ShareCount = await Post.count({ where: { type: "Trao tặng" } });
    const SearchCount = await Post.count({ where: { type: "Tìm kiếm" } });

    const TradePercentage = (TradeCount / sumPost) * 100;
    const SharePercentage = (ShareCount / sumPost) * 100;
    const SearchPercentage = (SearchCount / sumPost) * 100;

    return res.json({ 
      trade: TradeCount, share: ShareCount, 
      search: SearchCount, sum: sumPost, 
      TradePercentage: TradePercentage, 
      SharePercentage: SharePercentage, 
      SearchPercentage: SearchPercentage })
  } catch (error) {
    console.log(error)
  }
}

const getPostInteraction = async (req, res) => {
  try {
    const sumPost = await Post.count();
    const LikeCount = await Like.count();
    const CommentCount = await Comment.count();
    const SaveCount = await Save.count();

    const likePercentage = (LikeCount / sumPost) * 100;
    const commentPercentage = (CommentCount / sumPost) * 100;
    const savePercentage = (SaveCount / sumPost) * 100;

    return res.json({
      likeCount: LikeCount,
      commentCount: CommentCount,
      saveCount: SaveCount,
      sumPost: sumPost,
      likePercentage: likePercentage,
      commentPercentage: commentPercentage,
      savePercentage: savePercentage
    });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  //thực hiện kiểm tra id cần xóa

  const post = await Post.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!post) {
    return res.status(404).json({
      message: "không tìm thấy dữ liệu"
    });
  }
  try {
    await Img.destroy({
      where: {
        id: req.params.id
      }
    })
    await Video.destroy({
      where: {
        id: req.params.id
      }
    })
    await Like.destroy({
      where: {
        id: req.params.id
      }
    })
    await Save.destroy({
      where: {
        id: req.params.id
      }
    })
    await Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    await Post.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      message: "Xóa bài đăng hoàn tất"
    });
  } catch (error) {
    console.log(error.message);
  }

}

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { id_cat, type, title, post_content, citycode, districtcode, communecode, id_user } = req.body;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({
        message: `Tài khoản có không tồn tại.`
      });
    }
    else if (id_cat == '' || type == '' || post_content == '' || title == '' || citycode == '' || districtcode == '' || communecode == '') {
      return res.status(200).json('Thông tin nhập bị thiếu');
    }
    else {
      await post.update({
        title: title,
        id_user: id_user,
        id_cat: id_cat,
        type: type,
        post_content: post_content,
        citycode: citycode,
        districtcode: districtcode,
        communecode: communecode,
      });
      res.status(200).json({ message: `Cập nhập thành công`, post });
    }
  } catch (error) {
    res.status(500).json({
      message: "Cập nhập thất bại"
    });
  }
}

module.exports =
{
  createPost,
  renderPost,
  deletePost,
  updatePost,
  getPostCountByCategory,
  getPostByType,
  getPostInteraction
}
const db = require('../models');
const Post = db.Post;
const User = db.User;
const Cat = db.Category;
const Img = db.Img;
const Video = db.Video;
const multer = require('multer');
const fs = require('fs');

const createPost = async (req, res) => {
  const { id_user, id_cat, type, post_content, status, title, citycode, districtcode, communecode,price } = req.body;

  try {
    const existingUser = await User.findOne({ where: { id: id_user } });
    if (!existingUser) { return res.status(200).json('Không tồn tại khách hàng'); }

    const existingCat = await Cat.findOne({ where: { id: id_cat } });
    if (!existingCat) { return res.status(200).json('Không tồn tại loại sản phẩm'); }

    else if (id_cat == '' || type == '' || post_content == '' || status == '' || title == '' || citycode == '' || districtcode == '' || communecode == '' || price == '') {
      return res.status(200).json('Thông tin nhập bị thiếu');
    }
    else {
      const post = await Post.create({ id_user, id_cat, type, post_content, status, title, citycode, districtcode, communecode,price });
      if (post) {
        const id_post = post.id;
        return res.status(200).json(id_post)

      }
    }
  } catch (error) {
    return res.status(404).json('Thêm thất bại !' )
  }
}

const renderPost = async (req,res)=>{
  try {
    const post = await Post.findAll(
      {
        attributes: [
         'id', 'type', 'post_content', 'status', 'title', 'citycode', 'districtcode', 'communecode','price','createdAt'
        ],
        include:
        [
          {
            model:User,
            attributes: ['id','username','avatar','status'],
            raw: true,
            nest: true,
          },
          {
            model:Cat,
            attributes: ['id','cat_name'],
            raw: true,
            nest: true,
          },
          {
            model:Img,
            attributes:['id','image','url'],
            raw: true,
            nest: true,
          },
          {
            model:Video,
            attributes:['id','video','url'],
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

module.exports =
{
  createPost,
  renderPost,
  deletePost
}
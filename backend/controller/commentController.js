const db = require('../models');
const Post = db.Post;
const Comment = db.comment_post;
const User = db.User;

const getAllComment = async(req,res) =>
{
    try {
        const comment = await Comment.findAll(
          {
            attributes: [
             'id', 'comment_content' ,'createdAt'
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
                model:Post,
                attributes: ['id'],
                raw: true,
                nest: true,
              },
            ]
          }    
        )
        return res.status(200).json(comment)
      } catch (error) {
        return res.status(404).json('Server error' + error);
      }
}

const createdComment = async (req, res) => {
    const { id_user, id_post, comment_content } = req.body;

    try {
        const existingUser = await User.findOne({ where: { id: id_user } });
        if (!existingUser) { return res.status(200).json('Không tồn tại khách hàng'); }

        const existingPost = await Post.findOne({ where: { id: id_post } });
        if (!existingPost) { return res.status(200).json('Không tồn tại bài đăng'); }

        else if (comment_content === '' || id_post === '' || id_user === '') {
            return res.status(200).json('Thông tin nhập bị thiếu');
        }
        else {
            const comment = await Comment.create({ id_user, id_post, comment_content });
            res.status(200).json('Thêm thành công')
        }
    } catch (error) {
        return res.status(404).json('Thêm thất bại !')
    }
}

const deleteComment = async (req, res) => {
    const comment = await Comment.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!comment) {
        return res.status(404).json({
            message: "không tìm thấy dữ liệu"
        });
    }
    try {
        await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            message: "Xóa hoàn tất"
        });


    } catch (error) {
        console.log(error.message);
    }
}
module.exports =
{
    createdComment,
    deleteComment,
    getAllComment
}  

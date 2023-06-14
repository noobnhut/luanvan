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
             'id', 'comment_content' ,'createdAt' ],
            include:
            [
              {
                model:User,
                attributes: ['id','username','avatar','isUser'],
                where: {
                  isUser: true // Filter out users with isUser == false
                },
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
            const commentbyid = await Comment.findAll(
                {
                  attributes: [  'id', 'comment_content' ,'createdAt' ],
                  include:
                  [
                    {
                      model:User,attributes: ['id','username','avatar'],raw: true,nest: true,
                    },
                    {
                      model:Post,attributes: ['id'], raw: true,nest: true,
                    },
                  ],
                  where: { id: comment.id  },
                });
                
            res.io.emit('comment',commentbyid);
            return res.status(200).json(commentbyid)
          
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
        console.log(error);
    }
}

const editComment = async (req,res)=>
{
    const comment = await Comment.findOne({
        where: {
            id: req.params.id
        }
    });
    const {comment_content}=req.body;

    if (!comment) {
        return res.status(404).json({
            message: "không tìm thấy dữ liệu"
        });
    }
    try {
        await Comment.update({comment_content:comment_content},{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            message: "cập nhập hoàn tất"
        });


    } catch (error) {
        console.log(error.message);
    }
}
const deleteCommentByPost = async (req, res) => {
    try {
      const id = req.params.id;
      const comments = await Comment.findAll({where:{id_post:id}});
  
      if (comments.length === 0) {
        return res.status(200).json({ error: 'Không tìm thấy' });
      }
  
      for (const comment of comments) {
        await comment.destroy();
      }
  
      return res.status(200).json({ success: true, message: 'Xóa thành công' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Xóa thất bại' });
    }
  }
module.exports =
{
    createdComment,
    deleteComment,
    getAllComment,
    editComment,
    deleteCommentByPost
}  

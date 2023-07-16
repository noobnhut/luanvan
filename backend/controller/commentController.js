const db = require('../models');
const Post = db.Post;
const Comment = db.Post_Comment;
const User = db.user;

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
                attributes: ['id','username','avatar','is_active'],
                where: {
                  is_active: true // Filter out users with is_active == false
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
    const { id_user, id_post, comment_content ,rep_id } = req.body;

    try {
        const existingUser = await User.findOne({ where: { id: id_user } });
        if (!existingUser) { return res.status(200).json('Không tồn tại khách hàng'); }

        const existingPost = await Post.findOne({ where: { id: id_post } });
        if (!existingPost) { return res.status(200).json('Không tồn tại bài đăng'); }

        else if (comment_content === '' || id_post === '' || id_user === '') {
            return res.status(200).json({message:'Vui lòng nhập nội dung'});
        }
        else {
            const comment = await Comment.create({ id_user, id_post, comment_content,rep_id });
            return res.status(200).json({message:'Bình luận thành công'})
          
        }
    } catch (error) {
      console.log(error)
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
const replyComment = async (req,res)=>
{
    const { id_user, id_post, comment_content ,id } = req.body;

    try {
        const existingUser = await User.findOne({ where: { id: id_user } });
        if (!existingUser) { return res.status(202).json('Không tồn tại khách hàng'); }

        const existingPost = await Post.findOne({ where: { id: id_post } });
        if (!existingPost) { return res.status(202).json('Không tồn tại bài đăng'); }

        else if (comment_content === '' || id_post === '' || id_user === '') {
            return res.status(202).json({message:'Vui lòng nhập nội dung'});
        }
        else {
            const comment = await Comment.create({ id_user, id_post, comment_content,rep_id:id });
            return res.status(200).json({message:'Bình luận thành công'})
          
        }
    } catch (error) {
      console.log(error)
        return res.status(404).json('Thêm thất bại !')
    }
}
module.exports =
{
    createdComment,
    deleteComment,
    getAllComment,
    editComment,
    deleteCommentByPost,
    replyComment
}  

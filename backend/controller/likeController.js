const db = require('../models');
const Post = db.Post;
const Like = db.Post_Like;

//sản phâm đã xem && đã thích
const Postlike = async (req, res) => {
    const { id,id_user, id_post, status } = req.body;
    const existLike = await Like.findOne({ where: { id_user, id_post } });

    if (existLike) {
        const like = await Like.destroy({ where: { id:id,id_user: id_user, id_post: id_post } });
        res.status(200).json({ like, message: "Thả tim thành công" })
    }
    else {
        const like = await Like.create({ id_user, id_post, status });
        res.status(200).json({ like, message: "Hủy thả tim thành công" })
    }
};

const renderlike = async (req, res) => {
    try {
        const like = await Like.findAll(
            {
                attributes: ['id', 'id_post', 'status', 'id_user'],
                include: [
                    { model: Post, attributes: ['id'] }
                ],
                raw: true,
                nest: true,
            }
        );
        res.json(like);
    } catch (error) {
        res.json("không lấy được ");
        console.log(error);
    }
};

const deleteLikeByPost = async (req, res) => {
    try {
      const id = req.params.id;
      const likes = await Like.findAll({where:{id_post:id}});
  
      if (likes.length === 0) {
        return res.status(200).json({ error: 'Không tìm thấy' });
      }
  
      for (const like of likes) {
        await like.destroy();
      }
  
      return res.status(200).json({ success: true, message: 'Xóa thành công' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Xóa thất bại' });
    }
  }
module.exports = {
    Postlike,
    renderlike,
    deleteLikeByPost
}
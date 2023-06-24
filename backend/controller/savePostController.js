const db = require('../models');
const Post = db.Post;
const Share = db.Save_Post;

//sản phâm đã xem && đã thích
const PostShare = async (req, res) => {
   try {
    const { id,id_user, id_post, status } = req.body;
    const existShare = await Share.findOne({ where: { id_user, id_post } });

    if (existShare) {
        const share= await Share.destroy({ where: { id:id,id_user: id_user, id_post: id_post } });
        res.status(200).json({share, message: "Xóa thích thành công" })
    }
    else {
        const share= await Share.create({ id_user, id_post, status });
        res.status(200).json({ share, message: "Thêm thích thành công" })
    }
   } catch (error) {
    res.status(404).json(error)
   }
};

const renderShare = async (req, res) => {
    try {
        const share = await Share.findAll(
            {
                attributes: ['id', 'id_post', 'status', 'id_user'],
                include: [
                    { model: Post, attributes: ['id'] }
                ],
                raw: true,
                nest: true,
            }
        );
        res.json(share);
    } catch (error) {
        res.json("không lấy được ");
        console.log(error);
    }
};
const deleteFollowByPost = async (req, res) => {
    try {
      const id = req.params.id;
      const follows = await Share.findAll({where:{id_post:id}});
  
      if (follows.length === 0) {
        return res.status(200).json({ error: 'Không tìm thấy' });
      }
  
      for (const follow of follows) {
        await follow.destroy();
      }
  
      return res.status(200).json({ success: true, message: 'Xóa thành công' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Xóa thất bại' });
    }
  }

module.exports = {
    PostShare,
    renderShare,
    deleteFollowByPost
}
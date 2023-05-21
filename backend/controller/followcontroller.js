const db = require('../models');
const Post = db.Post;
const Share = db.share_post;

//sản phâm đã xem && đã thích
const PostShare = async (req, res) => {
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


module.exports = {
    PostShare,
    renderShare,
}
const db = require('../models');
const Post = db.Post;
const Like = db.like_post;

//sản phâm đã xem && đã thích
const Postlike = async (req, res) => {
    const { id_user, id_post, status } = req.body;
    const existLike = await Like.findOne({ where: { id_user, id_post } });

    if (existLike) {
        const like = await Like.destroy({ where: { id_user: id_user, id_post: id_post } });
        res.status(200).json({ like, message: "Xóa thích thành công" })
    }
    else {
        const like = await Like.create({ id_user, id_post, status });
        res.status(200).json({ like, message: "Thêm thích thành công" })
    }
};

const renderlike = async (req, res) => {
    const id_user = req.params.id;
    try {
        const like = await Like.findAll(
            {
                attributes: ['id_user', 'id', 'id_post', 'status'],
                include: [
                    { model: Post, attributes: ['id'] }
                ],
                raw: true,
                nest: true,
                where: { id_user: id_user }
            }
        );
        res.json(like);
    } catch (error) {
        res.json("không lấy được ");
        console.log(error);
    }
};


module.exports = {
    Postlike,
    renderlike,
}
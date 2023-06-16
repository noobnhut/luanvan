const db = require('../models');
const Post = db.Post;
const User = db.User;
const Cat = db.Category;
const Comment = db.comment_post;
const Like = db.like_post;
const RankUser = db.rank_user;
const { Op } = require('sequelize');

const getRank = async (req, res) => {
    try {
        const id = req.params.id;
        const twelveHoursAgo = new Date(Date.now() - (12 * 60 * 60 * 1000)); // Thời điểm 12 tiếng trước
        const posts = await Post.findAll({
            where: {
                id_cat: id, type: "Trao tặng",
                createdAt: {
                    [Op.lt]: twelveHoursAgo
                }
            },

            include: [
                { model: User, attributes: ['id', 'username', 'avatar', 'isUser'], where: { isUser: true } },
                {
                    model: Comment,
                    required: true,
                },
                {
                    model: Like,
                    required: true,
                },
            ],
            having: db.Sequelize.literal('(SELECT COUNT(*) FROM comment_posts WHERE comment_posts.id_post = Post.id) >= 2 AND (SELECT COUNT(*) FROM  like_posts WHERE like_posts.id_post = Post.id) >= 2'),
        });
        // thực hiện tính toán lấy ra tổng số điểm

        const usersRank = {};
        posts.forEach(post => {
            const userId = post.User.id;
            if (usersRank.hasOwnProperty(userId)) {
                usersRank[userId]++;
            } else {
                usersRank[userId] = 1;
            }
        });

        //thực hiện truyền vào table rank_user

        const result = [];
        for (const [userId, postCount] of Object.entries(usersRank)) {
            result.push({
                userId: Number(userId),
                postCount
            });

            const rankData = {
                id_user: userId,
                id_cat: id,
                count_rank: postCount
            };

            const existingRank = await RankUser.findOne({
                where: { id_user: userId, id_cat: id }
            });

            if (existingRank) {    
                // if (existingRank.count_rank !== postCount) {
                //     await RankUser.update( {
                //         where: { id_user: userId, id_cat: id , count_rank:postCount}
                //     });
                // }
                console.log(postCount + ' ' + userId + ' '+ existingRank.count_rank)
               
            } else {
                await RankUser.create(rankData);
            }
        }

        const rank = await RankUser.findAll(
            {
                where:{id_cat:id}
            }
        );
        res.status(200).json(rank)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

module.exports = {
    getRank
}

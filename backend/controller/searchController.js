const db = require('../models');
const Post = db.Post;
const sequelize = require('sequelize');
const Op = sequelize.Op;
const unidecode = require('unidecode');
const fs = require('fs');
const User = db.User;
const invertedIndex = {};

const buildInvertedIndex = async () => {
  const allPosts = await Post.findAll();
  for (const post of allPosts) {
    const normalizedTitle = unidecode(post.title.toLowerCase());
    const normalizedContent = unidecode(post.post_content.toLowerCase());
    const allKeywords = [...new Set([...normalizedTitle.split(' '), ...normalizedContent.split(' ')])];

    for (const keyword of allKeywords) {
      if (!invertedIndex[keyword]) {
        invertedIndex[keyword] = [];
      }
      invertedIndex[keyword].push(post.id);
    }
  }
};
buildInvertedIndex();

const searchPost = async (req, res) => {
  try {
    const query = req.query.q;
    const keysearch = unidecode(query);
    if (!query) {
      return res.status(400).json({
        message: "Missing query parameter 'q'",
      });
    }

    const users = await User.findAll({
      attributes: ['id'],
      where: {
        username: {
          [Op.like]: `%${keysearch}%`
        }
      }
    });

    if (users.length > 0) {
      const userIds = users.map((user) => user.id);
      const posts = await Post.findAll({
        where: { id_user: { [Op.in]: userIds } },
      });
      return res.status(200).json(posts);
    } else {
      const normalizedQuery = unidecode(query.toLowerCase());
      const searchKeywords = normalizedQuery.split(' ');

      const matchedPostIds = [];
      for (const keyword of searchKeywords) {
        if (invertedIndex[keyword]) {
          matchedPostIds.push(...invertedIndex[keyword]);
        }
      }

      const uniqueMatchedPostIds = [...new Set(matchedPostIds)];

      const posts = await Post.findAll({
        where: {
          id: uniqueMatchedPostIds,
        },
        attributes: [
          "id",
          "id_user",
        ],
      });

      if (posts.length > 0) {
        return res.status(200).json(posts);
      } else {
        return res.status(200).json('Không tìm thấy kết quả');
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình xử lý' });
  }
};

module.exports = {
  searchPost,

};

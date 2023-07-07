const db = require('../models');
const Post = db.Post;
const User = db.user;
const { Op } = require('sequelize');
const axios = require('axios')
const getRank = async (req, res) => {
   
   try {
     const rank = await User.findAll(
        {
            attributes:['username','ranking_score','avatar'],
            order: [["ranking_score", "DESC"]], 
            where: {
                ranking_score: {
                  [Op.gt]: 0
                }
              },
        }
     )
     return res.json(rank)
   } catch (error) {
    console.log(error)
   }
}

module.exports = {
    getRank,
}

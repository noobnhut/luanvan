const db = require('../models');
const User = db.user;
const Rating = db.User_Rating;

const getRating = async(req,res)=>
{
    try {
       
        const rating = await Rating.findAll(
            {
                include:[
                    {model:User}
                ]
            }
        )
            res.status(200).json(rating); 
    } catch (error) {
        console.log(error)
    }
}

const addRating = async(req,res)=>
{
    try {
        const {to_user,from_user,score,content} =req.body;

        //check xem đã đánh giá chưa
        const existRating = await Rating.findOne({where:{to_user,from_user}});
         if(!score || !content)
        {
            res.status(201).json({message:"Thông tin bị thiếu"});
        }
        else if(existRating)
        {
            res.status(201).json({message:"Đã đánh giá cá nhân này"});
        }
        else
        {
            await Rating.create({
                to_user:to_user,
                from_user:from_user,
                rating_score : score,
                rating_content:content
            });
            res.status(200).json({message:"Đánh giá thành công"})
        }

    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getRating,
    addRating
}
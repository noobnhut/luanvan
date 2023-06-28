const db = require('../models');
const user = db.user;
const follow = db.Follow


const userFollow = async(req,res)=>
{
    try {
        const {userfollow,userfollowed}= req.body;
        const existFollow = await follow.findOne({where:{userfollow:userfollow,userfollowed:userfollowed}})
        if(existFollow)
        {
            // tồn tại user follow thì tiến hành hủy follow
            const follows = await follow.destroy({where:{userfollow,userfollowed}});
            res.status(200).json({message:"Hủy theo dõi thành công"})
        }
        else
        {
            const follows = await follow.create({userfollow,userfollowed})
            res.status(200).json({message:"Theo dõi thành công"})
        }

    } catch (error) {
     res.status(401).json({error})    
    }
}
const renderFollow = async(req,res)=>
{
    try {
        const userfollow = req.params.id
        const existFollow = await follow.findOne({where:{userfollow}})
        if(existFollow)
        {
            const follows = await follow.findAll(
                {
                    attributes:['id','userfollow','userfollowed'],
                    include:[
                        {
                            model:user,
                            attributes: ['id','username','avatar','is_active'],
                            where: {
                              is_active: true // Filter out users with is_active == false
                            },
                            raw: true,
                            nest: true,
                          },
                    ],
                    where:{userfollow}
                }
            );
           return res.status(200).json(follows)
        }
        else
        {
            const follows = []
            return res.status(200).json(follows)
        }      
    } catch (error) {
        res.status(404).json(error)    
    }
}
module.exports = {
    userFollow,
    renderFollow
}
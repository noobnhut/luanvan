const express =require("express") ;
const {
    PostShare,
    renderShare,
    deleteFollowByPost
} =require("../controller/followController") ;
const routerFollow = express.Router();

routerFollow.post('/api/follow/addfollow', PostShare);
routerFollow.get('/api/follow/getfollow',renderShare);
routerFollow.delete('/api/post/deleteFollowbypost/:id',deleteFollowByPost);

module.exports = { 
     routerFollow,
};

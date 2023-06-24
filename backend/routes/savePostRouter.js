const express =require("express") ;
const {
    PostShare,
    renderShare,
    deleteFollowByPost
} =require("../controller/savePostController") ;
const routerSavePost = express.Router();

routerSavePost.post('/api/follow/addfollow', PostShare);
routerSavePost.get('/api/follow/getfollow',renderShare);
routerSavePost.delete('/api/post/deleteFollowbypost/:id',deleteFollowByPost);

module.exports = { 
     routerSavePost,
};

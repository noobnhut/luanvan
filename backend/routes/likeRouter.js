const express =require("express") ;
const {
    Postlike,
    renderlike,
    deleteLikeByPost
} =require("../controller/likeController") ;
const routerLike = express.Router();

routerLike.post('/api/like/addlike', Postlike);
routerLike.get('/api/like/getlike',renderlike);
routerLike.delete('/api/post/deleteLikebypost/:id',deleteLikeByPost);

module.exports = { 
    routerLike,
};

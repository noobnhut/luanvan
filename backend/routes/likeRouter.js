const express =require("express") ;
const {
    Postlike,
    renderlike,
} =require("../controller/likeController") ;
const routerLike = express.Router();

routerLike.post('/api/like/addlike', Postlike);
routerLike.get('/api/like/getlike/:id',renderlike);
module.exports = { 
    routerLike,
};

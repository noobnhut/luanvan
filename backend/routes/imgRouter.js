const express =require("express") ;
const {
    addImg,
    deleteImgByPost,
    deleteImg
} =require("../controller/imgController.js") ;
const routerIMG = express.Router();
routerIMG.post('/api/post/addimg/:id', addImg);
routerIMG.delete('/api/post/deleteimg/:id', deleteImg);
routerIMG.delete('/api/post/deleteimgbypost/:id', deleteImgByPost);

module.exports = { 
    routerIMG,
};

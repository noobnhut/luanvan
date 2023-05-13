const express =require("express") ;
const {
    createPost,
    renderPost,
    deletePost
} =require("../controller/postController.js") ;
const routerPost = express.Router();
routerPost.post('/api/post/create', createPost);
routerPost.get('/api/post/render', renderPost);
routerPost.delete('/api/post/delete/:id', deletePost);

module.exports = { 
    routerPost,
  
};

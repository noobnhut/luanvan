const express =require("express") ;
const {
    createPost,
    renderPost,
    deletePost,
    updatePost
} =require("../controller/postController.js") ;
const routerPost = express.Router();
routerPost.post('/api/post/create', createPost);
routerPost.get('/api/post/render', renderPost);
routerPost.delete('/api/post/delete/:id', deletePost);
routerPost.put('/api/post/update/:id',  updatePost);


module.exports = { 
    routerPost,
  
};

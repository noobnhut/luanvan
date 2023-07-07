const express =require("express") ;
const {
    createPost,
    renderPost,
    deletePost,
    updatePost,
    getPostCountByCategory,
    getPostByType,
    getPostInteraction,
    acceptPost,
    resultPost
} =require("../controller/postController.js") ;
const routerPost = express.Router();
routerPost.post('/api/post/create', createPost);
routerPost.get('/api/post/render', renderPost);
routerPost.get('/api/post/renderbycat', getPostCountByCategory);
routerPost.get('/api/post/renderinteraction', getPostInteraction)
routerPost.get('/api/post/renderbytype',  getPostByType);
routerPost.delete('/api/post/delete/:id', deletePost);
routerPost.put('/api/post/update/:id',  updatePost);
routerPost.put('/api/post/acceptPost',acceptPost)
routerPost.get('/api/post/search',resultPost)


module.exports = { 
    routerPost,
  
};

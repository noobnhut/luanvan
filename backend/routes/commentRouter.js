const express =require("express") ;
const {
    createdComment,
    deleteComment,
    getAllComment,
    editComment,
    deleteCommentByPost
} =require("../controller/commentController") ;
const routerComment = express.Router();

routerComment.get('/api/comment/get',getAllComment);
routerComment.post('/api/comment/create',createdComment);
routerComment.put('/api/comment/edit/:id',editComment);
routerComment.delete('/api/comment/delete/:id', deleteComment);
routerComment.delete('/api/post/deleteCommentbypost/:id', deleteCommentByPost);

module.exports = { 
    routerComment,
};

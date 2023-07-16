const express =require("express") ;
const {
    createdComment,
    deleteComment,
    getAllComment,
    editComment,
    deleteCommentByPost,
    replyComment
} =require("../controller/commentController") ;
const routerComment = express.Router();

routerComment.get('/api/comment/get',getAllComment);
routerComment.post('/api/comment/create',createdComment);
routerComment.post('/api/comment/reply',replyComment);
routerComment.put('/api/comment/edit/:id',editComment);
routerComment.delete('/api/comment/delete/:id', deleteComment);
routerComment.delete('/api/post/deleteCommentbypost/:id', deleteCommentByPost);

module.exports = { 
    routerComment,
};

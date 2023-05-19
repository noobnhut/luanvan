const express =require("express") ;
const {
    createdComment,
    deleteComment,
    getAllComment,
    editComment
} =require("../controller/commentController") ;
const routerComment = express.Router();

routerComment.get('/api/comment/get',getAllComment);
routerComment.post('/api/comment/create',createdComment);
routerComment.put('/api/comment/edit/:id',editComment);
routerComment.delete('/api/comment/delete/:id', deleteComment);
module.exports = { 
    routerComment,
};

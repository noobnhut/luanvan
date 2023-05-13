const express =require("express") ;
const {
    addVideo,
    deleteVideobyPost,
  deleteVideo 
} =require("../controller/videoController.js") ;
const routerVideo = express.Router();
routerVideo.post('/api/post/addvideo/:id', addVideo);
routerVideo.delete('/api/post/deleteVideo/:id', deleteVideo);
routerVideo.delete('/api/post/deleteVideobypost/:id', deleteVideobyPost);

module.exports = { 
    routerVideo,

};

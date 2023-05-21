const express =require("express") ;
const {
    PostShare,
    renderShare,
} =require("../controller/followController") ;
const routerFollow = express.Router();

routerFollow.post('/api/follow/addfollow', PostShare);
routerFollow.get('/api/follow/getfollow',renderShare);
module.exports = { 
     routerFollow,
};

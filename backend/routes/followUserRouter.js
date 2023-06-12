const express =require("express") ;
const {
    userFollow,
    renderFollow
} =require("../controller/followUserController") ;
const routerUserFollow = express.Router();

routerUserFollow.post('/api/userfollow/addfollow', userFollow);
routerUserFollow.get('/api/userfollow/getfollow/:id',renderFollow);

module.exports = { 
     routerUserFollow,
};

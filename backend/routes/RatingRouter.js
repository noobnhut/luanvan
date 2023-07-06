const express =require("express") ;
const {
    getRating,
    addRating
} =require("../controller/ratingController") ;
const routerRating = express.Router();

routerRating.get('/api/rating/get',getRating);
routerRating.post('/api/rating/add',addRating);
module.exports = { 
    routerRating,
};

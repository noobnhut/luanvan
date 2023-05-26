const express =require("express") ;
const {
    searchPost,
} =require("../controller/searchController.js") ;
const routerSearch = express.Router();
routerSearch.get('/api/post/search', searchPost);



module.exports = { 
    routerSearch,
  
};

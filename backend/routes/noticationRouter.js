
const express =require("express") ;
const {
    getRank,

} =require("../controller/noticationController") ;
const routerNotication = express.Router();

routerNotication.get('/api/rank/get',getRank);


module.exports = { 
    routerNotication,
};

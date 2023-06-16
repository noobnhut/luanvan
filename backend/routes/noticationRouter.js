
const express =require("express") ;
const {
    getRank
} =require("../controller/noticationController") ;
const routerNotication = express.Router();

routerNotication.get('/api/rank/get/:id',getRank);

module.exports = { 
    routerNotication,
};

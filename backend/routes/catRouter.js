const express =require("express") ;
const {
    getAllCat,
    addCat,
    updateCat,
    deleteCat
} =require("../controller/catController") ;
const routerCat = express.Router();

routerCat.get('/api/getcat',getAllCat);
routerCat.post('/api/addcat',addCat);
routerCat.put('/api/updatecat/:id',updateCat);
routerCat.delete('/api/deletecat/:id',deleteCat);
module.exports = { 
    routerCat,
};

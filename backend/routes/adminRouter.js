const express =require("express") ;
const {
loginAdmin
} =require("../controller/adminController.js") ;
const routerAdmin = express.Router();
routerAdmin.post('/api/loginadmin', loginAdmin);
module.exports = { 
    routerAdmin,
};

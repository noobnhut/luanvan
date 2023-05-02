const express =require("express") ;
const {
    registerUser,
    loginUser,
} =require("../controller/userController.js") ;
const routerUser = express.Router();
routerUser.post('/api/register', registerUser);
routerUser.post('/api/login', loginUser);
module.exports = { 
    routerUser,
};

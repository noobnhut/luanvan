const express =require("express") ;
const {
    registerUser,
    loginUser,
    updateImg, updateInfo
} =require("../controller/userController.js") ;
const routerUser = express.Router();
routerUser.post('/api/register', registerUser);
routerUser.post('/api/login', loginUser);
routerUser.put('/api/user/updateimg/:id', updateImg);
routerUser.put('/api/user/updateinfo/:id', updateInfo);

module.exports = { 
    routerUser,
};

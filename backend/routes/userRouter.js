const express =require("express") ;
const {
    registerUser,
    loginUser,
    updateImg,
     updateInfo,
     getUserById,
     updatePass
} =require("../controller/userController.js") ;
const routerUser = express.Router();
routerUser.get('/api/user/getbyid/:id', getUserById);
routerUser.post('/api/register', registerUser);
routerUser.post('/api/login', loginUser);
routerUser.put('/api/user/updateimg/:id', updateImg);
routerUser.put('/api/user/updateinfo/:id', updateInfo);
routerUser.put('/api/user/updatepasswowrd/:id', updatePass);


module.exports = { 
    routerUser,
};

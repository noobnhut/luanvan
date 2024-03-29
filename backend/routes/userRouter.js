const express =require("express") ;
const {
    registerUser,
    loginUser,
    updateImg,
     updateInfo,
     getUserById,
     updatePass,
     getUser,
     getIsUser,
   
} =require("../controller/userController.js") ;
const routerUser = express.Router();
routerUser.get('/api/user/getbyid/:id', getUserById);
routerUser.get('/api/user/get', getUser);
routerUser.get('/api/user/getIsUser', getIsUser);
routerUser.post('/api/register', registerUser);
routerUser.post('/api/login', loginUser);
routerUser.put('/api/user/updateimg/:id', updateImg);
routerUser.put('/api/user/updateinfo/:id', updateInfo);
routerUser.put('/api/user/updatepassword/:id', updatePass);


module.exports = { 
    routerUser,
};

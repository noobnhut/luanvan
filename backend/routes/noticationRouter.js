
const express =require("express") ;
const {
    getRank,
    createNotification,
    createNotiSetting,
    deleteSetting,
    updateSetting
} =require("../controller/noticationController") ;
const routerNotication = express.Router();

routerNotication.get('/api/rank/get',getRank);
routerNotication.get('/api/notification/create',createNotification);
routerNotication.post('/api/notiSetting/create', createNotiSetting);
routerNotication.delete('/api/notiSetting/delete/:id', deleteSetting);
routerNotication.put('/api/notiSetting/update',  updateSetting);



module.exports = { 
    routerNotication,
};

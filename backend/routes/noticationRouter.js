
const express =require("express") ;
const {
    getRank,
    createNotification,
    createNotiSetting,
    deleteSetting,
    updateSettingStatus,
    updateSetting,
    getSetting,
    userStatusNoti,
    getNotificationbyid
} =require("../controller/noticationController") ;
const routerNotication = express.Router();

routerNotication.get('/api/rank/get',getRank);
routerNotication.get('/api/notiSetting/get/:id',getSetting);
routerNotication.post('/api/notification/create',createNotification);
routerNotication.get('/api/notification/getbyid/:id',getNotificationbyid);
routerNotication.post('/api/notiSetting/create', createNotiSetting);
routerNotication.delete('/api/notiSetting/delete/:id', deleteSetting);
routerNotication.put('/api/notiSetting/update',  updateSetting);
routerNotication.put('/api/notiSetting/choice/:id',updateSettingStatus)
routerNotication.put('/api/user/updatenoti/:id',userStatusNoti)




module.exports = { 
    routerNotication,
};

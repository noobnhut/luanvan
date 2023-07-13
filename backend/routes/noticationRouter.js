
const express =require("express") ;
const {
    getRank,
    createNotiSetting,
    deleteSetting,
    updateSettingStatus,
    updateSetting,
    getSetting,
    userStatusNoti,
    getNotificationbyid,
    deleteNotification
} =require("../controller/noticationController") ;
const routerNotication = express.Router();

routerNotication.get('/api/rank/get',getRank);
routerNotication.get('/api/notiSetting/get/:id',getSetting);
routerNotication.get('/api/notification/getbyid/:id',getNotificationbyid);
routerNotication.post('/api/notiSetting/create', createNotiSetting);
routerNotication.delete('/api/notiSetting/delete/:id', deleteSetting);
routerNotication.put('/api/notiSetting/update',  updateSetting);
routerNotication.put('/api/notiSetting/choice/:id',updateSettingStatus)
routerNotication.put('/api/user/updatenoti/:id',userStatusNoti)
routerNotication.delete('/api/notification/delete/:id',deleteNotification)




module.exports = { 
    routerNotication,
};

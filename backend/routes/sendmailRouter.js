const express =require("express") ;
const {
    sendMailBanned ,
    sendMailUnBanned,
    sendMailRemind
} =require("../controller/sendmailController") ;
const routerSendMail = express.Router();


routerSendMail.post('/api/sendmail/banned', sendMailBanned );
routerSendMail.post('/api/sendmail/unbanned', sendMailUnBanned );
routerSendMail.post('/api/sendmail/remind',    sendMailRemind );


module.exports = { 
    routerSendMail,
};

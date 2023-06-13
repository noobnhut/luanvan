const express =require("express") ;
const {
    sendMailBanned ,
    sendMailUnBanned
} =require("../controller/sendmailController") ;
const routerSendMail = express.Router();


routerSendMail.post('/api/sendmail/banned', sendMailBanned );
routerSendMail.post('/api/sendmail/unbanned', sendMailUnBanned );

module.exports = { 
    routerSendMail,
};

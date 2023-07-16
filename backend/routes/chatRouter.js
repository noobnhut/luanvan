const express =require("express") ;
const {
    getmess,
    createChat,
   deleteHistory,
   deleteMessage
} =require("../Controller/chatController") ;
const routerMessage = express.Router();
routerMessage.post('/api/message/get', getmess);
routerMessage.post('/api/message/create',  createChat);
routerMessage.post('/api/message/delete',  deleteHistory);
routerMessage.delete('/api/message/deleteMessage/:id',   deleteMessage);

module.exports = { 
    routerMessage,
};

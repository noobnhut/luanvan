const express = require("express");
const {
    checkConversation,
    sendChat,
    deleteChats,
    getChat,
    getHistory
} = require("../controller/chatController.js");
const routerChat = express.Router();
routerChat.get('/api/chat/get/:id', getChat);
routerChat.get('/api/chat/getHistory/:id', getHistory);
routerChat.post('/api/chat/check', checkConversation);
routerChat.post('/api/chat/send', sendChat);
routerChat.delete('/api/chat/deleteall/:id', deleteChats);

module.exports = {
    routerChat,
};

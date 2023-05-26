const express = require("express");
const {
    checkConversation,
    sendChat,
    deleteChats,
    getChat
} = require("../controller/chatController.js");
const routerChat = express.Router();
routerChat.get('/api/chat/get/:id', getChat);
routerChat.post('/api/chat/check', checkConversation);
routerChat.post('/api/chat/send', sendChat);
routerChat.delete('/api/chat/deleteall/:id', deleteChats);

module.exports = {
    routerChat,
};

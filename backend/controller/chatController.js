const db = require('../models');
const User =db.user;
const Messenger = db.messenger;

const sequelize = require("sequelize");
const Op = sequelize.Op;

const getmess = async (req, res) => {
  try {
    const { send, receiver } = req.body;
    const data = await Messenger.findAll({
      where: {
        [Op.or]: [
          { sender_id: send, receiver_id: receiver },
          { sender_id: receiver, receiver_id: send },
        ],
      },
      order: [["id", "ASC"]], 
    });
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const createChat = async (req, res) => {
    try {
      const {  send, receiver, messager } = req.body;
      const chat = await Messenger.create({
        receiver_id: receiver,
        sender_id: send,
        messager: messager,
      });
      res.status(200).json(chat.id);
      res.io.emit("chat", chat);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteHistory = async (req, res) => {
    try {
      const { send, receiver } = req.body;
      const exitst = await Messenger.findAll({
        where: {
          [Op.or]: [
            { sender_id: send, receiver_id: receiver },
            { sender_id: receiver, receiver_id: send },
          ],
        },
        order: [["id", "ASC"]],
      });
  
      exitst.forEach(async (message) => {
        if (message.sender_id === send || message.receiver_id === send) {
          if (message.deleted == 0) {
            await message.update({ deleted: send });
          }
          if(message.deleted == receiver)
          {
              await message.destroy()
          }
        }
      });
  
      res.json({exitst});
    } catch (error) {
      console.log(error);
    }
  };
  module.exports = {
    getmess,
    createChat,
    deleteHistory
  };
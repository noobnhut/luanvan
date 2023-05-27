const db = require('../models');
const User = db.User;
const message = db.Messages;
const conversation = db.Conversations;
const sequelize = require('sequelize');
const Op = sequelize.Op;
const History = db.History_Messenge;

const checkConversation = async (req, res) => {
    try {
        const { userSender, userReceiver } = req.body;
        let name = userSender + '&' + userReceiver;
        const checkChat = await message.findAll({
            where: {
                [Op.or]: [
                    { receiver_id: userSender, sender_id: userReceiver },
                    { receiver_id: userReceiver, sender_id: userSender }
                ]
            }
        });

        const checkRoom = await conversation.findAll({
            where: {
                [Op.or]: [
                    { conversation_name: name },
                    { conversation_name: `${userReceiver}&${userSender}` }
                ]
            }
        })

        if (checkChat.length === 0 && checkRoom.length === 0) {
            const room = await conversation.create({ conversation_name: name })
            return res.status(404).json({ message: 'Chưa có phòng chat', room });
        }
        return res.status(200).json(checkChat);
    } catch (error) {
        return res.status(400).json({ error });
    }
}

const sendChat = async (req, res) => {
    try {
        const { userSender, userReceiver, messenger_content } = req.body;
        let name = userSender + '&' + userReceiver;

        const checkRoom = await conversation.findOne({
            attributes: ['id'],
            where: {
                [Op.or]: [
                    { conversation_name: name },
                    { conversation_name: `${userReceiver}&${userSender}` }
                ]
            },
        });
        const id_room = checkRoom.id;

        const checkHistory = await History.findOne({
            where: {
                id_conversation:id_room
            },
        });
        if(!checkHistory)
        {
            const history = await History.create({
                id_conversation: id_room,
                id_user:userSender
            });
            const history2 = await History.create({
                id_conversation: id_room,
                id_user:userReceiver
            })
        }
        const chat = await message.create({
            sender_id: userSender, receiver_id: userReceiver, messenger_content: messenger_content, conversation_id: id_room
        })
        
        res.io.emit('chat', {
            sender_id: userSender, receiver_id: userReceiver, messenger_content: messenger_content, conversation_id: id_room
          });
        return res.json(chat)
    } catch (error) {
        return res.status(400).json( error );

    }
}

const getChat = async (req,res)=>
{
    const conversation_id = req.params.id;
    try {
        const chat = await message.findAll({
            where:{conversation_id:conversation_id},
        })
        return res.status(200).json(chat);
    } catch (error) {
        return res.status(400).json({ error });     
    }
}

const deleteChats = async (req, res) => {
    try {
        const id_room = req.params.id;
        const checkRoom = await conversation.findOne({
            attributes: ['id'],
            where: {
                id: id_room
            },
        });
        if (!checkRoom) {
            return res.status(404).json({ message: 'Không tìm thấy phòng chat' });
        }
        else {
            await message.destroy({
                where: {
                    conversation_id: id_room
                }
            });
            return res.status(200).json({ message: 'Xóa tin nhắn thành công' });
        }    
    } catch (error) {
        return res.status(400).json({ error });

    }
}
module.exports = {
    checkConversation,
    sendChat,
    deleteChats,
    getChat
};


const db = require('../models');
const Post = db.Post;
const User = db.user;
const Notification = db.Notification;
const notiSetting = db.NotificationSetting;
const { Op } = require('sequelize');
const axios = require('axios')
const createNotiSetting = async (req, res) => {
  try {
    const { id_user, location_radius, type_post } = req.body;
    const existUser = await User.findByPk(id_user);
    if (existUser) {
      const existSetting = await notiSetting.findAll({ where: { id_user } });
      const checkSetting = await notiSetting.findOne({ where: { id_user, location_radius, type_post } })
      if (existSetting.length === 3) {
        res.json({ message: 'Đã vượt quá giới hạn thêm' })
      }
      else if (checkSetting) {
        res.json({ message: 'Cài đặt này đã tồn tại' })
      }
      else {
        if (existSetting.length == 0) {
          await notiSetting.create({ id_user, location_radius, type_post, status: true });
          res.json({ message: 'Thêm thành công' })
        }
        else if (existSetting.length > 1 || existSetting.length < 3) {
          await notiSetting.create({ id_user, location_radius, type_post, status: false });
          res.json({ message: 'Thêm thành công ' })
        }
      }
    }
    else {
      res.json({ message: 'Không tồn tại user này' })
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteSetting = async (req, res) => {
  try {
    const id = req.params.id;
    const exits = await notiSetting.findByPk(id);
    if (exits) {
      if (exits.status == 1) {
        res.json({ message: 'Không thể xóa' })
      }
      else {
        await exits.destroy({ where: { id } })
        res.json({ message: 'Xóa thành công' })

      }
    }
    else {
      res.json({ message: 'Không tồn tại cài đặt này' })
    }
  } catch (error) {
    console.log(error)
  }
}

const updateSetting = async (req, res) => {
  try {
    const { id_user, location_radius, type_post, id } = req.body;
    const exits = await notiSetting.findByPk(id)
    const checkSetting = await notiSetting.findOne({ where: { id_user, location_radius, type_post } })
    if (exits) {
      if (checkSetting) {
        res.json({ message: "Tồn tại thông tin cài đặt này" })
      }
      else {
        await notiSetting.update({ location_radius, type_post }, { where: { id: id } });
        res.json({ message: "Cập nhập thành công" })
      }
    }
    else {
      res.json({ message: "Không tồn tại cài đặt này" })

    }

  } catch (error) {
    console.log(error)
  }
}

const updateSettingStatus = async (req, res) => {

}

const userStatusNoti = async (req,res)=>
{
  const id =req.body.params;
  const exits = await User.findByPk(id)
}
const getRank = async (req, res) => {

  try {
    const rank = await User.findAll(
      {
        attributes: ['username', 'ranking_score', 'avatar'],
        order: [["ranking_score", "DESC"]],
        where: {
          ranking_score: {
            [Op.gt]: 0
          }
        },
      }
    )
    return res.json(rank)
  } catch (error) {
    console.log(error)
  }
}

const createNotification = async (req, res) => {
  // nhận vào id_post lấy ra cấp bậc của bài đăng (priority)
  // lọc user có cập bậc bằng với bài đăng
  // tạo thông báo đến từng user
  // io với socketio 
  try {
    const { id_post } = req.body;
    const post = await Post.findByPk(id_post)
    const users = await User.findAll(
      { where: { priority: post.priority } }
    );
    // id_user
    // id_post
    // notification_content
    const notificationPromises = users.map(async (user) => {
      // Tạo thông báo cho từng người dùng
      const notification = await Notification.create({
        id_user: user.id,
        id_post: id_post,
        notification_content: `Bài đăng từ người ${user.username} tới bạn`,
      });
      res.io.to(users[user.id]).emit('notification', notification);
    });

    const noficreate = await Promise.all(notificationPromises);
  } catch (error) {
    console.log(error)
  }

}


module.exports = {
  getRank,
  createNotification,
  createNotiSetting,
  deleteSetting,
  updateSetting,
  updateSettingStatus
}

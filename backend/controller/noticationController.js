const db = require('../models');
const Post = db.Post;
const User = db.user;
const Notification = db.Notification;
const notiSetting = db.NotificationSetting;
const { Op } = require('sequelize');
const axios = require('axios')
const KEY_MAP = process.env.KEY_MAP;



const getSetting = async (req, res) => {
  try {
    const id = req.params.id;
    const exist = await User.findByPk(id);
    if (exist) {
      const result = await notiSetting.findAll({ where: { id_user: id } });
      res.json(result)
    } else {
      res.json({ message: 'Khong ton tai nguoi dung' })
    }

  } catch (error) {
    console.log(error)
  }
}
const createNotiSetting = async (req, res) => {
  try {
    const { id_user, location_radius, type_post } = req.body;
    const existUser = await User.findByPk(id_user);
    if (existUser) {
      const existSetting = await notiSetting.findAll({ where: { id_user } });
      const checkSetting = await notiSetting.findOne({ where: { id_user, location_radius, type_post } })
      if (existSetting.length === 3) {
        res.status(201).json({ message: 'Đã vượt quá giới hạn thêm' })
      }
      else if (checkSetting) {
        res.status(201).json({ message: 'Cài đặt này đã tồn tại' })
      }
      else {
        if (existSetting.length == 0) {
          await notiSetting.create({ id_user, location_radius, type_post, status: true });
          res.status(200).json({ message: 'Thêm thành công' })
        }
        else if (existSetting.length > 1 || existSetting.length < 3) {
          await notiSetting.create({ id_user, location_radius, type_post, status: false });
          res.status(200).json({ message: 'Thêm thành công ' })
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
        res.status(201).json({ message: 'Cài đặt đang dùng, hãy chọn cái khác trước khi xóa' })
      }
      else {
        await exits.destroy({ where: { id } })
        res.status(200).json({ message: 'Xóa thành công' })

      }
    }
    else {
      res.status(201).json({ message: 'Không tồn tại cài đặt này' })
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
        res.status(201).json({ message: "Tồn tại thông tin cài đặt này" })
      }
      else {
        await notiSetting.update({ location_radius, type_post }, { where: { id: id } });
        res.status(200).json({ message: "Cập nhập thành công" })
      }
    }
    else {
      res.status(201).json({ message: "Không tồn tại cài đặt này" })

    }

  } catch (error) {
    console.log(error)
  }
}

const updateSettingStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { id_user } = req.body;
    const existUser = await User.findByPk(id_user)
    const exits = await notiSetting.findByPk(id);
    const searchSetting = await notiSetting.findAll(
      { where: { id_user: id_user, id: { [Op.not]: id }, } }
    )
    if (exits && existUser) {
      exits.update({ status: 1 }, { where: { id: id } });
      if (searchSetting) {
        // thực hiện update status sang false
        await Promise.all(
          searchSetting.map((setting) => setting.update({ status: false }))
        );
      }
      res.json({ message: 'Chọn thành công' })
    }
    else {
      res.json({ message: 'Thất bại' })
    }
  } catch (error) {
    console.log(error)
  }
}

const userStatusNoti = async (req, res) => {
  try {
    const id = req.params.id;
    const exits = await User.findByPk(id)
    if (exits) {
      if (exits.notification_status == 1) {
        const update = await exits.update({ notification_status: false })
        res.status(200).json(update)
      }
      else {
        const update = await exits.update({ notification_status: true })
        res.status(200).json(update)
      }
    }
    else {
      res.status(201).json({ message: 'Không tồn tại người dùng này' })
    }
    res.status(200).json(exits)
  } catch (error) {
    console.log(error)
  }
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

// công thức haversine tham khảo internet
const calculateDistance = (lat1, lon1, lat2, lon2) =>{
  const radius = 6371; // Bán kính Trái đất trong kilômét
  
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radius * c;
  
  return distance;
}

const toRadians = (degrees)=> {
  return degrees * (Math.PI / 180);
}

const createNotification = async (req, res) => {
  try {
  const { id_post } = req.body;
  const post = await Post.findOne({
  where: { id: id_post },
  include: { model: User }
  });
  const users = await User.findAll({ where: { priority: post.priority, notification_status: true } });
  const settings = await notiSetting.findAll({ where: { status: true, type_post: post.type } });
  
  const userSetting = [];
  const userUnSetting = [];

  for (const user of users) {
    const setting = settings.find((item) => item.id_user === user.id);
    if (setting) {
      const distance = calculateDistance(post.latitube, post.longtitube,user.latitube, user.longtitube);
      if (distance <= setting.location_radius) {
        userSetting.push({
          id_user: user.id,
          username:user.username,
          location_radius: setting.location_radius,
          type_post: setting.type_post
        });
      }
    } else {
      userUnSetting.push({
        id_user: user.id,
        username:user.username,
      });
    }
  }
  const userNoti = [...userSetting, ...userUnSetting]
  const exitsNoti = await Notification.findAll();
  const notificationPromises = userNoti.map(async (user) => {
    const existingNotification = exitsNoti.find((noti) => noti.id_user === user.id_user && noti.id_post === id_post);
    if (!existingNotification && post.user.id !== user.id) {
      const notification = await Notification.create({
        id_user: user.id_user,
        id_post: id_post,
        notification_content: `Có một bài đăng mới từ ${post.user.username} với tiêu đề ${post.title}`
      });
      res.io.emit('notification', notification);
    }
  });
  await Promise.all(notificationPromises);
  res.json({ userSetting, userUnSetting });
  } catch (error) {
  console.log(error);
  res.status(500).json({ message: 'Lỗi trong quá trình tạo thông báo' });
  }
  } 
  
const getNotificationbyid = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByPk(id)
    if (user) {
      const result = await Notification.findAll({
        where: { id_user: id }
      })
      res.status(200).json(result)
    } else {
      res.status(201).json({ message: 'Không tồn tại người dùng' })
    }
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
  updateSettingStatus,
  userStatusNoti,
  getSetting,
  getNotificationbyid
}

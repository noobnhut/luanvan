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
      const checkSetting = await notiSetting.findOne({ where: { id_user, type_post } })
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

const deleteNotification = async(req,res)=>
{
  try {
    const id =req.params.id;
    const exits = await Notification.findByPk(id)
    if(exits)
    {
      await exits.destroy();
      return  res.status(200).json({message:'Xóa thành công'})
    }
    else
    {
      res.status(202).json({message:"Không tồn tại thông báo"})
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getRank,
  createNotiSetting,
  deleteSetting,
  updateSetting,
  updateSettingStatus,
  userStatusNoti,
  getSetting,
  getNotificationbyid,
  deleteNotification
}

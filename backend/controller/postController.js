const db = require('../models');
const Post = db.Post;
const User = db.user;
const Cat = db.Category;
const Img = db.Img;
const Video = db.Video;
const Like = db.Post_Like;
const Save = db.Save_Post;
const Comment = db.Post_Comment;
const sequelize = require('sequelize');
const axios = require('axios')
const dotenv = require('dotenv');
const Op = sequelize.Op;
const unidecode = require('unidecode');
dotenv.config();
const KEY_MAP = process.env.KEY_MAP;
const Notification = db.Notification;
const notiSetting = db.NotificationSetting;
const fs = require('fs');
const cron = require('node-cron');
const { create } = require('domain');

const level3 = []
const level2 = []
const level1 = []

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${filePath} has been deleted`);
  });
}

const resultPost = async (citycode, districtcode, communecode, useraddress) => {
  try {
    // Lấy thông tin về city, district, commune từ API provinces
    const cityAPI = await axios.get(`https://provinces.open-api.vn/api/p/${citycode}`);
    const apicityData = cityAPI.data.name;
    const districtAPI = await axios.get(`https://provinces.open-api.vn/api/d/${districtcode}`);
    const apidistrictData = districtAPI.data.name;
    const communeAPI = await axios.get(`https://provinces.open-api.vn/api/w/${communecode}`);
    const apicommuneData = communeAPI.data.name;
    let address = '';
    if (useraddress === '') {
      address = `${useraddress},${apicommuneData},${apidistrictData},${apicityData}`;
    } else {
      address = `${apicommuneData},${apidistrictData},${apicityData}`;
    }

    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${KEY_MAP}`, {
    });
    const data = response.data.features[0].geometry
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (req, res) => {
  const { id_user, id_cat, type, post_content, title, citycode, districtcode, communecode } = req.body;
  const useraddress = ''
  const locationData = await resultPost(citycode, districtcode, communecode, useraddress);
  try {
    const existingUser = await User.findOne({ where: { id: id_user } });
    const existingCat = await Cat.findOne({ where: { id: id_cat } });
    if (!existingUser) { return res.status(202).json('Không tồn tại khách hàng'); }
    else if (id_cat == '' || type == '' || post_content == '' || title == '' || citycode == '' || districtcode == '' || communecode == '') {
      return res.status(202).json('Thông tin nhập bị thiếu');
    }
    else if (!existingCat) { return res.status(202).json('Không tồn tại loại sản phẩm'); }
    else {
      const post = await Post.create({
        id_user, id_cat, type, post_content, title, citycode, districtcode, communecode, status_gift: false, priority: 4, longtitube: locationData.coordinates[0],
        latitube: locationData.coordinates[1]
      });
      if (post) {
        createNotification(post.id,res)
        let newpost = { id: post.id, priority: post.id, time: post.createdAt }
        level3.push(newpost)
        handleLV3(res)
        const id_post = post.id;
        res.status(200).json({ id_post, message: "Thêm thành công" });
      }
    }
  } catch (error) {
    return res.status(404).json(error)
  }
}
const handleLV3 = (res) => {
  for (let i = 0; i < level3.length; i++) {
    const post = level3[i];
    const time = post.time
    // Thêm 10 phút vào thời gian hiện tại
    time.setMinutes(time.getMinutes() + 1);
    // Chuyển đổi thời gian sang định dạng cron
    const cronTime = `${time.getMinutes()} ${time.getHours()} ${time.getDate()} ${time.getMonth() + 1} *`;
    const cronJob = cron.schedule(cronTime, async () => {
      // thực hiện update tại đây
      const postupdate = await Post.findByPk(post.id)
      const lv3 = await postupdate.update({ priority: 3 })
      createNotification(post.id,res)
      let newpost = { id: lv3.id, priority: lv3.priority, time: lv3.updatedAt }
      level2.push(newpost)
      level3.splice(i, 1);
      handleLV2(res)
    });

    cronJob.start();
  }
}
const handleLV2 = (res) => {
  for (let i = 0; i < level2.length; i++) {
    const post = level2[i];
    const time = post.time
    // Thêm 10 phút vào thời gian hiện tại
    time.setMinutes(time.getMinutes() + 1);
    // Chuyển đổi thời gian sang định dạng cron
    const cronTime = `${time.getMinutes()} ${time.getHours()} ${time.getDate()} ${time.getMonth() + 1} *`;

    const cronJob = cron.schedule(cronTime, async () => {
      const postupdate = await Post.findByPk(post.id)
      const lv2 = await postupdate.update({ priority: 2 })
      createNotification(post.id,res)
      let newpost = { id: lv2.id, priority: lv2.priority, time: lv2.updatedAt }
      level1.push(newpost)
      level2.splice(i, 1);
      handleLV1()
    });

    cronJob.start();
  }
}
const handleLV1 = () => {
  for (let i = 0; i < level1.length; i++) {
    const post = level1[i];
    const time = post.time
    // Thêm 10 phút vào thời gian hiện tại
    time.setMinutes(time.getMinutes() + 1);
    // Chuyển đổi thời gian sang định dạng cron
    const cronTime = `${time.getMinutes()} ${time.getHours()} ${time.getDate()} ${time.getMonth() + 1} *`;
    const cronJob = cron.schedule(cronTime, async () => {
      const postupdate = await Post.findByPk(post.id)
      await postupdate.update({ priority: 1}) 
      level1.splice(i, 1); 
    });
    cronJob.start();
  }
}

const renderPost = async (req, res) => {
  try {
    const post = await Post.findAll(
      {
        attributes: [
          'id', 'type', 'post_content', 'title', 'citycode', 'districtcode', 'communecode', 'createdAt', 'status_gift', 'priority'
        ],
        include:
          [
            {
              model: User,
              attributes: ['id', 'username', 'avatar', 'is_active'],
              where: {
                is_active: true // Filter out users with isUser == false
              },
              raw: true,
              nest: true,
            },
            {
              model: Cat,
              attributes: ['id', 'cat_name'],
              raw: true,
              nest: true,
            },
            {
              model: Img,
              attributes: ['id', 'image_name', 'url'],
              raw: true,
              nest: true,
            },
            {
              model: Video,
              attributes: ['id', 'video_name', 'url'],
              raw: true,
              nest: true,
            }
          ],
        order: [["id", "DESC"]],
      }

    )
    return res.status(200).json(post)

  } catch (error) {
    return res.status(404).json('Server error' + error);
  }
}

const getPostCountByCategory = async (req, res) => {
  try {
    const result = await Post.findAll(
      {
        attributes: ['id_cat', [sequelize.fn('COUNT', 'Category.id'), 'PostCount']],
        include: [
          {
            model: Cat,
            attributes: ['cat_name']
          }
        ],
        group: ['id_cat']
      }
    );
    res.json(result);
  } catch (error) {
    return res.status(404).json('Server error' + error);
  }

};

const getPostByType = async (req, res) => {
  try {
    const sumPost = await Post.count();
    const TradeCount = await Post.count({ where: { type: "Trao đổi" } });
    const ShareCount = await Post.count({ where: { type: "Trao tặng" } });
    const SearchCount = await Post.count({ where: { type: "Tìm kiếm" } });

    const TradePercentage = (TradeCount / sumPost) * 100;
    const SharePercentage = (ShareCount / sumPost) * 100;
    const SearchPercentage = (SearchCount / sumPost) * 100;

    return res.json({
      trade: TradeCount, share: ShareCount,
      search: SearchCount, sum: sumPost,
      TradePercentage: TradePercentage,
      SharePercentage: SharePercentage,
      SearchPercentage: SearchPercentage
    })
  } catch (error) {
    console.log(error)
  }
}

const getPostInteraction = async (req, res) => {
  try {
    const sumPost = await Post.count();
    const LikeCount = await Like.count();
    const CommentCount = await Comment.count();
    const SaveCount = await Save.count();

    const likePercentage = (LikeCount / sumPost) * 100;
    const commentPercentage = (CommentCount / sumPost) * 100;
    const savePercentage = (SaveCount / sumPost) * 100;

    return res.json({
      likeCount: LikeCount,
      commentCount: CommentCount,
      saveCount: SaveCount,
      sumPost: sumPost,
      likePercentage: likePercentage,
      commentPercentage: commentPercentage,
      savePercentage: savePercentage
    });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  //thực hiện kiểm tra id cần xóa

  const post = await Post.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!post) {
    return res.status(404).json({
      message: "không tìm thấy dữ liệu"
    });
  }
  try {
    const id = req.params.id;
    const imgs = await Img.findAll({ where: { id_post: id } });

    if (imgs.length > 0) {
      for (const img of imgs) {
        const imagePath = `./uploads/${img.image_name}`;
        deleteFile(imagePath);
        await img.destroy();
      }
    }
    const videos = await Video.findAll({ where: { id_post: id } });

    if (videos.length > 0) {
      for (const video of videos) {
        const videoPath = `./uploads/${video.video_name}`;
        deleteFile(videoPath);
        await video.destroy();
      }
    }



    await Like.destroy({
      where: {
        id_post: req.params.id
      }
    })
    await Save.destroy({
      where: {
        id_post: req.params.id
      }
    })
    await Comment.destroy({
      where: {
        id_post: req.params.id
      }
    })
    await Notification.destroy({
      where: {
        id_post: req.params.id
      }
    })
    await Post.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      message: "Xóa bài đăng hoàn tất"
    });
  } catch (error) {
    console.log(error.message);
  }

}

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { id_cat, type, title, post_content, citycode, districtcode, communecode, id_user } = req.body;
  const useraddress = ''
  const locationData = await resultPost(citycode, districtcode, communecode, useraddress);
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      res.status(404).json({
        message: `Tài khoản có không tồn tại.`
      });
    }
    else if (id_cat == '' || type == '' || post_content == '' || title == '' || citycode == '' || districtcode == '' || communecode == '') {
      return res.status(200).json('Thông tin nhập bị thiếu');
    }
    else {
      await post.update({
        title: title,
        id_user: id_user,
        id_cat: id_cat,
        type: type,
        post_content: post_content,
        citycode: citycode,
        districtcode: districtcode,
        communecode: communecode,
        longtitube: locationData.coordinates[0],
        latitube: locationData.coordinates[1]
      });
      res.status(200).json({ message: `Cập nhập thành công`, post });
    }
  } catch (error) {
    res.status(500).json({
      message: "Cập nhập thất bại"
    });
  }
}

const acceptPost = async (req, res) => {
  try {
    const { id_post, usergift, status_gift } = req.body;
    const post = await Post.findByPk(id_post);
    const user = await User.findByPk(usergift)
    if (status_gift == false) {
      const update = await post.update({ status_gift: true })
      const score = user.ranking_score + 1;
      const updateUser = await user.update({ ranking_score: score });
      const delta = 2
      if (user.ranking_score >= delta*0 && user.ranking_score <= delta*2) {
        await user.update({ priority: 1 });
      } else if (user.ranking_score > delta*2 && user.ranking_score < delta*5) {
        await user.update({ priority: 2 });
      } else if (user.ranking_score >= delta*5 && user.ranking_score <= delta*7) {
        await user.update({ priority: 3 });
      } else {
        await user.update({ priority: 4 });
      }
      res.status(200).json({ message: "Xác nhận thành công" })
    }
    else {
      res.status(200).json({ message: "Sản phẩm đã được tặng", status_gift })
    }
  } catch (error) {
    res.status(400).json({ massage: "Thất bại" })
  }
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
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

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
}

const searchPost = async (req, res) => {
  try {
    const useraddress = '';
    const { citycode, districtcode, communecode, keyword, type, catid, radius } = req.body;
    // lấy ra danh sách bài đăng dựa vào
    const keysearch = unidecode(keyword.toLowerCase());

    const postlocation = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keysearch}%` } },
          { post_content: { [Op.like]: `%${keysearch}%` } }
        ],
        id_cat: catid,
        type: type,
        citycode: citycode,
        districtcode: districtcode,
        communecode: communecode
      }
    });

    const postunlocation = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keysearch}%` } },
          { post_content: { [Op.like]: `%${keysearch}%` } }
        ],
        id_cat: catid,
        type: type,
      }
    });
    // lấy ra được tọa độ của input search
    const searchLocation = await resultPost(citycode, districtcode, communecode, useraddress);

    const resultunlocation = []
    for (const result of postunlocation) {
      const math = calculateDistance(result.latitube, result.longtitube, searchLocation.lat, searchLocation.lng)

      if (math <= radius) {
        resultunlocation.push(result)
      }
    }

    res.json(postlocation)

  } catch (error) {
    console.log(error);
  }
};

const createNotification = async (id, res) => {
  try {
    const post = await Post.findOne({
      where: { id: id },
      include: { model: User }
    });
    if (post.priority > 1) {
      const users = await User.findAll({ where: { priority: post.priority, notification_status: true } });
      const settings = await notiSetting.findAll({ where: { status: true, type_post: post.type } });

      const userSetting = [];
      const userUnSetting = [];

      for (const user of users) {
        if(user.id !== post.id_user)
        {
          const setting = settings.find((item) => item.id_user === user.id);
        if (setting) {
          const distance = calculateDistance(post.latitube, post.longtitube, user.latitube, user.longtitube);
          if (distance <= setting.location_radius) {
            userSetting.push({
              id_user: user.id,
              username: user.username,
              location_radius: setting.location_radius,
              type_post: setting.type_post
            });
          }
        } else {
          userUnSetting.push({
            id_user: user.id,
            username: user.username,
          });
        }
        }
      }
      const userNoti = [...userSetting, ...userUnSetting]
      const exitsNoti = await Notification.findAll();
      const notificationPromises = userNoti.map(async (user) => {
        const existingNotification = exitsNoti.find((noti) => noti.id_user === user.id_user && noti.id_post === id);
        if (!existingNotification) {
          const notification = await Notification.create({
            id_user: user.id_user,
            id_post: id,
            notification_content: `Có một bài đăng mới từ ${post.user.username} với tiêu đề ${post.title}`
          });
          res.io.emit('notification', notification);
        }
      });
      await Promise.all(notificationPromises);
    }
  } catch (error) {
    console.log(error);

  }
}



module.exports =
{
  createPost,
  renderPost,
  deletePost,
  updatePost,
  getPostCountByCategory,
  getPostByType,
  getPostInteraction,
  acceptPost,
  searchPost,

}
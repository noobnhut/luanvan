const db = require('../models');
const Post = db.Post;
const User = db.User;
const Cat = db.Category;
const Img = db.Img;
const Video = db.Video;
const multer = require('multer');
const fs = require('fs');

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${filePath} has been deleted`);
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // giới hạn dung lượng file 100MB
  },
});

const addImg = async (req, res) => {
  try {
    upload.array('avatar', 10)(req, res, async function (err) {
      
      if (err instanceof multer.MulterError) {
        return res.status(400).json({message: err.message });
      } else if (err) {
        return res.status(400).json({message: err.message });
      }

      // Nếu không có file ảnh được chọn
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({message: 'Vui lòng chọn ít nhất một ảnh đại diện' });
      }

      const imgs = [];

      for (let i = 0; i < req.files.length; i++) {
        const imagePath = req.files[i].path;
        const imageUrl = `${req.protocol}://${req.get('host')}/${req.files[i].filename}`;

        const img = await Img.create({
          id_post:req.params.id,
          image: req.files[i].filename,
          url: imageUrl,
        });

        imgs.push(img);
      }

      return res.status(200).json({ message: "Thêm ảnh thành công", imgs });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Lỗi server' });
  }
};

const deleteImg = async (req, res) => {
  try {
    const id = req.params.id;
    const img = await Img.findByPk(id);

    if (!img) {
      return res.status(404).json({ error: 'Không tìm thấy' });
    }

    const imagePath = `./uploads/${img.avatar}`;
    deleteFile(imagePath);

    await img.destroy();

    return res.status(200).json({ success: true, message: 'Xóa thành công' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Xóa thất bại' });
  }
}

const deleteImgByPost = async (req, res) => {
  try {
    const id = req.params.id;
    const imgs = await Img.findAll({where:{id_post:id}});

    if (imgs.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy' });
    }

    for (const img of imgs) {
      const imagePath = `./uploads/${img.image}`;
      deleteFile(imagePath);
      await img.destroy();
    }

    return res.status(200).json({ success: true, message: 'Xóa thành công' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Xóa thất bại' });
  }
}
module.exports =
{
  addImg,
  deleteImg,
  deleteImgByPost
}
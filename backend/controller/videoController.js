const db = require('../models');
const Post = db.Post;
const User = db.User;
const Cat = db.Category;
const Img = db.Img;
const Video = db.Video;
const multer = require('multer');
const fs = require('fs');

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

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${filePath} has been deleted`);
  });
}

const addVideo = async (req, res) => {
  try {
    upload.array('video', 10)(req, res, async function (err) {
      
      if (err instanceof multer.MulterError) {
        return res.status(400).json({message: err.message });
      } else if (err) {
        return res.status(400).json({message: err.message });
      }
      const videos = [];
      for (let i = 0; i < req.files.length; i++) {
        const videoPath = req.files[i].path;
        const videoUrl = `${req.protocol}://${req.get('host')}/${req.files[i].filename}`;

        const video = await Video.create({
          id_post:req.params.id,
          video: req.files[i].filename,
          url: videoUrl,
        });

        videos.push(video);
      }

      return res.status(201).json({ message: "Thêm video thành công",videos });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Lỗi server' });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).json({ error: 'Không tìm thấy' });
    }

    const imagePath = `./uploads/${video.avatar}`;
    deleteFile(imagePath);

    await Video.destroy();

    return res.status(200).json({ success: true, message: 'Xóa thành công' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Xóa thất bại' });
  }
}

const deleteVideobyPost = async (req, res) => {
  try {
    const id = req.params.id;
    const videos = await Video.findAll({where:{id_post:id}});

    if (!videos) {
      return res.status(200).json({ error: 'Không tìm thấy' });
    }

    for (const video of videos) {
      const videoPath = `./uploads/${video.video}`;
      deleteFile(videoPath);
      await video.destroy();
    }

    return res.status(200).json({ success: true, message: 'Xóa thành công' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Xóa thất bại' });
  }
}
module.exports =
{
  addVideo,
  deleteVideobyPost,
  deleteVideo 
}
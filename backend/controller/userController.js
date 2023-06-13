const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../models');
const multer = require('multer');
const User = db.User;
const fs = require('fs');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const emailCheck = require('email-check');
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

const registerUser = async (req, res) => {
  try {
    upload.array('avatar', 10)(req, res, async function (err) {
      const { username, email, password, address, phone, notication_status, citycode, districtcode, communecode,isUser } = req.body;
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }

      // Nếu không có file ảnh được chọn
      if (!req.files || req.files.length === 0 || !username || !email || !password || !address || !phone || !notication_status || !citycode || !districtcode || !communecode ) {
        return res.status(202).json({ message: 'Vui lòng điền đầy đủ thông tin' });
      }

      const imgs = [];
      const existingUser = await User.findOne({
        where: {
          email
        }
      });
      // const existsMail = await emailCheck(email);
      // if(existsMail)
      // {
      //   return res.status(200).json(
      //    {message:'Tài khoản Gmail không tồn tại.'} 
      //   );
      // }

      if (existingUser) {
        return res.status(200).json(
          'Email đã tồn tại trong hệ thống'
        );
      }
      // Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      for (let i = 0; i < req.files.length; i++) {
        const imagePath = req.files[i].path;
        const imageUrl = `${req.protocol}://${req.get('host')}/${req.files[i].filename}`;
        const img = await User.create({
          username: username, email: email, password: hashedPassword, address: address, phone: phone, notication_status: notication_status, 
          citycode: citycode, districtcode: districtcode, communecode: communecode, avatar: imageUrl,isUser:true
        });
        imgs.push(img);
      }

      return res.status(201).json({ message: "Đăng kí thành công", imgs });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
};

const updateImg = async (req, res) => {
  try {
    upload.single('avatar')(req, res, async function (err) {
      const id = req.params.id;
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }

      const img = await User.findByPk(id);
      // Kiểm tra nếu có file ảnh mới được chọn
      if (req.file) {
        const imagePath = req.file.path;
        const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
        // Xóa ảnh cũ trên server
        const subUrl = img.avatar.substring(21);
        fs.unlinkSync(`./uploads/${subUrl}`);
        img.avatar = imageUrl;
        await img.save();
      }
      return res.status(200).json({ success: true, img });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
}

const updateInfo = async (req, res) => {
  const userId = req.params.id;
  const { username, address, phone, citycode, districtcode, communecode } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({
        message: `Tài khoản có không tồn tại.`
      });
    }
    else {
      await user.update({
        username: username || user.username,
        address: address || user.address,
        phone: phone || user.phone,
        citycode: citycode || user.citycode,
        districtcode: districtcode || user.districtcode,
        communecode: communecode || user.communecode,
      });
      res.status(200).json({ message: `Cập nhập thành công`, user });
    }
  } catch (error) {
    res.status(500).json({
      message: "Cập nhập thất bại"
    });
  }
}

const loginUser = async (req, res) => {
  const {
    email,
    password,
  } = req.body;
  try {
    // Tìm kiếm khách hàng với email cung cấp
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      return res.status(201).json({
        message: 'Tài khoản hoặc mật khẩu không đúng'
      });
    }
    if(user.isUser === false)
    {
      return res.status(201).json({
        message: 'Tài khoản đã bị khóa vì vi phạm quy tắc cộng đồng.'
      });
    }
    // So sánh mật khẩu được cung cấp với mật khẩu đã được mã hóa
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(201).json({
        message: 'Tài khoản hoặc mật khẩu không đúng'
      });
    }

    // Tạo JWT
    const token = jwt.sign({
      userId: user.id
    }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
    // Trả về JWT và thông tin người dùng
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      address: user.address,
      avatar: user.avatar,
      phone: user.phone,
      citycode: user.citycode,
      districtcode: user.districtcode,
      communecode: user.communecode,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: 'Đăng nhập thất bại'
    });
    console.log("loi" + error)
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({
        message: `Không tìm thấy tài khoản`
      });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({
      message: "Lỗi kết nối"
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findAll();
    if (!user) {
      res.status(404).json({
        message: `Không tìm thấy tài khoản`
      });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({
      message: "Lỗi kết nối"
    });
  }
};
const updatePass = async (req, res) => {
  const userId = req.params.id;
  const { oldPassword, newPassword, email } = req.body;
  const user = await User.findByPk(userId);
  const emailCheck = await User.findOne({ where: { email } });
  if (!user || !emailCheck) {
    return res.status(201).json({ message: 'Tài khoản không tồn tại.' })
  }
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return res.status(201).json({ message: 'Mật khẩu cũ không đúng' });
  }
  else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: 'Cập nhập thành công mật khẩu' })
  }
};
module.exports = {
  registerUser,
  loginUser,
  updateImg,
  updateInfo,
  getUserById,
  updatePass,
  getUser
};

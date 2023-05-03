const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../models');
const multer = require('multer');
const User = db.User;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

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
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif)$/)) {
      cb(new Error('Định dạng file không hợp lệ'));
    } else {
      cb(null, true);
    }
  }
});

const registerUser = async (req, res) => {
  try {
    upload.array('avatar', 10)(req, res, async function (err) {
      const {
        username,
        email,
        password,
        address,
        phone,
        status,
        citycode,
        districtcode,
        communecode
      } = req.body;
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }

      // Nếu không có file ảnh được chọn
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Vui lòng chọn ít nhất một ảnh đại diện' });
      }
      const existingUser = await User.findOne({
        where: {
          email
        }
      });
      if (existingUser) {
        return res.status(400).json({
          error: 'Email đã tồn tại trong hệ thống'
        });
      }
      const users = [];
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      for (let i = 0; i < req.files.length; i++) {
        const imagePath = req.files[i].path;
        const imageUrl = `${req.protocol}://${req.get('host')}/${req.files[i].filename}`;

        const user = await User.create({
          username,
          email,
          password:hashedPassword,
          address,
          phone,
          status,
          citycode,
          districtcode,
          communecode,
          avatar: imageUrl,
          
        });

        users.push(user);
      }

      return res.status(201).json({ message: "Đăng ký thành công", users });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
};

//login user
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
      return res.status(400).json({
        error: 'Tài khoản hoặc mật khẩu không đúng'
      });
    }
    // So sánh mật khẩu được cung cấp với mật khẩu đã được mã hóa
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: 'Tài khoản hoặc mật khẩu không đúng'
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
      phone: user.phone,
      status: user.status,
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

module.exports = {
  registerUser,
  loginUser,
};

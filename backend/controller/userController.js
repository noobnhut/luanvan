const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../models');
const User = db.User;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    address,
    phone,
    status
  } = req.body;

  try {
    // Kiểm tra xem email đã được sử dụng chưa
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

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo một user mới
    const user = await User.create({
      email,
      password: hashedPassword, // Lưu mật khẩu đã mã hóa vào cơ sở dữ liệu
      username,
      address,
      phone,
      status
     
    });

    res.json({
      user,
      message: "Đăng ký tài khoản thành công!"
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: 'Đăng ký thất bại'
    });
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
      status:user.status,
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
  
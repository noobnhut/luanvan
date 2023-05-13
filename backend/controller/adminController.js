
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../models');
const CryptoJS = require('crypto-js');
const Admin = db.Admin;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra giá trị của email
    if (!email) {
      throw new Error('Email không được để trống');
    }

    // Truy vấn database để đăng nhập
    const admin = await Admin.findOne({ where: { email } });

    // Kiểm tra tài khoản đăng nhập
    if (!admin || !comparePassword(password, admin.password)) {
      throw new Error('Email hoặc mật khẩu không đúng');
    }

    // Tạo JWT token và trả về thông tin đăng nhập thành công
    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.status(200).json({ message: 'Đăng nhập thành công', token , admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
};

const comparePassword = (password, hash) => {
  const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  return hash === hashedPassword;
};

module.exports = {
  loginAdmin,
};

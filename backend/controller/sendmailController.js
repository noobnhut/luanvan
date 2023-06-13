const db = require('../models');
const User = db.User;
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const YOUR_EMAIL_ADDRESS = process.env.YOUR_EMAIL_ADDRESS;
const YOUR_EMAIL_PASSWORD = process.env.YOUR_EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: YOUR_EMAIL_ADDRESS,
        pass: YOUR_EMAIL_PASSWORD,
    },
});

const sendMailBanned = async (req, res) => {
    const { to, subject  } = req.body;
    const text = 'Bạn vi phạm quy tắc cộng đồng nên bị khóa tài khoản.'
    const existUser = await User.findOne({ where: { email:to } });
    if (!existUser) {
        res.status(200).json({ message: "Không tồn tại tài khoản" });
    }
    else {
        await existUser.update({isUser:0});
        const mailOptions = {
            from: YOUR_EMAIL_ADDRESS,
            to: to,
            subject: subject,
            text: text,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Lỗi gửi mail');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ massage: 'Gửi thành công mail !!!' })
            }
        });
    }

};

const sendMailUnBanned = async (req, res) => {
    const { to, subject  } = req.body;
    const text = 'Sau khi xem xét tài khoản đã được mở khóa lại.'
    const existUser = await User.findOne({ where: { email:to } });
    if (!existUser) {
        res.status(200).json({ message: "Không tồn tại tài khoản" });
    }
    else {
        await existUser.update({isUser:1});
        const mailOptions = {
            from: YOUR_EMAIL_ADDRESS,
            to: to,
            subject: subject,
            text: text,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Lỗi gửi mail');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ massage: 'Gửi thành công mail !!!' })
            }
        });
    }

};
module.exports = {
    sendMailBanned ,
    sendMailUnBanned
};

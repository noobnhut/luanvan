const db = require('../models');
const Report = db.User_Report;
const User = db.User;

const report = async (req, res) => {

    try {
        const { user_report, user_reported, report_content } = req.body;
        const existUser_report = await User.findOne({ where: { id: user_report } })
        const existUser_reported = await User.findOne({ where: { id: user_reported } })
        const exitstReport = await Report.findOne({ where: { user_report, user_reported } })
       
        if (!existUser_report || !existUser_reported) {
            return res.status(200).json({ message: 'Tài khoản không tồn tại' })
        }
        else if (user_report == user_reported) {
            return res.status(200).json({ message: 'Lỗi báo cáo 2 tài khoản là 1' })
        }
        else if (exitstReport) {
            return res.status(200).json({ message: 'Bạn đã báo cáo người dùng này' })
        }
        else if (!report_content) {
            return res.status(200).json({ message: 'Thông tin bị trống' })
        }
        else {
            const report = await Report.create({
                user_report, user_reported, report_content
            });
            return res.status(200).json({ message: 'Báo cáo thành công' })
        }
    } catch (error) {
        return res.status(404).json(error)
    }
}
const getReport = async (req, res) => {
    try {
        const report = await Report.findAll();
        return res.status(200).json(report)
    } catch (error) {
        return res.status(404).json(error)
    }
}

module.exports = {
    report,
    getReport
};

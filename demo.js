const registerUser = async (req, res) => {
    try {
      const { username, email, password, address, phone, citycode, districtcode, communecode, } = req.body;
      const locationData = await resultGeocoding(citycode, districtcode, communecode, address);
      const existingUser = await User.findOne({ where: { email, }, });
      const encodedEmail = encodeURIComponent(email);
      const url = `http://api.apilayer.com/email_verification/check?email=${encodedEmail}`;
      const response = await axios.get(url, { headers });
        const emailVerificationResult = response.data;
        if (emailVerificationResult.smtp_check === true) {
          if (existingUser) {
            return res
              .status(202)
              .json({ message: "Email đã tồn tại trong hệ thống" });
          }
          // Mã hóa mật khẩu
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const user = await User.create({
              username: username,
              email: email,
              password: hashedPassword,
              address: address,
              phone: phone,
              notification_status: true,
              citycode: citycode,
              districtcode: districtcode,
              communecode: communecode,
              is_active: true,
              priority: 1,
              ranking_score: 0,
              longtitube: locationData.coordinates[0],
              latitube: locationData.coordinates[1],
            }); 
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
                  const imageUrl = `${req.protocol}://${req.get('host')}/${req.files[i].filename}`;
                  user.avatar = imageUrl;
                  await user.save();
                
              });
          res.status(201).json({ message: "Đăng kí thành công" });
        }
        else {
          return res.status(201).json({ message: "Địa chỉ mail không tồn tại" });
        }
        
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  };
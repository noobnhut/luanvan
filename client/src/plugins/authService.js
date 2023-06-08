import axios from 'axios'
import userService from './userService';

class authService {

    // giá trị tham số truyền vào:
    /*
    email : email người dùng
    password: mật khẩu người dùng
    refs: tham chiếu (reference) cho toast
    user: là 1 biến dữ liệu được định nghĩa để chứa lại user sau đăng nhập :  localStorage
    address: chi tiết địa chỉ
    phone: số điện thoại, 
    city_id:mã thành phố
    districts_code: mã quận huyện 
    commune_id: mã xã 
    */

    baseurl = `${import.meta.env.VITE_API_BASE_URL}`

    async login(email, password, refs, user) {
        try {
            const login = await axios.post(`${this.baseurl}login`, {
                email: email,
                password: password,
            });

            if(login.status === 201)
            {
                refs.toast.showToast(login.data.message);
                
            }
            if (login.status === 200) {
                // Lưu thông tin người dùng vào localStorage hoặc sessionStorage
                localStorage.setItem('user', JSON.stringify(login.data));
                localStorage.setItem('token', login.data.token);
                // Chuyển hướng đến trang chính của ứng dụng
                refs.toast.showToast('Đăng nhập thành công');
                user = userService.getUserToken();
                setTimeout(() => {
                    window.location.href = `${import.meta.env.VITE_API_BASE_URL_API}information/${user.username}/${user.id}`;
                }, 1000)

            }
        } catch (error) {
            // Xử lý lỗi nếu có
            refs.toast.showToast('Đăng nhập thất bại');
        }
    }

    async register(avatar, username, password, email, address, phone, city_id, districts_code, commune_id, refs, router) {
        const formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("phone", phone);
        formData.append("citycode", city_id);
        formData.append("districtcode", districts_code);
        formData.append("communecode", commune_id);
        formData.append("notication_status", true);
        try {
            const response = await axios.post(`${this.baseurl}register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if(response.status === 202)
            {
                refs.toast.showToast(response.data.message)
            }
            
            if (response.status === 201) {
                refs.toast.showToast(response.data.message);
                setTimeout(() => {
                    router.push({ name: "login" });
                }, 1000)
            }
        } catch (error) {
            console.error(error);
        }
    }
}
export default new authService();
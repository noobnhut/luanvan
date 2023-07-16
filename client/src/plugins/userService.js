import axios from 'axios'

class userService {

  url = `${import.meta.env.VITE_API_BASE_URL}`;

  getUserToken() {
    let user = JSON.parse(localStorage.getItem("user"));
    return user;
  }
  
  async renderUser() {
    try {
      const result = await axios.get(`${this.url}user/get`);
      return result.data;
    } catch (error) {
      console.log(error)
    }
  }
  async getUserByID(id)
  {
    try {
      const result = await axios.get(`${this.url}user/getbyid/`+ id);
      return result.data;
    } catch (error) {
      console.log(error)
    }
  }
  async updateimg(avatar, id) {
    const formData = new FormData();
    formData.append('avatar', avatar);
    try {
      const response = await axios.put(`${this.url}user/updateimg` + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;

    } catch (error) {
      console.error(error);
    }
  }

  async updatepass(email, password, newpassword, refs, id) {
    try {
      if (newpassword.length < 6) {
        refs.toast.showToast('Mật khẩu chưa đủ dài');
      }
      const result = await axios.put(`${this.url}user/updatepasswowrd/` + id,
        {
          email: email,
          oldPassword: password,
          newPassword: newpassword
        });
      if (result.status === 201) {
        refs.toast.showToast(result.data.message)
      }
      if (result.status === 200) {
        refs.toast.showToast(result.data.message)
        location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async updateInfo(address, phone, districts_code, city_id, commune_id, username, id,refs) {
    try {
      const response = await axios.put(`${this.url}user/updateInfo/${id}`, {
        address: address,
        phone: phone,
        districtcode: districts_code,
        citycode: city_id,
        communecode: commune_id,
        username: username,
      });
      if (response.status == 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        refs.toast.showToast(response.data.message)
                setTimeout(() => {
                    location.reload()
                }, 2000)
      }
    } catch (error) {
      console.error(error);
    }

  }

  async getfollow(userfollow) {
    try {
        const result = await axios.get(`${this.url}userfollow/getfollow/${userfollow}`);
       return result.data;
    } catch (error) {
        console.log(error)
    }
}

async getreport() {
  try {
      const result = await axios.get(`${this.url}report/get`);
     return result.data;
  } catch (error) {
      console.log(error)
  }
}
}
export default new userService();
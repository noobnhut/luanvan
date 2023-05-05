import axios from 'axios'

class userService {

  getUserToken() {
    let user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  async updateimg(avatar,id) {
    const formData = new FormData();
    formData.append('avatar', avatar);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}user/updateimg` + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
      
    } catch (error) {
      console.error(error);
    }
  }

}
export default new userService();
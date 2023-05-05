import axios from 'axios'
class AddressService {

 async getCountry() {
    try {
      const data = await axios.get('https://provinces.open-api.vn/api/');
      return data.data;

    } catch (error) {
      console.error(error);
    }
  }

  async getDistricts(cityId) {
    try {
      const data = await axios.get(`https://provinces.open-api.vn/api/p/${cityId}?depth=2`);
      return data.data.districts;
    } catch (error) {
      console.error(error);
    }
  }

  async getCommune(districtCode) {
    try {
      const data = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      return data.data.wards;
    } catch (error) {
      console.error(error);
    }
  }
 
 
}

export default new AddressService();

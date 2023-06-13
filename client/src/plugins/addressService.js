import axios from 'axios'
class AddressService {

  async getCountry() {
    try {
      const data = await axios.get('https://provinces.open-api.vn/api/?depth=3');
      return data.data;

    } catch (error) {
      console.error(error);
    }
  }
  async getAllDistricts() {
    try {
      const data = await axios.get('https://provinces.open-api.vn/api/d/');
      return data.data;

    } catch (error) {
      console.error(error);
    }
  }
  async getAllCommune() {
    try {
      const data = await axios.get('https://provinces.open-api.vn/api/w/');
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

  async getNameCommune(code) {
    try {
      const response = await axios.get(`https://provinces.open-api.vn/api/w/${code}`);
      const { name } = response.data;
      return name;
    } catch (error) {
      console.error(error);
    }
  }

}

export default new AddressService();

import axios from 'axios';

const API_URL = 'https://backend-gpr.up.railway.app/api/packages/';
const API_URL_EXP = 'https://backend-gpr.up.railway.app/api/';

class PackageService {
  create(data) {
    return axios.post(API_URL, data);
  }

  getAll() {
    return axios.get(API_URL);
  }

  get(id) {
    return axios.get(`${API_URL}${id}`);
  }

  update(id, data) {
    return axios.put(`${API_URL}${id}`, data);
  }

  delete(id) {
    return axios.delete(`${API_URL}${id}`);
  }

  getReport(params) {
    return axios.get(`${API_URL_EXP}report`, { params });
  }
  getAllEkspedisi() {
    return axios.get(`${API_URL_EXP}ekspedisi`);
  }
}

export default new PackageService();

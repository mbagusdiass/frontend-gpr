import axios from 'axios';

const API_URL = 'https://backend-gpr.up.railway.app/api/ekspedisi';

const getExp = () => {
  return axios.get(API_URL);
};

const createExp = data => {
  return axios.post(API_URL, data);
};

const removeExp = id => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
    getExp,
    createExp,
    removeExp
};

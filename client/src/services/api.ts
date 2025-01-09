import axios from 'axios';

axios.defaults.withCredentials = true;

const apiService = axios.create({
  // baseURL: 'http://localhost:3000',
  // baseURL: 'https://cu-voting.vercel.app',
  baseURL: 'https://api.ucspyay.site',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiService;

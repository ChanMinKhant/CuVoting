import axios from 'axios';

axios.defaults.withCredentials = true;

const apiService = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://cu-voting.vercel.app',
});

export default apiService;

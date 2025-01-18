import axios from 'axios';

axios.defaults.withCredentials = true;

export const backendUrl = 'https://www.api.ucspyay.site';
// export const backendUrl = 'http://localhost:3000';
// export const backendUrl = 'https://cu-voting.vercel.app';

const apiService = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiService;

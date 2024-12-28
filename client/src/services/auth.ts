import apiService from './api';

const authBaseUrl = '/auth';

const register = async (userData) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

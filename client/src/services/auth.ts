import apiService from './api';

const authBaseUrl = 'api/auth';

export const register = async (userData: any) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/register`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

export const login = async (userData: any) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/login`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

//submit otp
export const submitOtp = async (email: String, otp: String) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/submit-otp`, {
      email,
      otp,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

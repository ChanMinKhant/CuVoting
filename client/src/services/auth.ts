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
    throw error.response;
  }
};

export const resendOtp = async (email: String) => {
  try {
    const response = await apiService.post(`${authBaseUrl}/resend-otp`, {
      email,
    });
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

export const getUser = async () => {
  try {
    const response = await apiService.post(`${authBaseUrl}/get-user`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

export const detectedDeviceAccount = async (deviceData: any) => {
  try {
    const response = await apiService.post(
      `${authBaseUrl}/detected-account`,
      deviceData
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

// login-with-device-id

export const loginWithDeviceId = async (deviceId: string) => {
  try {
    const response = await apiService.post(
      `${authBaseUrl}/login-with-device-id`,
      {
        deviceId,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

export const logout = async () => {
  try {
    const response = await apiService.post(`${authBaseUrl}/logout`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

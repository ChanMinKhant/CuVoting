import apiService from './api';

const selectionBaseUrl = 'api/selection';

export const getAllSelections = async (gender) => {
  try {
    const response = await apiService.get(
      `${selectionBaseUrl}/?gender=${gender}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

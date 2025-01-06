import apiService from './api';

const selectionBaseUrl = 'api/selection';

export const getAllSelections = async (): Promise<any> => {
  try {
    const response = await apiService.get(`${selectionBaseUrl}`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

//vote

export const vote = async (selectionId: string, title: string) => {
  try {
    const response = await apiService.post(`${selectionBaseUrl}/vote`, {
      selectionId,
      title,
    });
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

//vote-history
export const getVoteHistory = async () => {
  try {
    const response = await apiService.get(`${selectionBaseUrl}/vote-history`);
    return response.data;
  } catch (error: any) {
    throw error.response;
  }
};

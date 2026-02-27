import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ocrApi = {
  extractText: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await apiClient.post('/ocr', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

export default apiClient;

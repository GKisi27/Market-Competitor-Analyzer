import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for adding auth token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const updateCurrentUser = async (userData) => {
  const response = await api.put('/users/me', userData);
  return response.data;
};

export default api;

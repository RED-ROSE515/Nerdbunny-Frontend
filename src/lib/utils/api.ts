import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL
});

// Request interceptor
api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser!) as any;
  if (user) {
    config.headers.Authorization = `Token ${user.token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('user')) {
      localStorage.removeItem('user');
      // navigateToSignin();
    }
    return Promise.reject(error);
  }
);

export default api;

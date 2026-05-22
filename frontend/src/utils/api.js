import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Crucial for sending/receiving HttpOnly cookies
});

// Request interceptor to add token if it exists in state
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle global errors (like token expiry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the token is invalid or expired, log the user out globally
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;

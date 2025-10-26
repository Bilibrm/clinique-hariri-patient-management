import axios from 'axios';
import { API_BASE_URL, API_TOKEN } from './config';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, 
});

// Request interceptor to add bearer token
apiClient.interceptors.request.use(
  (config) => {
    // Add bearer token if available
    if (API_TOKEN) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;


import axios from 'axios';

// Automatically target live Render backend in production, or local server during dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://task-management-app-server-uc6q.onrender.com/api' 
    : '/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach Authorization Bearer JWT Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('taskflow_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// API Calls
export const authAPI = {
  loginWithGoogle: (credential) => api.post('/auth/google', { credential }),
  loginDemo: (account = 'user') => api.post('/auth/google', { isDemo: true, demoAccount: account }),
  getMe: () => api.get('/auth/me')
};

export const taskAPI = {
  getTasks: (params = {}) => api.get('/tasks', { params }),
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTaskStatus: (id, status) => api.patch(`/tasks/${id}/status`, { status }),
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/tasks/${id}`)
};

export default api;

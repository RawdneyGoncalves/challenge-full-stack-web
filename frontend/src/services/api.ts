import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert('Sessão expirada. Faça login novamente.');
      localStorage.removeItem('jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token; 
  },

  async login(username: string, password: string) {
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token } = response.data;

      localStorage.setItem('jwt', token);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login.');
    }
  }
};

export default api;

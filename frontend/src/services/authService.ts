import api from './api';

interface LoginResponse {
  token: string;
  refreshToken: string;
}

const authService = {
  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token;
  },

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', { username, password });
    const { token, refreshToken } = response.data;

    localStorage.setItem('jwt', token);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  },

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  },

  async getCurrentUser(): Promise<any> {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default authService;

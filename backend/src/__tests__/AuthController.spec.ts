import { Request, Response } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { User } from '../entities/User';

jest.mock('../services/AuthService');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: jest.Mocked<AuthService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    authService = {
      login: jest.fn(),
      register: jest.fn(),
      refresh: jest.fn(),
    } as any;

    authController = new AuthController(authService);

    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('login', () => {
    it('should return token and refresh token on successful login', async () => {
      const loginData = {
        username: 'testuser',
        password: 'password123'
      };
      const expectedResponse = {
        token: 'jwt-token',
        refreshToken: 'refresh-token'
      };

      req.body = loginData;
      authService.login.mockResolvedValue(expectedResponse);

      await authController.login(req as Request, res as Response);

      expect(authService.login).toHaveBeenCalledWith(loginData.username, loginData.password);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    it('should return 401 on invalid credentials', async () => {
      req.body = {
        username: 'wronguser',
        password: 'wrongpass'
      };
      authService.login.mockResolvedValue(null);

      await authController.login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid username or password' });
    });
  });

  describe('register', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        username: 'newuser',
        password: 'password123'
      };
      
      const createdUser: User = {
        id: 1,
        username: userData.username,
        password: userData.password,
        refreshToken: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        hashPassword: async function() {
          return Promise.resolve();
        }
      };

      req.body = userData;
      authService.register.mockResolvedValue(createdUser);

      await authController.register(req as Request, res as Response);

      expect(authService.register).toHaveBeenCalledWith(userData.username, userData.password);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdUser);
    });

    it('should return 400 when registration fails', async () => {
      req.body = {
        username: 'existinguser',
        password: 'password123'
      };
      authService.register.mockRejectedValue(new Error('Username already exists'));

      await authController.register(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to register user' });
    });
  });

  describe('refresh', () => {
    it('should return new token on successful refresh', async () => {
      const refreshData = {
        refreshToken: 'valid-refresh-token'
      };
      const newToken = 'new-jwt-token';

      req.body = refreshData;
      authService.refresh.mockResolvedValue(newToken);

      await authController.refresh(req as Request, res as Response);

      expect(authService.refresh).toHaveBeenCalledWith(refreshData.refreshToken);
      expect(res.json).toHaveBeenCalledWith({ token: newToken });
    });

    it('should return 401 on invalid refresh token', async () => {
      req.body = {
        refreshToken: 'invalid-refresh-token'
      };
      authService.refresh.mockResolvedValue(null);

      await authController.refresh(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid refresh token' });
    });
  });
});
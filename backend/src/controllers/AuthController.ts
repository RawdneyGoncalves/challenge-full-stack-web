import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AuthService } from "../services/AuthService";
import { TYPES } from "../types/identifiers";
import { LoginDTO } from "../dto/LoginDTO";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.AuthService) private authService: AuthService
  ) {}

  async login(req: Request, res: Response) {
    const { username, password } = req.body as LoginDTO;
  
    try {
      console.log('Login attempt with username:', username);
      const result = await this.authService.login(username, password);
      res.json({ token: result.token, refreshToken: result.refreshToken });
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({ error: error.message });
    }
  }
  

  async register(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const user = await this.authService.register(username, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;

    try {
      const newToken = await this.authService.refresh(refreshToken);
      res.json({ token: newToken });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}
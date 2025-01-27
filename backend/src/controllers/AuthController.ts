import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AuthService } from "../services/AuthService";
import { TYPES } from "../types/identifiers";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.AuthService) private authService: AuthService
  ) {}

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const result = await this.authService.login(username, password);
    if (!result) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.json({ token: result.token, refreshToken: result.refreshToken });
  }

  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await this.authService.register(username, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to register user" });
    }
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const newToken = await this.authService.refresh(refreshToken);
    if (!newToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    res.json({ token: newToken });
  }
}
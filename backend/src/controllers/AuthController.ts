import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AuthService } from "../services/AuthService";
import { TYPES } from "../types/identifiers";

@injectable()
export class AuthController {
  declare private authService: AuthService;

  constructor(@inject(TYPES.AuthService) authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const token = await this.authService.login(username, password);
    if (!token) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.json({ token });
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
}
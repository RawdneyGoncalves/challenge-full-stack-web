import { Router } from "express";
import { container } from "../inversify.config";
import { AuthController } from "../controllers/AuthController"; 
import { TYPES } from "../types/identifiers";

const authRoutes = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

authRoutes.post("/register", authController.register.bind(authController));
authRoutes.post("/login", authController.login.bind(authController));
authRoutes.post("/refresh", authController.refresh.bind(authController));

export { authRoutes };

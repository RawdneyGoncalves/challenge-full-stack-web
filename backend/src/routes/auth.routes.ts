import { Router } from "express";
import { container } from "@/inversify.config";
import { AuthController } from "../controllers/AuthController";

const authRoutes = Router();
const authController = container.get(AuthController);

authRoutes.post("/register", authController.register.bind(authController));
authRoutes.post("/login", authController.login.bind(authController));

export { authRoutes };
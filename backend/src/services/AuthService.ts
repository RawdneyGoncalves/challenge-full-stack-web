import { injectable } from "inversify";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";


interface CustomJwtPayload extends JwtPayload {
  userId: number;
}

@injectable()
export class AuthService {
  async register(username: string, password: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    
    const existingUser = await userRepository.findOneBy({ username });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ username, password: hashedPassword });
    return await userRepository.save(user);
  }

  async login(username: string, password: string): Promise<{ token: string; refreshToken: string }> {
    const userRepository = AppDataSource.getRepository(User);
  
    const user = await userRepository.findOneBy({ username });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET || "refreshSecret", { expiresIn: "7d" });
    
    user.refreshToken = refreshToken;
    await userRepository.save(user);
  
    return { token, refreshToken };
  }
  
  
  async refresh(refreshToken: string): Promise<string | null> {
    try {
      const decoded = jwt.verify(
        refreshToken, 
        process.env.JWT_REFRESH_SECRET || "refreshSecret"
      ) as CustomJwtPayload;
  
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ 
        id: decoded.userId, 
        refreshToken: refreshToken 
      });
  
      if (!user) {
        console.log('User not found or refresh token invalid');
        return null;
      }
  
      const newToken = jwt.sign(
        { userId: user.id }, 
        process.env.JWT_SECRET || "secret", 
        { expiresIn: "1h" }
      );
  
      return newToken;
    } catch (error) {
      console.error('Refresh token verification failed:', error);
      return null;
    }
  }
}
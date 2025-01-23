import { injectable } from "inversify";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  async login(username: string, password: string): Promise<string | null> {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ username });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    return token;
  }
}

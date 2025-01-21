import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Student } from "../entities/Student";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "students_db",
  synchronize: true,
  logging: false,
  entities: [User, Student],
});

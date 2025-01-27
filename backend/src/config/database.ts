import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import { env } from "./env";
import { CreateStudentDeletionLog1705161234572 } from "../migrations/CreateStudentDeletionLog1705161234572";
import { CreateStudentTable1705161234571 } from "../migrations/CreateStudentTable1705161234571";
import { CreateUserTable1705161234570 } from "../migrations/CreateUserTable1705161234570";
import { AddRefreshTokenToUser1705161234571 } from "../migrations/AddRefreshTokenToUser1705161234571";

export const AppDataSource = new DataSource({
  type: env.DB_TYPE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [path.join(__dirname, "../entities/*.{ts,js}")],
  migrations: [
    CreateStudentDeletionLog1705161234572,
    CreateStudentTable1705161234571,
    CreateUserTable1705161234570,
    AddRefreshTokenToUser1705161234571,
  ],
  synchronize: false,
  logging: process.env.DB_LOGGING === "true",
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});
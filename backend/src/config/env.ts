import dotenv from "dotenv";
dotenv.config();

export const env = {
  DB_TYPE: (process.env.DB_TYPE as "mysql" | "postgres") || "mysql",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT || "3306", 10),
  DB_USERNAME: process.env.DB_USERNAME || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_NAME: process.env.DB_NAME || "production_sales",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};

import "reflect-metadata";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./inversify.config";
import "./controllers/StudentController";
import "./auth/AuthController";
import { AppDataSource } from "./config/database";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected.");

    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
      app.use(express.json());
    });

    const app = server.build();
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server running on http://localhost:${process.env.PORT || 3000}`)
    );
  })
  .catch((error) => console.error("Error connecting to the database:", error));

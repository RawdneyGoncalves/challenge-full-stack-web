import "reflect-metadata";
import express from "express";
import { container } from "./inversify.config";
import { AppDataSource } from "./config/database";
import { routes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected.");
    
    const app = express();
    
    app.use(express.json());
    app.use("/api", routes);
    app.use(errorHandler);

    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  })
  .catch((error) =>
    console.error("Error connecting to the database:", error)
  );
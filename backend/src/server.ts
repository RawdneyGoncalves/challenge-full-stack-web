import express from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import { routes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected.");
    
    const app = express();
    
    const corsOptions = {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };

    app.use(cors(corsOptions));

    app.use(express.json());
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    
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

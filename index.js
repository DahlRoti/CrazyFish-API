import "express-async-errors";
import express from "express";
import connectDB from "./src/db/index.js";
import ENV from "./src/env/index.js";
import { addRoutes } from "./src/routes/index.js";
import { addMiddlewares } from "./src/middlewares/index.js";
import { addErrorHandler } from "./src/utils/errorHandler.js";
import fs from "fs";
import swaggerUi from "swagger-ui-express"; // Add this line
import swaggerSpec from "./swagger.js"; // Add this line
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//initialization
const start = () => {
  fs.mkdirSync("./uploads", { recursive: true });

  const server = createServer(app);

  addMiddlewares(app);
  addRoutes(app);
  addErrorHandler(app);

  connectDB(ENV.MONGODB_URI).then(() => {
    console.log(`Database connected to ${ENV.MONGODB_URI}`);

    server.listen(ENV.PORT, () => {
      console.log(`Server started on port ${ENV.PORT}`);
    });
  });
};

start();

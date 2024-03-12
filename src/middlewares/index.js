import bodyParser from "body-parser";
import cors from "cors";
import authMiddleware from "./auth.middleware.js";

import logger from "morgan";

export const middlewares = [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cors(),
  logger("dev"),
  authMiddleware,
];

export const addMiddlewares = (app) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};

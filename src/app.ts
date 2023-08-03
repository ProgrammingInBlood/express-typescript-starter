import compression from "compression";
import cookieParser from "cookie-parser";
import { createServer ,Server} from "http";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { connect, set } from "mongoose";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "@config";
import { dbConnection } from "@database";
import { Routes } from "@interfaces/routes.interface";
import { ErrorMiddleware } from "@middlewares/error.middleware";
import { logger, stream } from "@utils/logger";

export function App(routes: Routes[]): Server {
  const app = express();
  const server = createServer(app);
  const env = NODE_ENV || "development";
  const port = PORT || 3000;

  connectToDatabase(env); 
  initializeMiddlewares(app); 
  initializeRoutes(app, routes);
  initializeErrorHandling(app); 

  server.listen(port, () => {
    logger.info(`=================================`);
    logger.info(`======= ENV: ${env} =======`);
    logger.info(`🚀 App listening on the port ${port}`);
    logger.info(`=================================`);
  });

  return server;
}

function connectToDatabase(env: string): void {
  if (env !== "production") {
    set("debug", true);
  }
  connect(dbConnection.url, dbConnection.options as any);
}

function initializeMiddlewares(app: express.Application): void {
  app.use(morgan(LOG_FORMAT, { stream }));
  app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
}

function initializeRoutes(app: express.Application, routes: Routes[]): void {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
}

function initializeErrorHandling(app: express.Application): void {
  app.use(ErrorMiddleware);
}

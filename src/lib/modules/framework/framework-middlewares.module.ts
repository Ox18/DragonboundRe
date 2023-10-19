import { Express } from "express";
import { morganMiddleware } from "./middlewares/morgan.middleware";
import { sessionMiddleware } from "./middlewares/session.middleware";
import { bodyParserMiddleware } from "./middlewares/body-parser.middleware";
import { bodyParserUrlMiddleware } from "./middlewares/body-parser-url.middleware";

export const frameworkMiddleware = (app: Express): void => {
  app.use(morganMiddleware())
  app.use(sessionMiddleware())
  app.use(bodyParserUrlMiddleware)
  app.use(bodyParserMiddleware)
}
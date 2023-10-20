import expressSession from "express-session";
import { configHealth } from "../../config-health.module";

const config = configHealth();

export const sessionMiddleware = () => {
  return expressSession({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  });
};
